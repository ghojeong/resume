# 자신있는 코드

최근에 작성한 것 중, 자랑하고 싶은 코드를 정리한 문서입니다.

## 요약

- [자신있는 코드](#%ec%9e%90%ec%8b%a0%ec%9e%88%eb%8a%94-%ec%bd%94%eb%93%9c)
  - [요약](#%ec%9a%94%ec%95%bd)
  - [타입스크립트 리액트 컴포넌트](#%ed%83%80%ec%9e%85%ec%8a%a4%ed%81%ac%eb%a6%bd%ed%8a%b8-%eb%a6%ac%ec%95%a1%ed%8a%b8-%ec%bb%b4%ed%8f%ac%eb%84%8c%ed%8a%b8)
    - [ListFilter.tsx](#listfiltertsx)
  - [Global State 설계](#global-state-%ec%84%a4%ea%b3%84)
    - [model.ts](#modelts)
    - [actions.ts](#actionsts)
    - [services.ts](#servicests)
    - [epic.ts](#epicts)
    - [reducer.ts](#reducerts)
    - [selector.ts](#selectorts)
    - [App.tsx](#apptsx)
    - [UserInfoLabel.tsx](#userinfolabeltsx)

## 타입스크립트 리액트 컴포넌트

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
```

## Global State 설계

### model.ts

```model.ts
export class UserModel {
  userId!: number;
  firstName!: string | null;
  lastName!: string | null;
  email!: string;
  phoneNumber!: string;
}
```

### actions.ts

```actions.ts
import { createAction, createAsyncAction, ActionType } from 'typesafe-actions';
import { UserModel } from 'app/models';

export const checkAuthentication = createAction('CHECK_AUTHENTICATION')();
export const authLogin = createAction('AUTH_LOGIN')();
export const authLogout = createAction('AUTH_LOGOUT')();

export const fetchUserDetailAsync = createAsyncAction(
  'FETCH_USER_DETAIL_REQUEST',
  'FETCH_USER_DETAIL_FULFILLED',
  'FETCH_USER_DETAIL_REJECTED',
)<
  UserModel['userId'],
  UserModel,
  {
    userId: UserModel['userId'];
    errMsg: string;
  }
>();

export type Actions =
  | ActionType<typeof checkAuthentication>
  | ActionType<typeof authLogin>
  | ActionType<typeof authLogout>
  | ActionType<typeof fetchUserDetailAsync>;
```

### services.ts

```services.ts
import { httpClient, mapApiResponse, ApiResponse } from 'app/libs/http-client';
import { UserModel } from '@models';

export const userService = {
  getUser(userId: UserModel['userId']) {
    return httpClient.get<ApiResponse<UserModel>>(`/users/${userId}`).pipe(mapApiResponse());
  },
};
```

### epic.ts

```epic.ts
import { of, empty } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { map, filter, catchError, mergeMap, finalize } from 'rxjs/operators';
import { Actions, fetchUserDetailAsync } from 'app/actions';

export const fetchUserDetailsEpic: Epic = (action$: ActionsObservable<Actions>, _, { userService }) => {
  const inProgress: Record<number, boolean> = {};
  return action$.pipe(
    filter(isActionOf(fetchUserDetailAsync.request)),
    mergeMap(({ payload: userId }) => {
      if (inProgress[userId]) {
        return empty();
      }
      inProgress[userId] = true;
      return userService.getUser(userId).pipe(
        map((data) => fetchUserDetailAsync.success(data)),
        catchError((err) => of(fetchUserDetailAsync.failure({ userId, errMsg: err.message }))),
        finalize(() => {
          inProgress[userId] = false;
        }),
      );
    }),
  );
};

export const rootEpic = combineEpics(fetchUserDetailsEpic);
```

### reducer.ts

```reducer.ts
import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { UserModel } from 'app/models';
import { Actions, authLogout, fetchUserDetailAsync } from 'app/actions';

export type UserDetailsState = Record<
  UserModel['userId'],
  {
    isLoading: boolean;
    errMsg: string | null;
    item?: UserModel; // NOTE: 데이터를 한번도 받아오지 않았다면 비어있을수 있다.
  }
>;
const userDetailsInitialState: UserDetailsState = {};
const userDetailsReducer = (state = userDetailsInitialState, action: Actions): UserDetailsState => {
  switch (action.type) {
    case getType(authLogout):
      return userDetailsInitialState;
    case getType(fetchUserDetailAsync.request):
      return {
        ...state,
        [action.payload]: {
          ...(state[action.payload] || {}),
          isLoading: true,
          errMsg: null,
        },
      };
    case getType(fetchUserDetailAsync.success):
      return {
        ...state,
        [action.payload.userId]: {
          ...(state[action.payload.userId] || {}),
          isLoading: false,
          errMsg: null,
          item: action.payload,
        },
      };
    case getType(fetchUserDetailAsync.failure):
      return {
        ...state,
        [action.payload.userId]: {
          ...(state[action.payload.userId] || {}),
          isLoading: false,
          errMsg: action.payload.errMsg,
        },
      };
    default:
      return state;
  }
};

export interface RootState {
  userDetails: UserDetailsState;
}
export const createRootReducer = () =>
  combineReducers<RootState>({
    userDetails: userDetailsReducer,
  });
```

### selector.ts

```selector.ts
import mapValues from 'lodash/mapValues';
import { plainToClass } from 'class-transformer';
import { UserModel } from 'app/models';
import { RootState, UserDetailsState } from 'app/reducers';

const userDetailsSelector = (state: RootState): UserDetailsState => ({
  ...state.userDetails,
  ...{
    userDetails: mapValues(state.userDetails, (item) => plainToClass(UserModel, item)),
  },
});
export const userDetailsSelectorByIdFactory = (userId: UserModel['userId']) => (state: RootState) => {
  const userDetails = userDetailsSelector(state);
  return userDetails[userId] || null;
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
import { rootEpic } from 'app/epic';
import { AppRouter } from 'app/routes';
import { userService } from 'app/services';
import { createRootReducer } from 'app/reducers';
import { CombineProvider } from 'app/components';

const services = { userService };
const epicMiddleware = createEpicMiddleware({
  dependencies: services,
});
const store = createStore(createRootReducer(), composeWithDevTools(applyMiddleware(epicMiddleware)));
epicMiddleware.run(rootEpic);
const App = () => (
  <CombineProvider contexts={[{ context: Provider, props: { store } }]}>
    <AppRouter />
  </CombineProvider>
);

export default hot(module)(App);
```

### UserInfoLabel.tsx

```UserInfoLabel.tsx
import React, { FC, useMemo, useEffect, useState, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Skeleton from '@material-ui/lab/Skeleton';
import ErrorIcon from '@material-ui/icons/Error';
import RefreshIcon from '@material-ui/icons/Refresh';
import Typography from '@material-ui/core/Typography';
import { UserModel } from 'app/models';
import { fetchUserDetailAsync } from 'app/actions';
import { userDetailsSelectorByIdFactory } from 'app/selector';

interface PropTypes {
  userId: UserModel['userId'];
}

export const UserInfoLabel: FC<PropTypes> = ({ userId }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);
  // NOTE: userId가 바뀌지 않으면 셀렉터를 다시 만들지 않는다.
  const userSelector = useMemo(() => userDetailsSelectorByIdFactory(userId), [userId]);
  const userDetails = useSelector(userSelector);
  const displayedUsername = useMemo(() => {
    if (userDetails?.item) {
      if (userDetails.item.firstName && userDetails.item.lastName) {
        return `${userDetails.item.firstName} ${userDetails.item.lastName}`;
      }
      if (userDetails.item.firstName) {
        return userDetails.item.firstName;
      }
      return <div>No User</div>;
    }
    return null;
  }, [userDetails]);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(fetchUserDetailAsync.request(userId));
  }, [dispatch, userId]);

  const hasErrMsg = userDetails && !userDetails.isLoading && userDetails.errMsg;
  const hasDisplayedUsername = userDetails && !userDetails.isLoading && displayedUsername;

  if (hasErrMsg) {
    return (
      <Typography noWrap component="div" variant="body2" color="error">
        <ErrorIcon />
        <span>{userDetails.errMsg}</span>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(fetchUserDetailAsync.request(userId));
          }}
        >
          Refresh
          <RefreshIcon />
        </Button>
      </Typography>
    );
  }
  if (hasDisplayedUsername && userDetails.item) {
    return (
      <>
        <span onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
          {displayedUsername}
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
            <div>Email: {userDetails.item.email}</div>
            <div>Phone Number: {userDetails.item.phoneNumber}</div>
          </div>
        </Popover>
      </>
    );
  }
  return <Skeleton width={80} height={8} />;
};
```
