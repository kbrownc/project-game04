import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';

export default function App() {

  const nav = [
    { key: 1, name: 'Play' }, 
    { key: 2, name: '', invisible: true }, 
    { key: 3, name: '', invisible: true }, 
    { key: 4, name: '', invisible: true },
    { key: 5, name: '', invisible: true }, 
    { key: 6, name: 'Score' }, 
    { key: 7, name: '0' },
  ];

  const board = [
    { key: 1, name: 'End' }, 
    { key: 2, name: '', invisible: true }, 
    { key: 3, name: '', invisible: true }, 
    { key: 4, name: 'Roll' },
    { key: 5, name: '', invisible: true }, 
    { key: 6, name: '', invisible: true }, 
    { key: 7, name: 'Start' },
  ];

  const numColumns = 7;

  renderItem = ({ item }) => {
    if (item.invisible === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={styles.item}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.nav}>
            <FlatList
              data={nav}
              renderItem={renderItem}
              style={styles.container}
              numColumns={numColumns}
            />
            <View style={styles.message}>
                <Text style={styles.message}>Roll Again</Text>
                  <Text style={styles.message}>Kim</Text>
            </View>
        </View>
        <View style={styles.board}>
            <FlatList
              data={board}
              renderItem={renderItem}
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
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / 7, // approximate a square
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
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
  }
});
