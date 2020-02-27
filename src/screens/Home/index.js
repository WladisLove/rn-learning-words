import React from 'react';
import {ScrollView, View, Text, Button, StatusBar} from 'react-native';
import {routes} from '../index';
import styles from './styles';

const Home = ({navigation, ...props}) => {
  return (
    <>
      <StatusBar />
      <ScrollView
        bounces={false}
        contentInsetAdjustmentBehavior="always"
        style={styles.scrollView}>
        <View>
          <Text>Header</Text>
        </View>
        {global.HermesInternal == null ? null : (
          <View style={styles.engine}>
            <Text style={styles.footer}>Engine: Hermes</Text>
          </View>
        )}
        <View style={styles.body}>
          <Text>Body</Text>
          <Button
            title="Go to Details"
            onPress={() =>
              navigation.navigate(routes.VOCABULARY, {
                itemId: 86,
                otherParam: 'anything you want here',
              })
            }
          />
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
