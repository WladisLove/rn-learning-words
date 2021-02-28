import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import codePush from "react-native-code-push";
import StackNavigator from './components/StackNavigator';
import OrientationTracker from './components/OrientationTracker';
import {persistor, store} from './store';
import {routes, screens} from './screens';
import {green_light} from './color';

const App = () => {
  useEffect(() => {
    SplashScreen && SplashScreen.hide();
    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE
  });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<View />} persistor={persistor}>
        <StatusBar backgroundColor={green_light} barStyle="dark-content" />
        <StackNavigator screens={screens} initialRouteName={routes.HOME} />
        <OrientationTracker />
      </PersistGate>
    </Provider>
  );
};

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE
};

export default codePush(codePushOptions)(App);
