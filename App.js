import React from 'react';
import {View, StyleSheet } from 'react-native';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { enableScreens } from 'react-native-screens';
import devToolsEnhancer from 'remote-redux-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';
enableScreens();

import AppNavigation from './navigation/AppNavigation';
import Message from './components/Message';

import hydrantsReducer from './store/reducers/hydrants';
import userReducer from './store/reducers/user';
import messageReducer from './store/reducers/message'


const rootReducer = combineReducers({
  hydrants: hydrantsReducer,
  user: userReducer,
  message: messageReducer
});

const store = createStore(
  rootReducer, 
  composeWithDevTools((applyMiddleware(ReduxThunk)))
  );

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppNavigation />
        <Message/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
