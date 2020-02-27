import React from 'react';
import {View, Text, Button} from 'react-native';
import styles from './styles';

const Home = ({navigation, route, ...props}) => {
  const {vocabularyId} = route.params;
  return (
    <View style={styles.root}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(vocabularyId)}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Home;
