import React, {useState, useCallback} from 'react';
import 
  { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { newBoard } from './newboard.js';

export default function App() {
  const [{ roll, position, message, optMessage, score, board }, setGameState] = useState({
    roll: 0,
    position: 0,
    message: 'Roll again',
    optMessage: 'Kim',
    score: 0,
    board: JSON.parse(JSON.stringify(newBoard)),
  });

// Nav bar
  const nav = [
    { key: 1, name: 'Play', invisible: false }, 
    { key: 2, name: '', invisible: true }, 
    { key: 3, name: '', invisible: true }, 
    { key: 4, name: '', invisible: true },
    { key: 5, name: '', invisible: true }, 
    { key: 6, name: 'Score' }, 
    { key: 7, name: 0 },
  ];

  const numColumns = 7;

// render Nav Bar
  const renderNav = ({ item }) => {
    if (item.invisible === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    if (item.name === 'Play') {
      return (
        <View style={styles.item}>
        <TouchableOpacity onPress={() => pressPlay( )}> 
                <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
        </View>
        )
    }
    if (item.key === 7) {
      return (
        <View style={styles.item}>
                <Text style={styles.itemText}>{score}</Text>
        </View>
        )
    }
    return (
      <View style={styles.item}>
          <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  // render board
  const renderBoard = ({ item }) => {
    if (item.invisible === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    // Sho ROLL button
    if (item.name === 'Roll') {
      return (
        <View style={styles.item}>
        <TouchableOpacity onPress={() => pressRoll(item.key)}> 
                <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
        </View>
        )
    }
    // Show ROLL NUMBER
    if (item.key === 11) {
      return (
        <View style={styles.item}>
                <Text style={styles.itemText}>{roll}</Text>
        </View>
        )
    }
    // mark current spot on board 
    if (position === item.boardNumber && 
          (item.invisible === undefined || item.invisible === false)) {
      return (
        <View style={[styles.item, styles.markSpot]}>
                <Text style={styles.itemText}></Text>
        </View>
        )
    }
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

// press Play button
  const pressPlay = useCallback( () => {
    setGameState( () => {
      return {
        roll: null,
        position: 0,
        message: 'Roll again',
        optMessage: 'Kim',
        score: 0,
        board: JSON.parse(JSON.stringify(newBoard)),
    };
  });
  }, []);

// press Roll button
  const pressRoll = useCallback(() => {
    setGameState(prevGameState => {
      let workBoard = prevGameState.board.slice();
      const randomNumber = Math.floor(Math.random() * 6) + 1;
 // calculate location in array that matches current boardNumber     
      let filteredBoard = workBoard.filter(function(currentElement) {
        return (currentElement.boardNumber !== undefined && currentElement.invisible !== true);
      });
      const newPosition = Math.min(prevGameState.position + randomNumber, filteredBoard.length);
      let i;
      let newPositionBoard;
      for (i=0; i < filteredBoard.length; i++) {
        if (filteredBoard[i].boardNumber === newPosition) {
          newPositionBoard = filteredBoard[i].key - 1;
        }
      }
      let scoreAdj = 1;
      let workMessage = 'Roll again';
      let workOptMessage = 'Kim';
      // Need to adjust score if 'miss a turn' or 'gain a turn' was landed on
      if (workBoard[newPositionBoard].extraScore !== undefined) {
        scoreAdj = scoreAdj + workBoard[newPositionBoard].extraScore;
        if (workBoard[newPositionBoard].extraScore < 0) {
          workOptMessage = 'Wonderful....you get an extra roll';
        } else {
          workOptMessage = 'Sorry....you lose a roll';
        }
      }
      // Add the detour squares and remove a single square after detour
      if (workBoard[newPositionBoard].itemsToAdd !== undefined) {
        let workBoard2 = workBoard.slice()
        let i;
        for (i=0; i < workBoard2.length; i++) {
          if (workBoard2[i].addItem !== undefined) {
            if (workBoard2[newPositionBoard].itemsToAdd === workBoard2[i].addItem) {
              workBoard2[i].invisible = false;
              workBoard2[i].boardNumber = workBoard2[i].boardNumber + newPosition;          
            }
          }
          if (workBoard2[i].deleteItem !== undefined) {
            if (workBoard2[newPositionBoard].itemsToAdd === workBoard2[i].deleteItem) {
              workBoard2[i].invisible = true;
            }
          }
          if (workBoard2[i].boardNumber !== undefined) {
            if (workBoard2[i].boardNumber > newPosition && workBoard2[i].invisible === undefined &&
                workBoard2[i].addItem === undefined) {
              workBoard2[i].boardNumber = workBoard2[i].boardNumber + 6;
            }
          }
        }
        workBoard = workBoard2.slice();
        workOptMessage = 'You have a longer journey';
      }
      // Check for end of Game
      if (newPosition >= filteredBoard.length) {
        workMessage = 'Game Complete';
        workOptMessage = 'Kim';
        workBoard[3].invisible = true;
        workBoard[10].invisible = true;
      } else {
        workMessage = 'Role Again';
      }
      return {
        roll: randomNumber,
        position: newPosition,
        message: workMessage,
        optMessage: workOptMessage,
        score: prevGameState.score + scoreAdj,
        board: workBoard,
      };
    });
  }, []);

// render
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
                <Text style={styles.message}>{message}</Text>
                  <Text style={styles.message}>{optMessage}</Text>
            </View>
        </View>
        <View style={styles.board}>
            <FlatList
              data={board}
              renderItem={renderBoard}
              style={styles.board}
              numColumns={numColumns}
            />
        </View> 
    </View>
  );
}

// stylesheets
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
  },
  markSpot: {
  backgroundColor: 'red',
  }
});
