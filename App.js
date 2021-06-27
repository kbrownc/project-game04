import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableHighlight } from 'react-native';
import { newBoard } from './newboard.js';

const numColumns = 7;

export default function App() {
  const [{ roll, even, odd, position, message, optMessage, score, board }, setGameState] = useState({
    roll: 0,
    even: false,
    odd: false,
    position: 0,
    message: 'Roll again',
    optMessage: 'Kim',
    score: 0,
    board: JSON.parse(JSON.stringify(newBoard)),
  });

  // Nav bar
  const nav = [
    { key: 1, name: 'PLAY', invisible: false },
    { key: 2, name: '', invisible: true },
    { key: 3, name: '', invisible: true },
    { key: 4, name: '', invisible: true },
    { key: 5, name: '', invisible: true },
    { key: 6, name: 'Score' },
    { key: 7, name: 0 },
  ];

  // render Nav Bar
  const renderNav = ({ item }) => {
    const scoreNumberKey = 7;
    if (item.invisible === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    } else if (item.name === 'PLAY') {
      return (
        <View style={styles.item}>
          <TouchableHighlight onPress={() => pressPlay()}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableHighlight>
        </View>
      );
    } else if (item.key === scoreNumberKey) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{score}</Text>
        </View>
      );
    }
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  // render board
  const renderBoard = ({ item }) => {
    const rollNumberKey = 11;
    if (item.invisible === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    // Show ROLL button
    } else if (item.name === 'ROLL') {
      return (
        <View style={styles.item}>
          <TouchableHighlight onPress={() => pressRoll()}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableHighlight>
        </View>
      );
    // Create Even button and mark it if it has been selected
    } else if (item.name === 'EVEN') {
      return (
        <View style={even ? [styles.item, styles.markSpot] : styles.item}>
          <TouchableHighlight onPress={() => pressEven()}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableHighlight>
        </View>
      );
    // Create Odd button and mark it if it has been selected
    } else if (item.name === 'ODD') {
      return (
        <View style={odd ? [styles.item, styles.markSpot] : styles.item}>
          <TouchableHighlight onPress={() => pressOdd()}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableHighlight>
        </View>
      );
    // Show ROLL NUMBER
    } else if (item.key === rollNumberKey) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{roll}</Text>
        </View>
      );
    // mark current spot on board
    } else if (position === item.boardNumber && (item.invisible === undefined || item.invisible === false)) {
      return (
        <View style={[styles.item, styles.markSpot]}>
          <Text style={styles.itemText}></Text>
        </View>
      );
    } else {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
    }
  };

  // press Play button
  const pressPlay = useCallback(() => {
    setGameState(() => {
      return {
        roll: 0,
        even: false,
        odd: false,
        position: 0,
        message: 'Roll again',
        optMessage: 'Kim',
        score: 0,
        board: JSON.parse(JSON.stringify(newBoard)),
      };
    });
  }, []);

  // press Even button
  const pressEven = useCallback(() => {
    setGameState(prevGameState => {
      let workEven;
      let workMessage = 'Roll again';
      let workOptMessage = 'Kim';
      if (prevGameState.even === true) {
        workEven = false;
      } else {
        workEven = true;
      }
      if (workEven === true && prevGameState.odd === true) {
        workMessage = 'Roll again';
        workOptMessage = 'cannot select both ODD and EVEN';
        workEven = false;
      }
      if (workEven === false && prevGameState.odd === true) {
        workMessage = 'Roll again';
        workOptMessage = 'ODD selected';
      }
      if (prevGameState.odd === false && workEven === true) {
        workMessage = 'Roll again';
        workOptMessage = 'EVEN selected';
      }
      return {
        roll: prevGameState.roll,
        even: workEven,
        odd: prevGameState.odd,
        position: prevGameState.position,
        message: workMessage,
        optMessage: workOptMessage,
        score: prevGameState.score,
        board: prevGameState.board,
      };
    });
  }, []);

  // press Odd button
  const pressOdd = useCallback(() => {
    setGameState(prevGameState => {
      let workOdd;
      let workMessage = 'Roll again';
      let workOptMessage = 'Kim';
      if (prevGameState.odd === true) {
        workOdd = false;
      } else {
        workOdd = true;
      }
      if (workOdd === true && prevGameState.even === true) {
        workMessage = 'Roll again';
        workOptMessage = 'cannot select both ODD and EVEN';
        workOdd = false;
      }
      if (workOdd === true && prevGameState.even === false) {
        workMessage = 'Roll again';
        workOptMessage = 'ODD selected';
      }
      if (workOdd === false && prevGameState.even === true) {
        workMessage = 'Roll again';
        workOptMessage = 'EVEN selected';
      }
      return {
        roll: prevGameState.roll,
        even: prevGameState.even,
        odd: workOdd,
        position: prevGameState.position,
        message: workMessage,
        optMessage: workOptMessage,
        score: prevGameState.score,
        board: prevGameState.board,
      };
    });
  }, []);

  // press Roll button
  const pressRoll = useCallback(() => {
    setGameState(prevGameState => {
      let workBoard = prevGameState.board.slice();
      let randomNumber = Math.floor(Math.random() * 6) + 1;
      let scoreAdj = 1;
      let workMessage = 'Roll again';
      let workOptMessage = 'Kim';
      if ((randomNumber % 2 === 1) && prevGameState.odd === true) {
        randomNumber = randomNumber * 2;
        workMessage = 'roll doubled';
      } else if ((randomNumber % 2 === 0) && prevGameState.even === true) {
        randomNumber = randomNumber * 2;
        workMessage = 'roll doubled';
      } else if ((randomNumber % 2 === 1) && prevGameState.even === true) {
        randomNumber = 0;
        workMessage = 'roll set to 0';
      } else if ((randomNumber % 2 === 0) && prevGameState.odd === true) {
        randomNumber = 0;
        workMessage = 'roll set to 0';
      }
      // calculate location in array that matches current boardNumber
      let filteredBoard = workBoard.filter(function (currentElement) {
        return currentElement.boardNumber !== undefined && currentElement.invisible !== true;
      });
      const newPosition = Math.min(prevGameState.position + randomNumber, filteredBoard.length);
      let i;
      let newPositionBoard;
      for (i = 0; i < filteredBoard.length; i++) {
        if (filteredBoard[i].boardNumber === newPosition) {
          newPositionBoard = filteredBoard[i].key - 1;
        }
      }
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
        let workBoard2 = workBoard.slice();
        let i;
        for (i = 0; i < workBoard2.length; i++) {
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
            if (
              workBoard2[i].boardNumber > newPosition &&
              workBoard2[i].invisible === undefined &&
              workBoard2[i].addItem === undefined
            ) {
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
        workBoard[9].invisible = true;
        workBoard[11].invisible = true;
      }
      return {
        roll: randomNumber,
        even: false,
        odd: false,
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
        <FlatList data={nav} renderItem={renderNav} style={styles.nav} numColumns={numColumns} />
        <View style={styles.message}>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.message}>{optMessage}</Text>
        </View>
      </View>
      <View style={styles.board}>
        <FlatList data={board} renderItem={renderBoard} style={styles.board} numColumns={numColumns} />
      </View>
    </View>
  );
}

// stylesheets
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
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
    fontSize: 10,
  },
  message: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  board: {
    flex: 7,
    fontSize: 10,
    fontWeight: 'bold',
    marginVertical: 1,
  },
  markSpot: {
    backgroundColor: 'red',
  },
});
