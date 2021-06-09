// roll dice (roll button)
  const pressRoll = useCallback(() => {
    setGameState(prevGameState => {
      let workBoard = prevGameState.board.slice();
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      const newPosition = Math.min(prevGameState.position + randomNumber, workBoard.length - 1);
      let scoreAdj = 1;
      let workMessage = 'Roll again';
      let workOptMessage = 'Kim';
      // Need to adjust score if 'miss a turn' or 'gain a turn' was landed on
      if (workBoard[newPosition].extraScore !== undefined) {
        scoreAdj = scoreAdj + workBoard[newPosition].extraScore;
        if (workBoard[newPosition].extraScore < 0) {
          workOptMessage = 'Wonderful....you get an extra roll';
        } else {
          workOptMessage = 'Sorry....you lose a roll';
        }
      }
      // Add the detour squares and remove a single square after detour
      if (workBoard[newPosition].itemsToAdd !== undefined) {
        let workBoard2 = workBoard.slice()
        let i;
        for (i=0; i < workboard2.length; i++) {
          if (workBoard2[i].itemsToAdd !== undefined) {
            if (workBoard2[newPosition].itemsToAdd === workBoard2[i].addItem) {
              workBoard2[i].invisible = false;
              workBoard2[i].boardNumber = workBoard2[i].boardNumber + newPosition;
            }
          }
          if (workBoard2[i].deleteItem !== undefined) {
            if (workBoard2[newPosition].itemsToAdd === workBoard2[i].deleteItem) {
              workBoard2[i].invisible = true;
            }
          }
          if (workBoard2[i].boardNumber !== undefined) {
            if (workBoard2[i].boardNumber > newPosition && workBoard2[i].invisible === false) {
              workBoard2[i].boardNumber = workBoard2[i].boardNumber + 7;
            }
          }
        }
        workBoard = workBoard2.slice();
        workOptMessage = 'You have a longer journey';
      }
      // Check for end of Game
      // First check what is current length of board
      let filteredBoard = workBoard.filter(function (currentElement) {
        return currentElement.boardNumber !== undefined && currentElement.invisible === false;
      });
      if (newPosition >= filteredBoard.length - 1) {
        workMessage = 'Game Complete';
        workOptMessage = 'Kim';
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

  let isGameComplete = position <= board.length - 2;