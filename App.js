import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableHighlight, Button, Image } from 'react-native';
import { newBoard } from './newboard.js';

const numColumns = 7;

export default function App() {
  const [
    {
      roll,
      even,
      odd,
      position1,
      position2,
      message,
      optMessage,
      score,
      board,
      endOfGame,
      about,
      numberOfPlayers,
      whoseTurn,
    },
    setGameState,
  ] = useState({
    roll: 0,
    even: false,
    odd: false,
    position1: 0,
    position2: 0,
    message: '1-Player Game',
    optMessage: '2-Player Game',
    score: 0,
    board: JSON.parse(JSON.stringify(newBoard)),
    endOfGame: false,
    about: true,
    numberOfPlayers: 0,
    whoseTurn: 0,
  });

  // render board
  const renderBoard = ({ item }) => {
    // Create About page
    if (about && item.aboutText !== undefined) {
      return <Text style={styles.itemAbout}>{item.aboutText}</Text>;
    // Make non-board squares invisible
    } else if (item.invisible === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    // mark current spot(s) on board
    } else if (position1 === item.boardNumber && position2 === item.boardNumber && 
                (item.invisible === undefined || item.invisible === false)) {
      return (
        <View style={[styles.item, styles.markSpot]}>
          <Image source={require('./assets/player-3.png')} />
        </View>
      );
    } else if (position1 === item.boardNumber && (item.invisible === undefined || item.invisible === false)) {
      return (
        <View style={[styles.item, styles.markSpot]}>
          <Image source={require('./assets/player-1.png')} />
        </View>
      );
    } else if (position2 === item.boardNumber && (item.invisible === undefined || item.invisible === false)) {
      return (
        <View style={[styles.item, styles.markSpot]}>
          <Image source={require('./assets/player-2.png')} />
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
    setGameState(prevGameState => {
      let workNumberOfPlayers = prevGameState.numberOfPlayers;
      let workMessage = prevGameState.message;
      let workOptMessage = prevGameState.optMessage;
      let workAbout = prevGameState.about;
      let workWhoseTurn = 1;
      if (workNumberOfPlayers === 1 && prevGameState.position1 === 0) {
        workNumberOfPlayers = 0;
        workMessage = '1-player Game';
        workOptMessage = '2-player Game';
        workWhoseTurn = 0;
        workAbout = true;
      }
      if (workNumberOfPlayers === 2 && prevGameState.position1 === 0 && prevGameState.position2 === 0) {
        workNumberOfPlayers = 0;
        workMessage = '1-player Game';
        workOptMessage = '2-player Game';
        workWhoseTurn = 0;
        workAbout = true;
      }
      return {
        roll: 0,
        even: false,
        odd: false,
        position1: 0,
        position2: 0,
        message: workMessage,
        optMessage: workOptMessage,
        score: 0,
        board: JSON.parse(JSON.stringify(newBoard)),
        endOfGame: false,
        about: workAbout,
        numberOfPlayers: workNumberOfPlayers,
        whoseTurn: workWhoseTurn,
      };
    });
  }, []);

  // pressed 1-Player button
  const pressPlayers1 = useCallback(() => {
    setGameState(prevGameState => {
      let workNumberOfPlayers = 1;
      let workMessage = 'Roll again';
      let workOptMessage = 'Player 1';
      return {
        roll: prevGameState.roll,
        even: prevGameState.even,
        odd: prevGameState.odd,
        position1: prevGameState.position1,
        position2: prevGameState.position2,
        message: workMessage,
        optMessage: workOptMessage,
        score: prevGameState.score,
        board: prevGameState.board,
        endOfGame: prevGameState.endOfGame,
        about: false,
        numberOfPlayers: workNumberOfPlayers,
        whoseTurn: 1,
      };
    });
  }, []);

  // pressed 2-Player button
  const pressPlayers2 = useCallback(() => {
    setGameState(prevGameState => {
      let workNumberOfPlayers = 2;
      let workMessage = 'Roll again';
      let workOptMessage = 'Player 1';
      return {
        roll: prevGameState.roll,
        even: prevGameState.even,
        odd: prevGameState.odd,
        position1: prevGameState.position1,
        position2: prevGameState.position2,
        message: workMessage,
        optMessage: workOptMessage,
        score: prevGameState.score,
        board: prevGameState.board,
        endOfGame: prevGameState.endOfGame,
        about: false,
        numberOfPlayers: workNumberOfPlayers,
        whoseTurn: 1,
      };
    });
  }, []);

  // press Even button
  const pressEven = useCallback(() => {
    setGameState(prevGameState => {
      let workEven;
      let workMessage = 'Roll again';
      if (prevGameState.even === true) {
        workEven = false;
      } else {
        workEven = true;
      }
      if (workEven === true && prevGameState.odd === true) {
        workEven = false;
      }
      if (workEven === false && prevGameState.odd === true) {
        workMessage = 'Roll again (ODD only)';
      }
      if (prevGameState.odd === false && workEven === true) {
        workMessage = 'Roll again (EVEN only)';
        
      }
      return {
        roll: prevGameState.roll,
        even: workEven,
        odd: prevGameState.odd,
        position1: prevGameState.position1,
        position2: prevGameState.position2,
        message: workMessage,
        optMessage: prevGameState.optMessage,
        score: prevGameState.score,
        board: prevGameState.board,
        endOfGame: prevGameState.endOfGame,
        about: prevGameState.about,
        numberOfPlayers: prevGameState.numberOfPlayers,
        whoseTurn: prevGameState.whoseTurn,
      };
    });
  }, []);

  // press Odd button
  const pressOdd = useCallback(() => {
    setGameState(prevGameState => {
      let workOdd;
      let workMessage = 'Roll again';
      if (prevGameState.odd === true) {
        workOdd = false;
      } else {
        workOdd = true;
      }
      if (workOdd === true && prevGameState.even === true) {
        workOdd = false;
      }
      if (workOdd === true && prevGameState.even === false) {
        workMessage = 'Roll again (ODD only)';
      }
      if (workOdd === false && prevGameState.even === true) {
        workMessage = 'Roll again (EVEN only)';
      }
      return {
        roll: prevGameState.roll,
        even: prevGameState.even,
        odd: workOdd,
        position1: prevGameState.position1,
        position2: prevGameState.position2,
        message: workMessage,
        optMessage: prevGameState.optMessage,
        score: prevGameState.score,
        board: prevGameState.board,
        endOfGame: prevGameState.endOfGame,
        about: prevGameState.about,
        numberOfPlayers: prevGameState.numberOfPlayers,
        whoseTurn: prevGameState.whoseTurn,
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
      let workWhoseTurn = prevGameState.whoseTurn;
      if (workWhoseTurn === 1 && prevGameState.numberOfPlayers === 2) {
        workWhoseTurn = 2;
        workOptMessage = 'Player 2';
      } else {
        workWhoseTurn = 1;
        workOptMessage = 'Player 1';
      }
      // Is workmessage obsolete code ????????
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
      let filteredBoard = workBoard.filter(currentElement => {
        return currentElement.boardNumber !== undefined && currentElement.invisible !== true;
      });
      let newPosition1 = prevGameState.position1;
      let newPosition2 = prevGameState.position2;
      if (prevGameState.whoseTurn === 1 || numberOfPlayers === 1) {
        newPosition1 = Math.min(prevGameState.position1 + randomNumber, filteredBoard.length);
      } else {
        newPosition2 = Math.min(prevGameState.position2 + randomNumber, filteredBoard.length);
      }
      let i;
      let newPositionBoard1 = 0;
      let newPositionBoard2 = 0;
      for (i = 0; i < filteredBoard.length; i++) {
        if (filteredBoard[i].boardNumber === newPosition1) {
          newPositionBoard1 = filteredBoard[i].key - 1;
        }
        if (filteredBoard[i].boardNumber === newPosition2) {
          newPositionBoard2 = filteredBoard[i].key - 1;
        }
      }
      // Need to adjust score if 'miss a turn' or 'gain a turn' was landed on
      if (workBoard[newPositionBoard1].extraScore !== undefined) {
        scoreAdj = scoreAdj + workBoard[newPositionBoard1].extraScore;
        if (workBoard[newPositionBoard1].extraScore < 0) {
          if (workWhoseTurn === 1 && prevGameState.numberOfPlayers === 2) {
            workWhoseTurn = 2;
            workMessage = 'Roll (extra roll)';
          } else {
            workWhoseTurn = 1;
            workMessage = 'Roll (extra roll)';
          }
        } else {
          if (workWhoseTurn === 1 && prevGameState.numberOfPlayers === 2) {
            workWhoseTurn = 2;
            workMessage = 'Roll (lose a roll)';
          } else {
            workWhoseTurn = 1;
            workMessage = 'Roll (lose a roll)';
          }
        }
      }
      // Add the detour squares and remove a single square after detour
      if (workBoard[newPositionBoard1].itemsToAdd !== undefined) {
        // Player 1 landed on detour spot
        if (prevGameState.whoseTurn === 1) {
          let workBoard2 = workBoard.slice();
          let notAlreadyDeleted = false;
          let i;
          for (i = 0; i < workBoard2.length; i++) {
            // Set detour to be visible
            if (workBoard2[i].addItem !== undefined) {
              if (workBoard2[newPositionBoard1].itemsToAdd === workBoard2[i].addItem) {
                workBoard2[i].invisible = false;
                workBoard2[i].boardNumber = workBoard2[i].boardNumber + newPosition1;
              }
            }
            // Set square in middle of detour to be invisible
            if (workBoard2[i].deleteItem !== undefined) {
              if (workBoard2[newPositionBoard1].itemsToAdd === workBoard2[i].deleteItem) {
                if (workBoard2[i].invisible === true) {
                  notAlreadyDeleted = true;
                }
                workBoard2[i].invisible = true;
              }
            }
            // Increment all board squares beyond this detour by 6
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
          // Adjust for situation where the other player is already past detour
          if (prevGameState.numberOfPlayers = 2 && prevGameState.position2 > newPosition1 && notAlreadyDeleted ) {
            newPosition2 = newPosition2 + 6;
          }
          workBoard = workBoard2.slice();
          workMessage = 'Roll (longer journey)';
        // Player 2 landed on detour spot
        } else {
          let workBoard2 = workBoard.slice();
          let notAlreadyDeleted = false;
          let i;
          for (i = 0; i < workBoard2.length; i++) {
            // Set detour to be visible
            if (workBoard2[i].addItem !== undefined) {
              if (workBoard2[newPositionBoard2].itemsToAdd === workBoard2[i].addItem) {
                workBoard2[i].invisible = false;
                workBoard2[i].boardNumber = workBoard2[i].boardNumber + newPosition2;
              }
            }
            // Set square in middle of detour to be invisible
            if (workBoard2[i].deleteItem !== undefined) {
              if (workBoard2[newPositionBoard2].itemsToAdd === workBoard2[i].deleteItem) {
                if (workBoard2[i].invisible === true) {
                  notAlreadyDeleted = true;
                }
                workBoard2[i].invisible = true;
              }
            }
            // Increment all board squares beyond this detour by 6
            if (workBoard2[i].boardNumber !== undefined) {
              if (
                workBoard2[i].boardNumber > newPosition2 &&
                workBoard2[i].invisible === undefined &&
                workBoard2[i].addItem === undefined
              ) {
                workBoard2[i].boardNumber = workBoard2[i].boardNumber + 6;
              }
            }
          }
          // Adjust for situation where the other player is already past detour
          if (prevGameState.numberOfPlayers = 2 && prevGameState.position1 > newPosition2 && notAlreadyDeleted) {
            newPosition1 = newPosition1 + 6;
          }
          workBoard = workBoard2.slice();
          workMessage = 'Roll (longer journey)';
        }
      }
      // Check for end of Game
      let workEndOfGame = false;
      if (newPosition1 >= filteredBoard.length) {
        workMessage = 'Game Complete';
        workOptMessage = 'Player 1 wins';
        workEndOfGame = true;
      }
      if (newPosition2 >= filteredBoard.length) {
        workMessage = 'Game Complete';
        workOptMessage = 'Player 2 wins';
        workEndOfGame = true;
      }
      return {
        roll: randomNumber,
        even: false,
        odd: false,
        position1: newPosition1,
        position2: newPosition2,
        message: workMessage,
        optMessage: workOptMessage,
        score: prevGameState.score + scoreAdj,
        board: workBoard,
        endOfGame: workEndOfGame,
        about: false,
        numberOfPlayers: prevGameState.numberOfPlayers,
        whoseTurn: workWhoseTurn,
      };
    });
  }, []);

  // render
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Button
          onPress={() => pressReset()}
          title="Reset"
          color="blue"
          disabled={numberOfPlayers === 0 ? true : false}
        />
        <View
          style={
            endOfGame || numberOfPlayers === 0
              ? styles.itemInvisible
              : even
              ? [styles.item, styles.markSpotRed]
              : [styles.item, styles.itemBlue]
          }
        >
          <TouchableHighlight onPress={() => pressEven()}>
            <Text style={styles.itemText}>Even</Text>
          </TouchableHighlight>
        </View>
        <View
          style={
            endOfGame || numberOfPlayers === 0
              ? styles.itemInvisible
              : odd
              ? [styles.item, styles.markSpotRed]
              : [styles.item, styles.itemBlue]
          }
        >
          <TouchableHighlight onPress={() => pressOdd()}>
            <Text style={styles.itemText}>Odd</Text>
          </TouchableHighlight>
        </View>
        <View style={endOfGame || numberOfPlayers === 0 ? styles.itemInvisible : null}>
          <Button
            onPress={() => pressRoll()}
            title="Roll"
            color="blue"
            disabled={endOfGame || numberOfPlayers === 0 ? true : false}
          />
        </View>
        <View style={endOfGame || numberOfPlayers === 0 ? styles.itemInvisible : styles.itemNav}>
          <Text style={styles.itemText}>{roll}</Text>
        </View>
        <View style={numberOfPlayers === 1 ? styles.itemNav : styles.itemInvisible}>
          <Text style={styles.itemText}>Score</Text>
        </View>
        <View style={numberOfPlayers === 1 ? styles.itemNav : styles.itemInvisible}>
          <Text style={styles.itemText}>{score}</Text>
        </View>
      </View>
      <View style={styles.message}>
        <View style={styles.messageRow}>
          <Text style={styles.message}>{message}</Text>
          <View style={numberOfPlayers !== 0 ? styles.itemInvisible : styles.messageRow}>
            <TouchableHighlight onPress={() => pressPlayers1()}>
              <Text style={styles.messageRow2}>Select</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.messageRow}>
          <Text style={styles.message}>{optMessage}</Text>
          <View style={numberOfPlayers !== 0 ? styles.itemInvisible : styles.messageRow}>
            <TouchableHighlight onPress={() => pressPlayers2()}>
              <Text style={styles.messageRow2}>Select</Text>
            </TouchableHighlight>
          </View>
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
  messageRow: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageRow2: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'yellow',
  },
  board: {
    flex: 7,
    fontSize: 10,
    fontWeight: 'bold',
    marginVertical: 1,
  },
  markSpot: {
    backgroundColor: 'white',
    borderWidth: 1,
  },
  markSpotRed: {
    backgroundColor: 'red',
  },
});
