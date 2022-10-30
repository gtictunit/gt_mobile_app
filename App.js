import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import songsReducer from './store/reducers/songsReducers';
import LoginNavigator from './navigation/LoginNavigator';

// import BackgroundTask from 'react-native-background-task'
// import { backgroundSync } from './store/task'

// BackgroundTask.define(async () => {
//     backgroundSync()
//     BackgroundTask.finish()
// })

const rootReducer = combineReducers({
  songs: songsReducer,
});

const store = createStore(rootReducer);

export default function App() {
//   useEffect(() => {
//     BackgroundTask.schedule({
//         period: 1600, // Aim to run every 30 mins - more conservative on battery
//     })
// });
  useEffect(() => {
    SplashScreen.hide()
  },[])
  return (
    <Provider store={store}>
      <LoginNavigator />
    </Provider>
  );
}
