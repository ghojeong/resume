# 자신 있는 코드

최근에 작성한 것 중, 자랑하고 싶은 코드를 정리한 문서입니다.

## 요약

<!-- - [타입스크립트 리액트 컴포넌트](#%ed%83%80%ec%9e%85%ec%8a%a4%ed%81%ac%eb%a6%bd%ed%8a%b8-%eb%a6%ac%ec%95%a1%ed%8a%b8-%ec%bb%b4%ed%8f%ac%eb%84%8c%ed%8a%b8)
  - [ListFilter.tsx](#listfiltertsx) -->

- redux-observable 을 통한 비동기 처리
  - [models.ts](#modelsts)
  - [actions.ts](#actionsts)
  - [services.ts](#servicests)
  - [epic.ts](#epicts)
  - [epic.spec.ts](#epicspects)
  - [reducer.ts](#reducerts)
  - [reducer.spec.ts](#reducerspects)
  - [selectors.ts](#selectorsts)
  - [App.tsx](#apptsx)
  - [UserLabel.tsx](#userlabeltsx)

<!-- ## 타입스크립트 리액트 컴포넌트

### ListFilter.tsx

```ListFilter.tsx
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

interface MenuItem {
  value: string;
  text: string | JSX.Element;
}
const renderMenuItem = ({ text, value }: MenuItem) =>
  text && (
    <MenuItem key={value} value={value}>
      {text}
    </MenuItem>
  );

export interface ListFilterSubmitEvent {
  selectVal?: string;
  searchVal?: string;
}

type FilterMapType = Record<string, string | JSX.Element>;
interface PropTypes<M extends FilterMapType> {
  filterMap: M;
  onFilterSubmit: (event: ListFilterSubmitEvent) => void;
  defaultSelectVal?: string;
  defaultSearchVal?: string;
}
export const ListFilter = <T extends FilterMapType>({
  filterMap,
  onFilterSubmit,
  defaultSelectVal,
  defaultSearchVal,
}: PropTypes<T>) => {
  const filterItems = Object.entries(filterMap).map(([key, value]) => ({
    value: key,
    text: value,
  }));

  const [selectVal, setSelectVal] = useState(
    defaultSelectVal && Object.keys(filterMap).includes(defaultSelectVal)
      ? defaultSelectVal
      : Object.keys(filterMap)[0],
  );
  const [searchVal, setSearchVal] = useState(defaultSearchVal || '');

  const handleSelectValChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSearchVal('');
    setSelectVal(String(event.target.value));
  };

  const handleSearchValChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchVal(String(event.target.value));
  };

  return (
    <Box>
      <Grid
        container
        component="form"
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          onFilterSubmit({ selectVal, searchVal });
        }}
      >
        <Grid item xs={6}>
          <Select value={selectVal || filterItems[0].value} onChange={handleSelectValChange}>
            {filterItems.map(renderMenuItem)}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <InputBase value={searchVal} onChange={handleSearchValChange} />
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
``` -->

## redux-observable 을 통한 비동기 처리

유저 상세 정보(UserDetail)를 API로 호출하여 받아온 후 스토어에서 관리하는<br>
비동기 작업을 redux-observable을 통해 수행하는 코드입니다.

이를 이용해 마우스 호버 시 유저 상세 정보의 Popover를 띄워주는<br>
UserLabel 스마트 컴포넌트를 만들었습니다.

### models.ts

```models.ts
export class UserModel {
  userIdx!: number;
  name!: string;
  email!: string;
  phoneNumber!: string;
}
```

### actions.ts

```actions.ts
import { createAction, createAsyncAction, ActionType } from 'typesafe-actions';
import { UserModel } from 'app/models';

export const authLogout = createAction('AUTH_LOGOUT')();
export const fetchUserDetailAsync = createAsyncAction(
  'FETCH_USER_DETAIL_REQUEST',
  'FETCH_USER_DETAIL_FULFILLED',
  'FETCH_USER_DETAIL_REJECTED',
)<
  {
    userIdx: UserModel['userIdx'];
  },
  UserModel,
  {
    userIdx: UserModel['userIdx'];
    errMsg: string;
  }
>();
export type Actions =
  | ActionType<typeof authLogout>
  | ActionType<typeof fetchUserDetailAsync>;
```

### services.ts

```services.ts
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import Axios from 'axios-observable';
import { UserModel } from 'app/models';
import { API_ENDPOINT } from 'app/configs';

export const storageService = {
  getItem(key: string) {
    return localStorage.getItem(key);
  },
  setItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  },
  clear() {
    return localStorage.clear();
  },
};

const httpClient = Axios.create({
  baseURL: API_ENDPOINT,
});
httpClient.interceptors.request.use((config) => {
  const token = storageService.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

type ApiResponse<T> = { data: T };
type ProxyAxiosResponse<T> = T extends AxiosResponse<{ data: infer D }> ? D : never;
const mapApiResponse: <
  T extends AxiosResponse<ApiResponse<R>>,
  R = ProxyAxiosResponse<T>
>() => OperatorFunction<
  T,
  R
> = () => map(({ data: { data } }) => data);

export const userService = {
  getUser(userIdx: UserModel['userIdx']) {
    return httpClient
      .get<ApiResponse<UserModel>>(`/users/${userIdx}`)
      .pipe(mapApiResponse());
  },
};
```

### epic.ts

```epic.ts
import { of, empty } from 'rxjs';
import { map, filter, catchError, mergeMap, finalize } from 'rxjs/operators';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { Actions, fetchUserDetailAsync } from 'app/actions';
import * as services from 'app/services';

export const fetchUserDetailEpic: Epic = (
  action$: ActionsObservable<Actions>,
  _,
  { userService }: typeof services,
) => {
  // NOTE: API 요청 중인 userIdx를 inProgress에 임시 저장하여, 같은 유저의 정보를 동시에 요청하는 일이 없도록 한다.
  const inProgress: Record<number, boolean> = {};
  return action$.pipe(
    filter(isActionOf(fetchUserDetailAsync.request)),
    mergeMap(({ payload: userIdx }) => {
      if (inProgress[userIdx]) {
        return empty();
      }
      inProgress[userIdx] = true;
      return userService.getUser(userIdx).pipe(
        map((data) => fetchUserDetailAsync.success(data)),
        catchError((err) =>
          of(
            fetchUserDetailAsync.failure({
              userIdx,
              errMsg: err.message,
            }),
          ),
        ),
        finalize(() => {
          inProgress[userIdx] = false;
        }),
      );
    }),
  );
};

export const rootEpic = combineEpics(fetchUserDetailEpic);
```

### epic.spec.ts

```epic.spec.ts
import { Subject, of, throwError } from 'rxjs';
import { Action } from 'redux';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { mocked } from 'ts-jest/utils';
import { fetchUserDetailAsync } from 'app/actions';
import * as services from 'app/services';
import { fetchUserDetailEpic } from 'app/epic';

jest.mock('app/services');

describe('epic 테스트', () => {
  describe('fetchUserDetailEpic 테스트', () => {
    const mockedUserService = mocked(services.userService, true);

    test('유저 상세 정보 조회 성공', (done) => {
      // <!-- mock
      mockedUserService.getUser.mockReturnValueOnce(
        of({
          userIdx: 105,
          name: 'ghojeong',
          email: 'name@email.com',
          phoneNumber: '+821012345678',
        }),
      );
      // -->
      const action$ = ActionsObservable.of(fetchUserDetailAsync.request({ userIdx: 105 }));
      const state$ = new StateObservable(new Subject(), {});
      const dependencies = { userService: mockedUserService };
      const actualActions: Action[] = [];

      fetchUserDetailEpic(action$, state$, dependencies).subscribe({
        next: (action: Action) => actualActions.push(action),
        complete: () => {
          expect(actualActions).toEqual([
            fetchUserDetailAsync.success({
              userIdx: 105,
              name: 'ghojeong',
              email: 'name@email.com',
              phoneNumber: '+821012345678',
            }),
          ]);
          done();
        },
      });
    });

    test('유저 상세 정보 조회 실패', (done) => {
      // <!-- mock
      mockedUserService.getUser = jest.fn().mockImplementation(
        () => throwError(new Error('getUser Error'))
      );
      // -->
      const action$ = ActionsObservable.of(fetchUserDetailAsync.request({ userIdx: 105 }));
      const state$ = new StateObservable(new Subject(), {});
      const dependencies = { userService: mockedUserService };
      const actualActions: Action[] = [];

      fetchUserDetailEpic(action$, state$, dependencies).subscribe({
        next: (action) => actualActions.push(action),
        complete: () => {
          expect(actualActions).toEqual([
            fetchUserDetailAsync.failure({
              userIdx: 105,
              errMsg: 'getUser Error',
            }),
          ]);
          done();
        },
      });
    });
  });
});
```

### reducer.ts

```reducer.ts
import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { UserModel } from 'app/models';
import { Actions, authLogout, fetchUserDetailAsync } from 'app/actions';

export type UserDetailState = Record<
  UserModel['userIdx'],
  {
    isLoading: boolean;
    errMsg: string | null;
    item?: UserModel; // NOTE: 데이터를 한번도 받아오지 않았다면 비어있을수 있다.
  }
>;
export const userDetailInitialState: UserDetailState = {};
export const userDetailReducer = (
  userDetailState = userDetailInitialState,
  action: Actions,
): UserDetailState => {
  switch (action.type) {
    case getType(authLogout):
      return userDetailInitialState;
    case getType(fetchUserDetailAsync.request):
      return {
        ...userDetailState,
        [action.payload.userIdx]: {
          ...(userDetailState[action.payload.userIdx] || {}),
          isLoading: true,
          errMsg: null,
        },
      };
    case getType(fetchUserDetailAsync.success):
      return {
        ...userDetailState,
        [action.payload.userIdx]: {
          ...(userDetailState[action.payload.userIdx] || {}),
          isLoading: false,
          errMsg: null,
          item: action.payload,
        },
      };
    case getType(fetchUserDetailAsync.failure):
      return {
        ...userDetailState,
        [action.payload.userIdx]: {
          ...(userDetailState[action.payload.userIdx] || {}),
          isLoading: false,
          errMsg: action.payload.errMsg,
        },
      };
    default:
      return userDetailState;
  }
};

export interface RootState {
  userDetail: UserDetailState;
}
export const rootReducer = combineReducers<RootState>({ userDetail: userDetailReducer });
```

### reducer.spec.ts

```reducer.spec.ts
import { authLogout, fetchUserDetailAsync } from 'app/actions';
import { UserDetailState, userDetailReducer, userDetailInitialState } from 'app/reducer';

describe('userDetailReducer 테스트', () => {
  test('authLogout 액션이 발행되면 state 가 초기값으로 세팅 되어야 한다.', () => {
    const userDetailState: UserDetailState = {
      105: {
        isLoading: false,
        errMsg: null,
        item: {
          userIdx: 105,
          name: 'ghojeong',
          email: 'name@email.com',
          phoneNumber: '+821012345678',
        },
      },
    };
    const action = authLogout();
    expect(userDetailReducer(userDetailState, action)).toEqual(userDetailInitialState);
  });

  test('fetchUserDetailAsync 를 request 하면 isLoading 이 true가 되어야 한다.', () => {
    const userDetailState: UserDetailState = userDetailInitialState;
    const action = fetchUserDetailAsync.request({ userIdx: 105 });
    expect(userDetailReducer(userDetailState, action)).toEqual({
      105: {
        isLoading: true,
        errMsg: null,
      },
    });
  });

  test('fetchUserDetailAsync가 성공하면 state에 받아온 userDetail이 추가되어야 한다.', () => {
    const userDetailState: UserDetailState = userDetailInitialState;
    const action = fetchUserDetailAsync.success({
      userIdx: 105,
      name: 'ghojeong',
      email: 'name@email.com',
      phoneNumber: '+821012345678',
    });
    expect(userDetailReducer(userDetailState, action)).toEqual({
      105: {
        isLoading: false,
        errMsg: null,
        item: {
          userIdx: 105,
          name: 'ghojeong',
          email: 'name@email.com',
          phoneNumber: '+821012345678',
        },
      },
    });
  });

  test('fetchUserDetailAsync 가 실패하면 errMsg 가 세팅 되어야 한다.', () => {
    const userDetailState: UserDetailState = userDetailInitialState;
    const action = fetchUserDetailAsync.failure({
      userIdx: 105,
      errMsg: 'fetchUserDetailAsync Failed',
    });
    expect(userDetailReducer(userDetailState, action)).toEqual({
      105: {
        isLoading: false,
        errMsg: 'fetchUserDetailAsync Failed',
      },
    });
  });
});
```

### selectors.ts

```selectors.ts
import mapValues from 'lodash/mapValues';
import { UserModel } from 'app/models';
import { RootState } from 'app/reducers';

export const userDetailSelectorByIdxFactory =
  (userIdx: UserModel['userIdx']) => (state: RootState) => {
    const { userDetail } = state;
    return userDetail[userIdx];
  };
```

### App.tsx

```App.tsx
import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userService } from 'app/services';
import { rootEpic } from 'app/epic';
import { rootReducer } from 'app/reducers';
import { AppRouter } from 'app/routes';

const services = { userService };
const epicMiddleware = createEpicMiddleware({
  dependencies: services,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware)),
);
epicMiddleware.run(rootEpic);

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
export default hot(module)(App);
```

### UserLabel.tsx

```UserLabel.tsx
import React, { FC, useMemo, useEffect, useState, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import ErrorIcon from '@material-ui/icons/Error';
import RefreshIcon from '@material-ui/icons/Refresh';
import { UserModel } from 'app/models';
import { fetchUserDetailAsync } from 'app/actions';
import { userDetailSelectorByIdxFactory } from 'app/selectors';

interface PropTypes {
  userIdx: UserModel['userIdx'];
}
export const UserLabel: FC<PropTypes> = ({ userIdx }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);
  // NOTE: userIdx가 바뀌지 않으면 셀렉터를 다시 만들지 않는다.
  const userSelector = useMemo(() => userDetailSelectorByIdxFactory(userIdx), [userIdx]);
  const userDetail = useSelector(userSelector);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(fetchUserDetailAsync.request(userIdx));
  }, [dispatch, userIdx]);

  const hasErrMsg = userDetail && !userDetail.isLoading && userDetail.errMsg;

  if (hasErrMsg) {
    return (
      <Typography noWrap component="div" variant="body2" color="error">
        <ErrorIcon />
        <span>{userDetail.errMsg}</span>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(fetchUserDetailAsync.request(userIdx));
          }}
        >
          Refresh
          <RefreshIcon />
        </Button>
      </Typography>
    );
  }
  if (userDetail.item) {
    const { name, email, phoneNumber } = userDetail.item;
    return (
      <>
        <span onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
          {name}
        </span>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          disableRestoreFocus
        >
          <div>
            <div>Email: {email}</div>
            <div>Phone Number: {phoneNumber}</div>
          </div>
        </Popover>
      </>
    );
  }
  return <Skeleton width={80} height={8} />;
};
```
