$(document).ready(function () {
  var grid = new GRID(6, 7, 4,'player1', 'player2'),
  activePlayer = 'player1',
  PLAYER1_COLOR = 'red',
  PLAYER2_COLOR = 'greenyellow';
  $(`.input-slots .cell`).addClass(activePlayer);

  function DropColumnSelectedEvenHandler(com) {
    var a = $(this), 
      col = parseInt(a.attr('data-col')),
      selectedCell = null;
    var result = grid.DropEventHandler(col, activePlayer);
    
    if (result.status === 'block') {
      alert('Please select another column.');
    } else {
      $(`.input-slots .cell`).removeClass(activePlayer);
      selectedCell = $(`.container [data-row=${result.row}] [data-col=${col}]`);
      (activePlayer === 'player1') ? selectedCell.css('background-color', PLAYER1_COLOR) : selectedCell.css('background-color', PLAYER2_COLOR);
      if (result.status === 'WON') {
        setTimeout(() => alert(`${activePlayer} won the game.`), 100);
      } else {
        (activePlayer === 'player1') ? (activePlayer = 'player2') : (activePlayer = 'player1');
        $('.input-slots .row .cell').addClass(activePlayer);
      }
    }
  }

  $(".input-slots .cell").on('click', DropColumnSelectedEvenHandler);

});