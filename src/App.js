import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Vocabulary from './screens/Vocabulary';
import {routes} from './screens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.HOME} headerMode="none">
        <Stack.Screen name={routes.HOME} component={Home} />
        <Stack.Screen name={routes.VOCABULARY} component={Vocabulary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
