import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableHighlight,
  Button,
  Image,
} from 'react-native';
import { newBoard } from './newboard.js';

const numColumns = 7;
const newTurnTotals = [0, 0];

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
      turnTotals,
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
    turnTotals: JSON.parse(JSON.stringify(newTurnTotals)),
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
    } else if (
      position1 === item.boardNumber &&
      position2 === item.boardNumber &&
      (item.invisible === undefined || item.invisible === false)
    ) {
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
      let workMessage = 'Roll again';
      let workOptMessage = 'Player 1';
      let workAbout = prevGameState.about;
      let workTurnTotals = [1,0];
      let workWhoseTurn = 1;
      if (workNumberOfPlayers === 1 && prevGameState.position1 === 0) {
        workNumberOfPlayers = 0;
        workMessage = '1-player Game';
        workOptMessage = '2-player Game';
        workTurnTotals = [0,0];
        workWhoseTurn = 0;
        workAbout = true;
      }
      if (workNumberOfPlayers === 2 && prevGameState.position1 === 0 && prevGameState.position2 === 0) {
        workNumberOfPlayers = 0;
        workMessage = '1-player Game';
        workOptMessage = '2-player Game';
        workTurnTotals = [0,0];
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
        turnTotals: JSON.parse(JSON.stringify(workTurnTotals)),
      };
    });
  }, []);

  // pressed 1-Player button
  const pressPlayers1 = useCallback(() => {
    setGameState(prevGameState => {
      return {
        ...prevGameState,
        message: 'Roll again',
        optMessage: 'Player 1',
        about: false,
        numberOfPlayers: 1 ,
        whoseTurn: 1,
        turnTotals: [1,0],
      };
    });
  }, []);

  // pressed 2-Player button
  const pressPlayers2 = useCallback(() => {
    setGameState(prevGameState => {
      return {
        ...prevGameState,
        message: ' ',
        optMessage: 'Roll Player 1',
        about: false,
        numberOfPlayers: 2,
        whoseTurn: 1,
        turnTotals: [1,0],
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
        ...prevGameState,
        even: workEven,
        message: workMessage,
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
        ...prevGameState,
        odd: workOdd,
        message: workMessage,
      };
    });
  }, []);

  // Function 'calculateTurn' :calculate whose turn it is next, Player 1 or Player 2
  // - Parms: 
  //   workTurnTotals - (an array holding 2 integers which represent the cumulative actions of each player)
  //   P1 - an integer which is the Player 1 adjustment to the 1st entry in the workTurnTotals array
  //   P2 - an integer which is the Player 2 adjustment to the 2nd entry in the workTurnTotals array
  //     (P1/P2 represents using a turn, gaining a turn, losing a turn on the current roll)
  //   'Examples' of P1/P2 valid values:
  //    Player 1 rolls: -1/+1
  //    Player 2 rolls: +1/-1
  //    Player 1 gain a roll: +1/-1
  //    Player 2 lose a roll" +1/-1       
  //  - Returned value:
  //    workWhoseTurn - whose turn is it next (1 for Player 1, 2 for player 2). Derived by
  //                    determining which entry in the workTurnTotals is larger.
  //
  const calculateTurn = (workTurnTotals,P1,P2) => {
      let workWhoseTurn = 0; 
      workTurnTotals[0] = workTurnTotals[0] + P1;
      workTurnTotals[1] = workTurnTotals[1] + P2;
      if (workTurnTotals[0] > workTurnTotals[1]) {
        workWhoseTurn = 1;
      } else {
        workWhoseTurn = 2;
      };
      return workWhoseTurn;
    };

  // press Roll button
  const pressRoll = useCallback(() => {
    setGameState(prevGameState => {
      let workBoard = prevGameState.board.slice();
      let randomNumber = Math.floor(Math.random() * 6) + 1;
      let scoreAdj = 1;
      let workMessage = ' ';
      let workOptMessage = ' ';
      let workTurnTotals = prevGameState.turnTotals;
      let workWhoseTurn = prevGameState.whoseTurn;
      // Testing line - forec speciifc roll number
      //if (workWhoseTurn === 1) {
      //  randomNumber = 2;
      //} else {
      //  randomNumber = 4;
      //}
      if (workWhoseTurn === 1 && prevGameState.numberOfPlayers === 2) {
        // workWhoseTurn = 2;
        workWhoseTurn = calculateTurn(workTurnTotals,-1,1)
        if (workWhoseTurn === 1){
          workOptMessage = 'Roll Player 1';
        } else {
          workOptMessage = 'Roll Player 2';
        }
      } else {
        // workWhoseTurn = 1;
        workWhoseTurn = calculateTurn(workTurnTotals,1,-1)
        if (workWhoseTurn === 1){
          workOptMessage = 'Roll Player 1';
        } else {
          workOptMessage = 'Roll Player 2';
        }
      }
      // Results of Even/Odd Pressed
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
      if (prevGameState.whoseTurn === 1) {
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
      // Player 1
      if (prevGameState.whoseTurn === 1 && workBoard[newPositionBoard1].extraScore !== undefined) {
        scoreAdj = scoreAdj + workBoard[newPositionBoard1].extraScore;
        if (workBoard[newPositionBoard1].extraScore < 0) {
          if (prevGameState.whoseTurn === 1 && prevGameState.numberOfPlayers === 2) {
            workWhoseTurn = calculateTurn(workTurnTotals,1,-1);
            if (workMessage === 'Great...roll doubled') {
              workMessage = 'Roll Doubled (extra roll)';
            } else {
              workMessage = '(Player 1 extra roll)';
            }
            workOptMessage = 'Roll Player 1';
          } else if (prevGameState.whoseTurn === 2 && prevGameState.numberOfPlayers === 2) {
            workWhoseTurn = calculateTurn(workTurnTotals,-1,1);
            if (workMessage === 'Great...roll doubled') {
              workMessage = 'Roll Doubled (extra roll)';
            } else {
              workMessage = '(Player 2 extra roll)';
            }
            workOptMessage = 'Roll Player 2';
          } else {
            workWhoseTurn = calculateTurn(workTurnTotals,1,-1);
            if (workMessage === 'Great...roll doubled') {
              workMessage = 'Roll Doubled (extra roll)';
            } else {
              workMessage = '(extra roll)';
            }
            workOptMessage = 'Roll Player 1';
          }
        } else {
          if (prevGameState.whoseTurn === 1 && prevGameState.numberOfPlayers === 2) {
            workWhoseTurn = calculateTurn(workTurnTotals,-1,1);
            if (workMessage === 'Great...roll doubled') {
              workMessage = 'Roll Doubled (lose a roll)';
            } else {
              workMessage = '(Player 1 lose a roll)';
            }
            workOptMessage = 'Roll Player 2';
          } else if (prevGameState.whoseTurn === 2 && prevGameState.numberOfPlayers === 2) {
            workWhoseTurn = calculateTurn(workTurnTotals,1,-1);
            if (workMessage === 'Great...roll doubled') {
              workMessage = 'Roll Doubled (lose a roll)';
            } else {
              workMessage = '(Player 2 lose a roll)';
            }
            workOptMessage = 'Roll Player 1';
          } else {
            workWhoseTurn = calculateTurn(workTurnTotals,1,-1);
            if (workMessage === 'Great...roll doubled') {
              workMessage = 'Roll Doubled (lose a roll)';
            } else {
              workMessage = '(lose a roll)';
            }
            workOptMessage = 'Roll Player 1';
          }
        }
      }
      // Player 2
      if (prevGameState.whoseTurn === 2 && workBoard[newPositionBoard2].extraScore !== undefined) {
        scoreAdj = scoreAdj + workBoard[newPositionBoard2].extraScore;
        if (workBoard[newPositionBoard2].extraScore < 0) {
          if (prevGameState.whoseTurn === 1 && prevGameState.numberOfPlayers === 2) {
            workWhoseTurn = calculateTurn(workTurnTotals,1,-1);
            if (workMessage === 'Great...roll doubled') {
              workMessage = 'Roll Doubled (extra roll)';
            } else {
              workMessage = '(Player 1 extra roll)';
            }
            workOptMessage = 'Roll Player 1';
          } else if (prevGameState.whoseTurn === 2 && prevGameState.numberOfPlayers === 2) {
            workWhoseTurn = calculateTurn(workTurnTotals,-1,1);
            if (workMessage === 'Great...roll doubled') {
              workMessage = 'Roll Doubled (extra roll)';
            } else {
              workMessage = '(Player 2 extra roll)';
            }
            workOptMessage = 'Roll Player 2';
          } else {
            workWhoseTurn = calculateTurn(workTurnTotals,1,-1);
            if (workMessage === 'Great...roll doubled') {
              workMessage = 'Roll Doubled (extra roll)';
            } else {
              workMessage = '(extra roll)';
            }
            workOptMessage = 'Roll Player 1';
          }
        } else {
          if (prevGameState.whoseTurn === 1 && prevGameState.numberOfPlayers === 2) {
            workWhoseTurn = calculateTurn(workTurnTotals,-1,1);
            if (workMessage === 'Great...roll doubled') {
              workMessage = 'Roll Doubled (lose a roll)';
            } else {
              workMessage = '(Player 1 lose a roll)';
            }
            workOptMessage = 'Roll Player 2';
          } else if (prevGameState.whoseTurn === 2 && prevGameState.numberOfPlayers === 2) {
            workWhoseTurn = calculateTurn(workTurnTotals,1,-1);
            if (workMessage === 'Great...roll doubled') {
              workMessage = 'Roll Doubled (lose a roll)';
            } else {
              workMessage = '(Player 2 lose a roll)';
            }
            workOptMessage = 'Roll Player 1';
          } else {
            workWhoseTurn = calculateTurn(workTurnTotals,1,-1);
            if (workMessage === 'Great...roll doubled') {
              workMessage = 'Roll Doubled (lose a roll)';
            } else {
              workMessage = '(lose a roll)';
            }
            workOptMessage = 'Roll Player 1';
          }
        }
      }
      // Add the detour squares and remove a single square after detour
      // Player 1 landed on detour spot
      if (workBoard[newPositionBoard1].itemsToAdd !== undefined && prevGameState.whoseTurn === 1) {
        let workBoard2 = workBoard.slice();
        let detourPriorlyOpened = false;
        let i;
        for (i = 0; i < workBoard2.length; i++) {
          // Set detour squares to be visible
          if (workBoard2[i].addItem !== undefined) {
            if (
              workBoard2[newPositionBoard1].itemsToAdd === workBoard2[i].addItem &&
              workBoard2[i].invisible !== false
            ) {
              workBoard2[i].invisible = false;
              workBoard2[i].boardNumber = workBoard2[i].boardNumber + newPosition1;
            }
          }
          // Set square in middle of detour to be invisible
          if (workBoard2[i].deleteItem !== undefined) {
            if (workBoard2[newPositionBoard1].itemsToAdd === workBoard2[i].deleteItem) {
              if (workBoard2[i].invisible === true) {
                detourPriorlyOpened = true;
              } else {
                workMessage = '(longer journey)';
              }
              workBoard2[i].invisible = true;
            }
          }
        }
        // Increment all board squares beyond and possibly in this detour by 6
        for (i = 0; i < workBoard2.length; i++) {
          if (workBoard2[i].boardNumber !== undefined) {
            // Mark detour squares
            //  - boardnumber > newPosition
            //  - square must be visible
            //  - current detour not opended before
            //  - current detour NE detour being processed
            if (
              workBoard2[i].boardNumber > newPosition1 &&
              workBoard2[i].invisible !== true &&
              workBoard2[i].addItem !== undefined &&
              workBoard2[newPositionBoard1].itemsToAdd !== workBoard2[i].addItem &&
              detourPriorlyOpened === false
            ) {
              workBoard2[i].boardNumber = workBoard2[i].boardNumber + 6;
            }
          }
          // Mark non-detour squares
          //  - boardnumber > newPosition
          //  - square must be visible
          //  - detour not opended before
          if (workBoard2[i].boardNumber !== undefined) {
            if (
              workBoard2[i].boardNumber > newPosition1 &&
              workBoard2[i].invisible !== true &&
              workBoard2[i].addItem === undefined &&
              detourPriorlyOpened === false
            ) {
              workBoard2[i].boardNumber = workBoard2[i].boardNumber + 6;
            }
          }
        }
        // Adjust for situation where the other player is already past detour
        if (
          prevGameState.numberOfPlayers === 2 &&
          prevGameState.position2 > newPosition1 &&
          detourPriorlyOpened === false
        ) {
          newPosition2 = newPosition2 + 6;
        }
        workBoard = workBoard2.slice();
        // Player 2 landed on detour spot
      } else if (workBoard[newPositionBoard2].itemsToAdd !== undefined && prevGameState.whoseTurn === 2) {
        let workBoard2 = workBoard.slice();
        let detourPriorlyOpened = false;
        let i;
        for (i = 0; i < workBoard2.length; i++) {
          // Set detour squares to be visible
          if (workBoard2[i].addItem !== undefined) {
            if (
              workBoard2[newPositionBoard2].itemsToAdd === workBoard2[i].addItem &&
              workBoard2[i].invisible !== false
            ) {
              workBoard2[i].invisible = false;
              workBoard2[i].boardNumber = workBoard2[i].boardNumber + newPosition2;
            }
          }
          // Set square in middle of detour to be invisible
          if (workBoard2[i].deleteItem !== undefined) {
            if (workBoard2[newPositionBoard2].itemsToAdd === workBoard2[i].deleteItem) {
              if (workBoard2[i].invisible === true) {
                detourPriorlyOpened = true;
              } else {
                workMessage = '(longer journey)';
              }
              workBoard2[i].invisible = true;
            }
          }
        }
        // Increment all board squares beyond this detour by 6
        for (i = 0; i < workBoard2.length; i++) {
          if (workBoard2[i].boardNumber !== undefined) {
            // Mark detour squares
             //  - boardnumber > newPosition
            //  - square must be visible
            //  - current detour not opended before
            //  - current detour NE detour being processed
            if (
              workBoard2[i].boardNumber > newPosition2 &&
              workBoard2[i].invisible !== true &&
              workBoard2[i].addItem !== undefined &&
              workBoard2[newPositionBoard2].itemsToAdd !== workBoard2[i].addItem &&
              detourPriorlyOpened === false
            ) {
              workBoard2[i].boardNumber = workBoard2[i].boardNumber + 6;
            }
          }
          // Mark non-detour squares
          //  - boardnumber > newPosition
          //  - square must be visible
          //  - detour not opended before
          if (workBoard2[i].boardNumber !== undefined) {
            if (
              workBoard2[i].boardNumber > newPosition2 &&
              workBoard2[i].invisible !== true &&
              workBoard2[i].addItem === undefined &&
              detourPriorlyOpened === false
            ) {
              workBoard2[i].boardNumber = workBoard2[i].boardNumber + 6;
            }
          }
        }
        // Adjust for situation where the other player is already past detour
        if (
          prevGameState.numberOfPlayers === 2 &&
          prevGameState.position1 > newPosition2 &&
          detourPriorlyOpened === false
        ) {
          newPosition1 = newPosition1 + 6;
        }
        workBoard = workBoard2.slice();
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
        turnTotals: workTurnTotals,
      };
    });
  }, []);

  // render
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Button
          onPress={pressReset}
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
          <TouchableHighlight onPress={pressEven}>
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
          <TouchableHighlight onPress={pressOdd}>
            <Text style={styles.itemText}>Odd</Text>
          </TouchableHighlight>
        </View>
        <View style={endOfGame || numberOfPlayers === 0 ? styles.itemInvisible : null}>
          <Button
            onPress={pressRoll}
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
            <TouchableHighlight onPress={pressPlayers1}>
              <Text style={styles.messageRow2}>Select</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.messageRow}>
          <Text style={styles.message}>{optMessage}</Text>
          <View style={numberOfPlayers !== 0 ? styles.itemInvisible : styles.messageRow}>
            <TouchableHighlight onPress={pressPlayers2}>
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
    marginTop: 55,
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
    fontWeight: 'bold',
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
