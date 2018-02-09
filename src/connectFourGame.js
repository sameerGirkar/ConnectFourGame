class GRID {
  constructor(row = 6, col = 7, winningCount = 4, player1 = 'p1', player2 = 'p2'){
    this.rowCount = row;
    this.colCount = col;
    this.player1 = player1;
    this.player2 = player2;
    this.MatchCount = winningCount;
    this.gameGrid = this.InitGrid(this.rowCount, this.colCount);
  }

  /**
   * @param {number} row - this is rowCount value.
   * @param {number} col - this is colCount value.
   * @return {array} two dimentional arry with rowCount & colCount.
   */
  InitGrid(row, col) {
    let gameGrid = [];
    for(let i = 0 ; i < row; i++ ) {
      gameGrid.push(new Array(col).fill('X'));
    }
    return gameGrid;
  }

  /**
   * @param {number} col - user selected column to drop boll.
   * @return {number} avaiblabe row number or -1.
   */
  FindAvailableSpace(col) {
    for (let row = this.rowCount - 1; row > -1; row--) {  
      if(this.gameGrid[row][col] === 'X') {
        return row;
      }
    }
    return -1;
  }

  /**
   * @param {array} list - list which represents matrix row, col or diagonal.
   * @param {string} player - player name.
   * @return {boolean} is geven player has minimum match count.
   */
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

  /**
   * @param {number} row - row number in which ball is drop.
   * @param {number} col - column number in which ball is drop.
   * @return {array} list with part of row in which consecutive matches possible.
   */
  GetRow(row, col) {
    let startIndex = ((col - (this.MatchCount - 1)) <= 0) ? 0 : (col - (this.MatchCount - 1)),
      lastIndex = ((col + (this.MatchCount - 1)) < this.colCount) ? (col + (this.MatchCount - 1)) : this.colCount;
    
    return this.gameGrid[row].slice(startIndex, (lastIndex + 1));
  }

  /**
   * @param {number} row - row number in which ball is drop.
   * @param {number} col - column number in which ball is drop.
   * @return {array} list with part of column in which consecutive matches possible.
   */
  GetColumn(row, col) {
    let startIndex = ((row - (this.MatchCount - 1)) > -1) ? (row - (this.MatchCount - 1)) : 0,
      lastIndex = ((row + (this.MatchCount - 1)) < this.rowCount) ? (row + (this.MatchCount - 1)) : this.rowCount -1;
    
    let column = [];
    for (let i = startIndex; i <= lastIndex; i++) {
      column.push(this.gameGrid[i][col]);
    }
    return column;
  }

  /**
   * @param {number} row - row number in which ball is drop.
   * @param {number} col - column number in which ball is drop.
   * @return {array} list with part of left-top to right-bottom diagonal in which consecutive matches possible.
   */
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
    return list;
  }

  /**
   * @@param {number} row - row number in which ball is drop.
   * @param {number} col - column number in which ball is drop.
   * @return {array} list with part of righ-top to left-bottom diagonal in which consecutive matches possible.
   */
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
    return list;
  }

 /**
   * @@param {number} row - row number in which ball is drop.
   * @param {number} col - column number in which ball is drop.
   * @param {string} player - player name.
   * @return {boolean} is given user has horizontal match.
   */
  CheckHorizontal(row, col, player) {
    let list = this.GetRow(row, col);
    return this.CheckMatch(list, player);
  }

 /**
   * @@param {number} row - row number in which ball is drop.
   * @param {number} col - column number in which ball is drop.
   * @param {string} player - player name.
   * @return {boolean} is given user has vertical match.
   */
  CheckVertical(row, col, player) {
    return this.CheckMatch(this.GetColumn(row, col), player)
  }

 /**
   * @@param {number} row - row number in which ball is drop.
   * @param {number} col - column number in which ball is drop.
   * @param {string} player - player name.
   * @return {boolean} is given user has diagonal match.
   */
  CheckDiagonal(row, col, player) {
    return this.CheckMatch(this.GetLeftToRightDiagonal(row, col), player) || this.CheckMatch(this.GetRightToLeftDiagonal(row, col), player);
  }

   /**
   * @param {number} row - row number in which ball is drop.
   * @param {number} col - column number in which ball is drop.
   * @param {string} player - player name.
   * @return {boolean} is given player won.
   */
  IsPlayerWon(row, col, player) {
    return this.CheckHorizontal(row, col, player) || this.CheckVertical(row, col, player) || this.CheckDiagonal(row, col, player);
  }

   /**
   * @param {number} col - column number in which ball is drop.
   * @param {string} player - player name.
   * @returns {object} object with attribute use last selected row and game status.
   */
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