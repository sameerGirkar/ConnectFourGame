describe("ConnectFourGame", function () {
  var grid;
  describe("constructor function test suit,", function() {
    beforeEach(function () {
    });

    it("should be able to Create empty grid with 7 column and 6 row", function () {
      grid = new GRID();
      var colCount = grid.gameGrid[0].length,
        rowCount = grid.gameGrid.length;
      expect(colCount).toBe(7);
      expect(rowCount).toBe(6);
    });

    it("should be able to Create grid with given Player name", function () {
      grid = new GRID(6,7, 4, 'player1', 'player2');
      var colCount = grid.gameGrid[0].length,
        rowCount = grid.gameGrid.length;
      expect(grid.player1).toBe('player1');
      expect(grid.player2).toBe('player2');
    });

  });

  describe("FindAvailableSpace function test suit,", function () {
    it("should find available spot for player1", function(){
      grid = new GRID();
      var availableSpot = grid.FindAvailableSpace(0,'p1');
      grid.gameGrid[availableSpot][0] = 'p1';
      expect(availableSpot).toBe(5);

      grid.gameGrid[4][0] = 'p2';
      availableSpot = grid.FindAvailableSpace(0, 'p1');
      expect(availableSpot).toBe(3);
    });
  });

  describe("CheckMatch function test suit,", function () {
    it("should find minimun match required to win given player,", function () {
      grid = new GRID();
      var isWon = grid.CheckMatch(["X", "X", "X", "X","p1"], 'p1');
      expect(isWon).toBe(false);

      isWon = grid.CheckMatch(["X", "X", "p1", "X", "p1"], 'p1');
      expect(isWon).toBe(false);

      isWon = grid.CheckMatch(["X", "p1", "p1", "p1", "p1"], 'p1');
      expect(isWon).toBe(true);
    });
  });

});
