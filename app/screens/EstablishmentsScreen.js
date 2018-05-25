import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class EstablishmentsScreen extends React.Component {
  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Text>Establishments</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
