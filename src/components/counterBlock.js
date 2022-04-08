import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CounterBlock = ({text, count}) => (
  <View style={styles.blockContainer}>
    <Text style={styles.blockText}>{`${text}${count}`}</Text>
  </View>
);

const styles = StyleSheet.create({
  blockContainer: {
    backgroundColor: '#246EE9',
    width: 100,
    height: 40,
    margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  blockText: {color: 'white', fontSize: 16},
});

export default CounterBlock;
