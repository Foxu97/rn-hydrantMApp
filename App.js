import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import AppNavigation from './navigation/AppNavigation';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { enableScreens } from 'react-native-screens';
enableScreens();

import hydrantsReducer from './store/reducers/hydrants';
import usersReducer from './store/reducers/users';

const rootReducer = combineReducers({
  hydrants: hydrantsReducer,
  users: usersReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

