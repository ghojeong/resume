# 자신있는 코드

최근에 작성한 것 중, 자랑하고 싶은 코드를 정리한 문서입니다.

## 요약

<!-- - [타입스크립트 리액트 컴포넌트](#%ed%83%80%ec%9e%85%ec%8a%a4%ed%81%ac%eb%a6%bd%ed%8a%b8-%eb%a6%ac%ec%95%a1%ed%8a%b8-%ec%bb%b4%ed%8f%ac%eb%84%8c%ed%8a%b8)
  - [ListFilter.tsx](#listfiltertsx) -->

### 비동기 처리

#### 콜백, Promise, async/await을 통한 비동기 처리

- [runTasks.js](./js/runTasks.js)

#### redux-observable을 통한 비동기 처리

- [model.ts](#modelts)
- [action.ts](#actionts)
- [service.ts](#servicets)
- [epic.ts](#epicts)
- [epic.spec.ts](#epicspects)
- [reducer.ts](#reducerts)
- [reducer.spec.ts](#reducerpects)
- [selector.ts](#selectorts)
- [App.tsx](#apptsx)
- [UserLabel.tsx](#userlabeltsx)
- [위 설계에 따라 만든 장바구니 소스 코드](https://github.com/ghojeong/shopping-cart)

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

## redux-observable을 통한 비동기 처리

유저 정보를 API로 호출하여 받아온 후 스토어에서 관리하는<br>
비동기 작업을 [redux-observable](https://redux-observable.js.org/)을 통해 수행하는 코드입니다.

[넷플릭스](https://youtu.be/AslncyG8whg)의 설계를 참고했습니다.

이를 이용해 마우스 호버 시 유저 정보의 Popover를 띄워주는<br>
UserLabel 스마트 컴포넌트를 만들었습니다.

### model.ts

```model.ts
export class UserModel {
  userIdx!: number;
  name!: string;
  email!: string;
  phoneNumber!: string;
}
```

### action.ts

```action.ts
import { createAction, createAsyncAction, ActionType } from 'typesafe-actions';
import { UserModel } from 'app/model';

export const authLogout = createAction('AUTH_LOGOUT')();
export const fetchUserAsync = createAsyncAction(
  'FETCH_USER_REQUEST',
  'FETCH_USER_SUCCESS',
  'FETCH_USER_FAILURE',
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
export type Action =
  | ActionType<typeof authLogout>
  | ActionType<typeof fetchUserAsync>;
```

### service.ts

```service.ts
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import AxiosObservable from 'axios-observable';
import { UserModel } from 'app/model';
import { API_ENDPOINT } from 'app/config';

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

const httpClient = AxiosObservable.create({
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
import { Action, fetchUserAsync } from 'app/action';
import * as service from 'app/service';

type Service = typeof service;

export const fetchUserEpic: Epic = (
  actions$: ActionsObservable<Action>,
  _,
  { userService }: Service,
) => {
  // NOTE: API 요청 중인 userIdx를 inProgress에 임시 저장하여, 같은 유저의 정보를 동시에 요청하는 일이 없도록 한다.
  const inProgress: Record<number, boolean> = {};
  return actions$.pipe(
    filter(isActionOf(fetchUserAsync.request)),
    mergeMap(({ payload: { userIdx } }) => {
      if (inProgress[userIdx]) {
        return empty();
      }
      inProgress[userIdx] = true;
      return userService.getUser(userIdx).pipe(
        map((data) => fetchUserAsync.success(data)),
        catchError((err) =>
          of(
            fetchUserAsync.failure({
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

export const rootEpic = combineEpics(fetchUserEpic);
```

### epic.spec.ts

```epic.spec.ts
import { Subject, of, throwError } from 'rxjs';
import { Action } from 'redux';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { mocked } from 'ts-jest/utils';
import { fetchUserAsync } from 'app/action';
import * as service from 'app/service';
import { fetchUserEpic } from 'app/epic';

jest.mock('app/service');

describe('epic 테스트', () => {
  describe('fetchUserEpic 테스트', () => {
    const mockedUserService = mocked(service.userService, true);

    test('유저 정보 조회가 성공하면 success 액션이 발생해야 한다.', (done) => {
      // <!-- mock
      mockedUserService.getUser.mockReturnValueOnce(
        of({
          userIdx: 105,
          name: 'ghojeong',
          email: 'gho@email.com',
          phoneNumber: '+821012345678',
        }),
      );
      // -->
      const actions$ = ActionsObservable.of(fetchUserAsync.request({ userIdx: 105 }));
      const state$ = new StateObservable(new Subject(), {});
      const dependencies = { userService: mockedUserService };
      const actualActions: Action[] = [];

      fetchUserEpic(actions$, state$, dependencies).subscribe({
        next: (action: Action) => actualActions.push(action),
        complete: () => {
          expect(actualActions).toEqual([
            fetchUserAsync.success({
              userIdx: 105,
              name: 'ghojeong',
              email: 'gho@email.com',
              phoneNumber: '+821012345678',
            }),
          ]);
          done();
        },
      });
    });

    test('유저 정보 조회가 실패하면 failure 액션이 발생해야 한다.', (done) => {
      // <!-- mock
      mockedUserService.getUser = jest.fn().mockImplementation(
        () => throwError(new Error('getUser Error'))
      );
      // -->
      const actions$ = ActionsObservable.of(fetchUserAsync.request({ userIdx: 105 }));
      const state$ = new StateObservable(new Subject(), {});
      const dependencies = { userService: mockedUserService };
      const actualActions: Action[] = [];

      fetchUserEpic(actions$, state$, dependencies).subscribe({
        next: (action) => actualActions.push(action),
        complete: () => {
          expect(actualActions).toEqual([
            fetchUserAsync.failure({
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
import { UserModel } from 'app/model';
import { Action, authLogout, fetchUserAsync } from 'app/action';

export type UserState = Record<
  UserModel['userIdx'],
  {
    isLoading: boolean;
    errMsg: string | null;
    item?: UserModel; // NOTE: 데이터를 한 번도 받아오지 않았다면 비어있을 수 있다.
  }
>;
export const userInitialState: UserState = {};
export const userReducer = (
  userState = userInitialState,
  action: Action,
): UserState => {
  switch (action.type) {
    case getType(authLogout):
      return userInitialState;
    case getType(fetchUserAsync.request):
      return {
        ...userState,
        [action.payload.userIdx]: {
          ...(userState[action.payload.userIdx] || {}),
          isLoading: true,
          errMsg: null,
        },
      };
    case getType(fetchUserAsync.success):
      return {
        ...userState,
        [action.payload.userIdx]: {
          ...(userState[action.payload.userIdx] || {}),
          isLoading: false,
          errMsg: null,
          item: action.payload,
        },
      };
    case getType(fetchUserAsync.failure):
      return {
        ...userState,
        [action.payload.userIdx]: {
          ...(userState[action.payload.userIdx] || {}),
          isLoading: false,
          errMsg: action.payload.errMsg,
        },
      };
    default:
      return userState;
  }
};

export interface RootState {
  user: UserState;
}
export const rootReducer = combineReducers<RootState>({ user: userReducer });
```

### reducer.spec.ts

```reducer.spec.ts
import { authLogout, fetchUserAsync } from 'app/action';
import { UserState, userReducer, userInitialState } from 'app/reducer';

describe('userReducer 테스트', () => {
  test('authLogout 액션이 발행되면 userState가 초기값으로 세팅 되어야 한다.', () => {
    const userState: UserState = {
      105: {
        isLoading: false,
        errMsg: null,
        item: {
          userIdx: 105,
          name: 'ghojeong',
          email: 'gho@email.com',
          phoneNumber: '+821012345678',
        },
      },
    };
    const action = authLogout();
    expect(userReducer(userState, action)).toEqual(userInitialState);
  });

  test('fetchUserAsync를 request 하면 isLoading 이 true가 되어야 한다.', () => {
    const userState: UserState = userInitialState;
    const action = fetchUserAsync.request({ userIdx: 105 });
    expect(userReducer(userState, action)).toEqual({
      105: {
        isLoading: true,
        errMsg: null,
      },
    });
  });

  test('fetchUserAsync가 성공하면 userState에, 받아온 user이 추가 되어야 한다.', () => {
    const userState: UserState = userInitialState;
    const action = fetchUserAsync.success({
      userIdx: 105,
      name: 'ghojeong',
      email: 'gho@email.com',
      phoneNumber: '+821012345678',
    });
    expect(userReducer(userState, action)).toEqual({
      105: {
        isLoading: false,
        errMsg: null,
        item: {
          userIdx: 105,
          name: 'ghojeong',
          email: 'gho@email.com',
          phoneNumber: '+821012345678',
        },
      },
    });
  });

  test('fetchUserAsync가 실패하면 errMsg가 세팅 되어야 한다.', () => {
    const userState: UserState = userInitialState;
    const action = fetchUserAsync.failure({
      userIdx: 105,
      errMsg: 'fetchUserAsync Failed',
    });
    expect(userReducer(userState, action)).toEqual({
      105: {
        isLoading: false,
        errMsg: 'fetchUserAsync Failed',
      },
    });
  });
});
```

### selector.ts

```selector.ts
import { UserModel } from 'app/model';
import { RootState } from 'app/reducer';

export const userSelectorByIdxFactory =
  (userIdx: UserModel['userIdx']) =>
  ({ user }: RootState) =>
  user[userIdx];
```

### App.tsx

```App.tsx
import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userService } from 'app/service';
import { rootEpic } from 'app/epic';
import { rootReducer } from 'app/reducer';
import { AppRouter } from 'app/route';

const service = { userService };
const epicMiddleware = createEpicMiddleware({
  dependencies: service,
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
import { UserModel } from 'app/model';
import { fetchUserAsync } from 'app/action';
import { userSelectorByIdxFactory } from 'app/selector';

interface PropTypes {
  userIdx: UserModel['userIdx'];
}
export const UserLabel: FC<PropTypes> = ({ userIdx }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  // NOTE: userIdx가 바뀌지 않으면 셀렉터를 다시 만들지 않는다.
  const userSelector = useMemo(() => userSelectorByIdxFactory(userIdx), [userIdx]);
  const user = useSelector(userSelector);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(fetchUserAsync.request({ userIdx }));
  }, [dispatch, userIdx]);

  const hasErrMsg = user && !user.isLoading && user.errMsg;

  if (hasErrMsg) {
    return (
      <Typography noWrap component="div" variant="body2" color="error">
        <ErrorIcon />
        <span>{user.errMsg}</span>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(fetchUserAsync.request({ userIdx }));
          }}
        >
          Refresh
          <RefreshIcon />
        </Button>
      </Typography>
    );
  }
  if (user.item) {
    const { name, email, phoneNumber } = user.item;
    return (
      <>
        <span
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
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
