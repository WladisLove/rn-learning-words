import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {green_light, navy_dark} from '../../color';

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  root: {
    backgroundColor: green_light,
    padding: 20,
  },
  line1: {
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 4,
    fontWeight: '700',
  },
  line2: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
    color: navy_dark,
    fontFamily: isIOS ? 'Iowan Old Style' : 'serif',
    fontStyle: 'italic',
  },
});

const AppMotto = () => (
  <View style={styles.root}>
    <Text style={styles.line1}>TIME 2</Text>
    <Text style={styles.line2}>Learn Words</Text>
  </View>
);

export default AppMotto;
