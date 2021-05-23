import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { newBoard } from './newboard.js';

export default function App() {

  const nav = [
    { key: 1, name: 'Play', invisible: false }, 
    { key: 2, name: '', invisible: true }, 
    { key: 3, name: '', invisible: true }, 
    { key: 4, name: '', invisible: true },
    { key: 5, name: '', invisible: true }, 
    { key: 6, name: 'Score' }, 
    { key: 7, name: '0' },
  ];

  const numColumns = 7;

  const renderNav = ({ item }) => {
    if (item.invisible === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    if (item.name === 'Play') {
      return (
        <View style={styles.item}>
        <TouchableOpacity onPress={() => pressPlay(item.key)}> 
                <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
        </View>
        )
    }
    return (
      <View style={styles.item}>
          <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  const renderBoard = ({ item }) => {
    if (item.invisible === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    if (item.name === 'Roll') {
      return (
        <View style={styles.item}>
        <TouchableOpacity onPress={() => pressRoll(item.key)}> 
                <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
        </View>
        )
    }
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  const pressPlay = (key) => {
    console.log('Play', key);
  };

  const pressRoll = (key) => {
    console.log('Roll', key);
  };

  return (
    <View style={styles.container}>
        <View style={styles.nav}>
            <FlatList
              data={nav}
              renderItem={renderNav}
              style={styles.nav}
              numColumns={numColumns}
            />
            <View style={styles.message}>
                <Text style={styles.message}>Roll Again</Text>
                  <Text style={styles.message}>Kim</Text>
            </View>
        </View>
        <View style={styles.board}>
            <FlatList
              data={newBoard}
              renderItem={renderBoard}
              style={styles.board}
              numColumns={numColumns}
            />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  nav: {
    flex: 2,
    fontSize: 10,
    fontWeight: 'bold',
    marginVertical: 1,
  },
  item: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / 15,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
  message: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  board: {
    flex: 7,
    fontSize: 10,
    fontWeight: 'bold',
    marginVertical: 5,
  }
});
