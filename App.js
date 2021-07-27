import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableHighlight, Button } from 'react-native';
import { newBoard } from './newboard.js';

const numColumns = 7;

export default function App() {
  const [
    { roll, even, odd, position1, position2, message, optMessage, score, board, endOfGame, about },
    setGameState,
  ] = useState({
    roll: 0,
    even: false,
    odd: false,
    position1: 0,
    position2: 0,
    message: 'Roll to Start',
    optMessage: 'Player',
    score: 0,
    board: JSON.parse(JSON.stringify(newBoard)),
    endOfGame: false,
    about: true,
  });

  // render board
  const renderBoard = ({ item }) => {
    // Create About page
    if (about && item.aboutText !== undefined) {
      return <Text style={styles.itemAbout}>{item.aboutText}</Text>
      // Make non-board squares invisible
    } else if (item.invisible === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
      // mark current spot on board
    } else if (position1 === item.boardNumber && (item.invisible === undefined || item.invisible === false)) {
      return (
        <View style={[styles.item, styles.markSpot1]}>
          <Text style={styles.itemText}></Text>
        </View>
      );
      // mark board squares
    } else if (about === false) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      );
    }
  };

  // press Reset button
  const pressReset = useCallback(() => {
    setGameState(() => {
      return {
        roll: 0,
        even: false,
        odd: false,
        position1: 0,
        position2: 0,
        message: 'Roll again',
        optMessage: 'Player',
        score: 0,
        board: JSON.parse(JSON.stringify(newBoard)),
        endOfGame: false,
        about: false,
      };
    });
  }, []);

  // press Even button
  const pressEven = useCallback(() => {
    setGameState(prevGameState => {
      let workEven;
      let workMessage = 'Roll again';
      let workOptMessage = 'Player';
      if (prevGameState.even === true) {
        workEven = false;
      } else {
        workEven = true;
      }
      if (workEven === true && prevGameState.odd === true) {
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
        position1: prevGameState.position1,
        position2: prevGameState.position2,
        message: workMessage,
        optMessage: workOptMessage,
        score: prevGameState.score,
        board: prevGameState.board,
        endOfGame: prevGameState.endOfGame,
        about: prevGameState.about,
      };
    });
  }, []);

  // press Odd button
  const pressOdd = useCallback(() => {
    setGameState(prevGameState => {
      let workOdd;
      let workMessage = 'Roll again';
      let workOptMessage = 'Player';
      if (prevGameState.odd === true) {
        workOdd = false;
      } else {
        workOdd = true;
      }
      if (workOdd === true && prevGameState.even === true) {
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
        position1: prevGameState.position1,
        position2: prevGameState.position2,
        message: workMessage,
        optMessage: workOptMessage,
        score: prevGameState.score,
        board: prevGameState.board,
        endOfGame: prevGameState.endOfGame,
        about: prevGameState.about,
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
      let workOptMessage = 'Player';
      let workEndOfGame = false;
      if (randomNumber % 2 === 1 && prevGameState.odd === true) {
        randomNumber = randomNumber * 2;
        workMessage = 'Great...roll doubled';
      } else if (randomNumber % 2 === 0 && prevGameState.even === true) {
        randomNumber = randomNumber * 2;
        workMessage = 'Great...roll doubled';
      } else if (randomNumber % 2 === 1 && prevGameState.even === true) {
        randomNumber = 0;
        workMessage = 'Woops...roll set to 0';
      } else if (randomNumber % 2 === 0 && prevGameState.odd === true) {
        randomNumber = 0;
        workMessage = 'Woops...roll set to 0';
      }
      // calculate location in array that matches current boardNumber
      //let filteredBoard = workBoard.map((currentElement, index) => ({ ...currentElement, key1: index })).filter((currentElement) => {
      let filteredBoard = workBoard.filter(currentElement => {
        return currentElement.boardNumber !== undefined && currentElement.invisible !== true;
      });
      const newPosition1 = Math.min(prevGameState.position1 + randomNumber, filteredBoard.length);
      let i;
      let newPositionBoard1 = 0;
      for (i = 0; i < filteredBoard.length; i++) {
        if (filteredBoard[i].boardNumber === newPosition1) {
          newPositionBoard1 = filteredBoard[i].key - 1;
        }
      }
      // Need to adjust score if 'miss a turn' or 'gain a turn' was landed on
      if (workBoard[newPositionBoard1].extraScore !== undefined) {
        scoreAdj = scoreAdj + workBoard[newPositionBoard1].extraScore;
        if (workBoard[newPositionBoard1].extraScore < 0) {
          workOptMessage = 'Wonderful....you get an extra roll';
        } else {
          workOptMessage = 'Sorry....you lose a roll';
        }
      }
      // Add the detour squares and remove a single square after detour
      if (workBoard[newPositionBoard1].itemsToAdd !== undefined) {
        let workBoard2 = workBoard.slice();
        let i;
        for (i = 0; i < workBoard2.length; i++) {
          if (workBoard2[i].addItem !== undefined) {
            if (workBoard2[newPositionBoard1].itemsToAdd === workBoard2[i].addItem) {
              workBoard2[i].invisible = false;
              workBoard2[i].boardNumber = workBoard2[i].boardNumber + newPosition1;
            }
          }
          if (workBoard2[i].deleteItem !== undefined) {
            if (workBoard2[newPositionBoard1].itemsToAdd === workBoard2[i].deleteItem) {
              workBoard2[i].invisible = true;
            }
          }
          if (workBoard2[i].boardNumber !== undefined) {
            if (
              workBoard2[i].boardNumber > newPosition1 &&
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
      if (newPosition1 >= filteredBoard.length) {
        workMessage = 'Game Complete';
        workOptMessage = 'Player';
        workEndOfGame = true;
      }
      return {
        roll: randomNumber,
        even: false,
        odd: false,
        position1: newPosition1,
        position2: 0,
        message: workMessage,
        optMessage: workOptMessage,
        score: prevGameState.score + scoreAdj,
        board: workBoard,
        endOfGame: workEndOfGame,
        about: false,
      };
    });
  }, []);

  // render
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Button onPress={() => pressReset()} title="Reset" color="blue" />
        <View
          style={
            endOfGame
              ? styles.itemInvisible
              : even
              ? [styles.item, styles.markSpot1]
              : [styles.item, styles.itemBlue]
          }
        >
          <TouchableHighlight onPress={() => pressEven()}>
            <Text style={styles.itemText}>Even</Text>
          </TouchableHighlight>
        </View>
        <View
          style={
            endOfGame
              ? styles.itemInvisible
              : odd
              ? [styles.item, styles.markSpot1]
              : [styles.item, styles.itemBlue]
          }
        >
          <TouchableHighlight onPress={() => pressOdd()}>
            <Text style={styles.itemText}>Odd</Text>
          </TouchableHighlight>
        </View>
        <Button onPress={() => pressRoll()} title="Roll" color="blue" disabled={endOfGame ? true : false} />
        <View style={endOfGame ? styles.itemInvisible : styles.itemNav}>
          <Text style={styles.itemText}>{roll}</Text>
        </View>
        <View style={styles.itemNav}>
          <Text style={styles.itemText}>Score</Text>
        </View>
        <View style={styles.itemNav}>
          <Text style={styles.itemText}>{score}</Text>
        </View>
      </View>
      <View style={styles.message}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.message}>{optMessage}</Text>
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
    flex: 0,
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  item: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / 15,
  },
  itemAbout: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    height: Dimensions.get('window').width / 15,
  },
  itemNav: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: 45,
  },
  itemBlue: {
    backgroundColor: 'blue',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
    fontSize: 8,
  },
  message: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  board: {
    flex: 7,
    fontSize: 10,
    fontWeight: 'bold',
    marginVertical: 1,
  },
  markSpot1: {
    backgroundColor: 'red',
  },
  markSpot2: {
    backgroundColor: 'black',
  },
});
