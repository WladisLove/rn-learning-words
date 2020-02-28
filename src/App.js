import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import StackNavigator from './components/StackNavigator';
import {persistor, store} from './store';
import {routes, screens} from './screens';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<View />} persistor={persistor}>
        <StackNavigator screens={screens} initialRouteName={routes.HOME} />
      </PersistGate>
    </Provider>
  );
};

export default App;
