import 'react-native-gesture-handler';
import React from 'react';
import {View, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import StackNavigator from './components/StackNavigator';
import OrientationTracker from './components/OrientationTracker';
import {persistor, store} from './store';
import {routes, screens} from './screens';
import {green_light} from './color';

const App = () => {
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

export default App;
