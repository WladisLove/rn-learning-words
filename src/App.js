import 'react-native-gesture-handler';
import React from 'react';
import StackNavigator from './components/StackNavigator';
import {routes, screens} from './screens';

const App = () => {
  return <StackNavigator screens={screens} initialRouteName={routes.HOME} />;
};

export default App;
