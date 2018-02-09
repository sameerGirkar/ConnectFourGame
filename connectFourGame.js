class GRID {
  constructor(row = 6, col = 7, winningCount = 4, player1 = 'p1', player2 = 'p2'){
    this.rowCount = row;
    this.colCount = col;
    this.player1 = player1;
    this.player2 = player2;
    this.MatchCount = winningCount;
    this.gameGrid = this.InitGrid(this.rowCount, this.colCount);
  }

  InitGrid(row, col) {
    let gameGrid = [];
    for(let i = 0 ; i < row; i++ ) {
      gameGrid.push(new Array(col).fill('X'));
    }
    return gameGrid;
  }

  FindAvailableSpace(col) {
    for (let row = this.rowCount - 1; row > -1; row--) {  
      if(this.gameGrid[row][col] === 'X') {
        return row;
      }
    }
    return -1;
  }

  CheckMatch(list, player) {
    let count = 0;
    for(let index = 0; index < list.length; index++){
      if(list[index] === player) {
        count++;
        if(this.MatchCount === count) {
          break;
        }
      } else {
        count = 0;
      }
    }
    return !!(this.MatchCount === count);
  }

  GetRow(row, col) {
    let startIndex = ((col - (this.MatchCount - 1)) <= 0) ? 0 : (col - (this.MatchCount - 1)),
      lastIndex = ((col + (this.MatchCount - 1)) < this.colCount) ? (col + (this.MatchCount - 1)) : this.colCount;
    
    console.log('getRow  ', this.gameGrid[row].slice(startIndex, (lastIndex + 1)));
    return this.gameGrid[row].slice(startIndex, (lastIndex + 1));
  }

  GetColumn(row, col) {
    let startIndex = ((row - (this.MatchCount - 1)) > -1) ? (row - (this.MatchCount - 1)) : 0,
      lastIndex = ((row + (this.MatchCount - 1)) < this.rowCount) ? (row + (this.MatchCount - 1)) : this.rowCount -1;
    
    let column = [];
    for (let i = startIndex; i <= lastIndex; i++) {
      column.push(this.gameGrid[i][col]);
    }
    return column;
  }

  GetLeftToRightDiagonal(row, col) {
    let list = [],
      stepLength = (this.MatchCount - 1),
      maxRowValue = (row),
      startRowIndex = ((row - stepLength) > Math.abs(row - col)) ? (row - stepLength) : Math.abs(row - col),
      startColIndex = col - (row - startRowIndex),
      endRowIndex = ((row + stepLength) < this.rowCount) ? (row + stepLength) : this.rowCount -1;
    
    for (let i = startRowIndex, j = startColIndex; i <= endRowIndex; i++){
      list.push(this.gameGrid[i][j]);
      j++;
    }
    console.log('GetLeftToRightDiagonal --- startRowIndex=', startRowIndex, '/startColIndex=', startColIndex, '/endRowIndex=', endRowIndex,'/list=',list);
    // console.log('GetLeftToRightDiagonal', list, startRowIndex, startColIndex, endRowIndex);
    return list;
  }

  GetRightToLeftDiagonal(row, col) {
    let list = [],
      stepLength = (this.MatchCount - 1),
      startRowIndex = ((row - stepLength) > Math.abs(row - col)) ? (row - stepLength) : Math.abs(row- col),
      startColIndex = col + (row - startRowIndex),
      endRowIndex = ((row + stepLength) < this.rowCount) ? (row + stepLength) : this.rowCount-1;
    
    for (let i = startRowIndex, j = startColIndex; i <= endRowIndex; i++) {
      list.push(this.gameGrid[i][j]);
      j--;
    }
    console.log('GetRightToLeftDiagonal ---- startRowIndex=', startRowIndex, '/startColIndex=', startColIndex, '/endRowIndex=', endRowIndex, '/list=', list);
    return list;
  }


  CheckHorizontal(row, col, player) {
    let list = this.GetRow(row, col);
    return this.CheckMatch(list, player);
  }

  CheckVertical(row, col, player) {
    return this.CheckMatch(this.GetColumn(row, col), player)
  }

  CheckDiagonal(row, col, player) {
    return this.CheckMatch(this.GetLeftToRightDiagonal(row, col), player) || this.CheckMatch(this.GetRightToLeftDiagonal(row, col), player);
  }

  IsPlayerWon(row, col, player) {
    return this.CheckHorizontal(row, col, player) || this.CheckVertical(row, col, player) || this.CheckDiagonal(row, col, player);
  }

  DropEventHandler(col, player) {
    let row = this.FindAvailableSpace(col);
    if(row === -1){
      console.log('Place not available');
      return {
        row: -1,
        status: 'block'
      };
    } else {
      this.gameGrid[row][col] = player;
      if(this.IsPlayerWon(row, col, player)) {
        console.log(`${player} WON !!!!`);
        return {
          row: row,
          status: 'WON'
        };
      } else {
        console.log('Please play next move.');
        return {
          row: row,
          status: 'continue'
        };
      }
    }
  }
}