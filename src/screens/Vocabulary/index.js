import React from 'react';
import {View, Text, Button} from 'react-native';
import {routes} from '../index';
import styles from './styles';

const Home = ({navigation, route, ...props}) => {
  const {itemId, otherParam} = route.params;
  return (
    <View style={styles.root}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push(routes.VOCABULARY, {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate(routes.HOME)}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Home;
