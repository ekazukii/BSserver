var io = require('socket.io')(3765);
var player1, player2;
var selectGrid1 = [
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
];
var selectGrid2 = [
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
];

var boats1 = {
  porteAvion : {type : 4, pos : []},
  croiseur : {type : 3, pos : []},
  contreTorpilleur : {type : 2, pos : []},
  sousMarin : {type : 2, pos : []},
  torpilleur : {type : 1, pos : []}
}
var boats2 = {
  porteAvion : {type : 4, pos : []},
  croiseur : {type : 3, pos : []},
  contreTorpilleur : {type : 2, pos : []},
  sousMarin : {type : 2, pos : []},
  torpilleur : {type : 1, pos : []}
}

var boatState1 = 0;
var boatState2 = 0;

var state = 0;

io.on('connection', function (socket) {
  if (typeof player1 === 'undefined') {
    socket.player = 1;
    player1 = socket;
    socket.emit('connection', 'ok');
    socket.emit('player', '1');
    socket.emit('state', 0)
    console.log('player1');

    socket.on('click', function(id) {
      console.log('click')
      var gridPos = idToGrid(id);
      if (selectGrid1[gridPos.row][gridPos.col] === 'empty') {
        console.log(boatState1)
        switch (boatState1) {
          case 1:
            if (typeof boats1.porteAvion.pos[boats1.porteAvion.type] === 'undefined') {
              if (isAlign(gridPos, boats1.porteAvion)) {
                player1.emit('addBoat', id)
                selectGrid1[gridPos.row][gridPos.col] = 'porteAvion';
                boats1.porteAvion.pos.push(gridPos);
                if (typeof boats1.porteAvion.pos[boats1.porteAvion.type] !== 'undefined') {
                  boatState1++
                  player1.emit('state', boatState1);
                }
              }
            }
            break;
          case 2:
            if (typeof boats1.croiseur.pos[boats1.croiseur.type] === 'undefined') {
              if (isAlign(gridPos, boats1.croiseur)) {
                player1.emit('addBoat', id)
                selectGrid1[gridPos.row][gridPos.col] = 'croiseur';
                boats1.croiseur.pos.push(gridPos);
                if (typeof boats1.croiseur.pos[boats1.croiseur.type] !== 'undefined') {
                  boatState1++
                  player1.emit('state', boatState1);
                }
              }
            }
            break;
          case 3:
            if (typeof boats1.contreTorpilleur.pos[boats1.contreTorpilleur.type] === 'undefined') {
              if (isAlign(gridPos, boats1.contreTorpilleur)) {
                player1.emit('addBoat', id)
                selectGrid1[gridPos.row][gridPos.col] = 'contreTorpilleur';
                boats1.contreTorpilleur.pos.push(gridPos);
                if (typeof boats1.contreTorpilleur.pos[boats1.contreTorpilleur.type] !== 'undefined') {
                  boatState1++
                  player1.emit('state', boatState1);
                }
              }
            }
            break;
          case 4:
            if (typeof boats1.sousMarin.pos[boats1.sousMarin.type] === 'undefined') {
              if (isAlign(gridPos, boats1.sousMarin)) {
                player1.emit('addBoat', id)
                selectGrid1[gridPos.row][gridPos.col] = 'sousMarin';
                boats1.sousMarin.pos.push(gridPos);
                if (typeof boats1.sousMarin.pos[boats1.sousMarin.type] !== 'undefined') {
                  boatState1++
                  player1.emit('state', boatState1);
                }
              }
            }
            break;
          case 5:
            if (typeof boats1.torpilleur.pos[boats1.torpilleur.type] === 'undefined') {
              if (isAlign(gridPos, boats1.torpilleur)) {
                player1.emit('addBoat', id)
                selectGrid1[gridPos.row][gridPos.col] = 'torpilleur';
                boats1.torpilleur.pos.push(gridPos);
                if (typeof boats1.torpilleur.pos[boats1.torpilleur.type] !== 'undefined') {
                  boatState1++
                  player1.emit('state', boatState1);
                }
              }
            }
            break;
        }
      }
    });

  } else if (typeof player2 === 'undefined'){
    socket.player = 2
    player2 = socket;
    socket.emit('connection', 'ok');
    socket.emit('player', '2');
    io.emit('state', 1)
    boatState1 = 1, boatState2 = 1;
    console.log('player2');

    socket.on('click', function(id) {
      console.log('click')
      var gridPos = idToGrid(id);
      if (selectGrid2[gridPos.row][gridPos.col] === 'empty') {
        console.log(boatState2)
        switch (boatState2) {
          case 1:
            if (typeof boats2.porteAvion.pos[boats2.porteAvion.type] === 'undefined') {
              if (isAlign(gridPos, boats2.porteAvion)) {
                player2.emit('addBoat', id)
                selectGrid2[gridPos.row][gridPos.col] = 'porteAvion';
                boats2.porteAvion.pos.push(gridPos);
                if (typeof boats2.porteAvion.pos[boats2.porteAvion.type] !== 'undefined') {
                  boatState2++
                  player2.emit('state', boatState2);
                }
              }
            }
            break;
          case 2:
            if (typeof boats2.croiseur.pos[boats2.croiseur.type] === 'undefined') {
              if (isAlign(gridPos, boats2.croiseur)) {
                player2.emit('addBoat', id)
                selectGrid2[gridPos.row][gridPos.col] = 'croiseur';
                boats2.croiseur.pos.push(gridPos);
                if (typeof boats2.croiseur.pos[boats2.croiseur.type] !== 'undefined') {
                  boatState2++
                  player2.emit('state', boatState2);
                }
              }
            }
            break;
          case 3:
            if (typeof boats2.contreTorpilleur.pos[boats2.contreTorpilleur.type] === 'undefined') {
              if (isAlign(gridPos, boats2.contreTorpilleur)) {
                player2.emit('addBoat', id)
                selectGrid2[gridPos.row][gridPos.col] = 'contreTorpilleur';
                boats2.contreTorpilleur.pos.push(gridPos);
                if (typeof boats2.contreTorpilleur.pos[boats2.contreTorpilleur.type] !== 'undefined') {
                  boatState2++
                  player2.emit('boatState2', boatState2);
                }
              }
            }
            break;
          case 4:
            if (typeof boats2.sousMarin.pos[boats2.sousMarin.type] === 'undefined') {
              if (isAlign(gridPos, boats2.sousMarin)) {
                player2.emit('addBoat', id)
                selectGrid2[gridPos.row][gridPos.col] = 'sousMarin';
                boats2.sousMarin.pos.push(gridPos);
                if (typeof boats2.sousMarin.pos[boats2.sousMarin.type] !== 'undefined') {
                  boatState2++
                  player2.emit('state', boatState2);
                }
              }
            }
            break;
          case 5:
            if (typeof boats2.torpilleur.pos[boats2.torpilleur.type] === 'undefined') {
              if (isAlign(gridPos, boats2.torpilleur)) {
                player2.emit('addBoat', id)
                selectGrid2[gridPos.row][gridPos.col] = 'torpilleur';
                boats2.torpilleur.pos.push(gridPos);
                if (typeof boats2.torpilleur.pos[boats2.torpilleur.type] !== 'undefined') {
                  boatState2++
                  player2.emit('state', boatState2);
                }
              }
            }
            break;
        }
      }
    });

  } else {
    socket.emit('connection', 'fail');
  }

  socket.on('disconnect', function () {
    io.emit('user disconnected');
    if (typeof socket.player !== 'undefined') {

      if (socket.player === 1) {
        if (typeof player2 !== 'undefined'){
          console.log('switch')
          player2.player = 1;
          player1 = player2;
          player2 = undefined;
        } else {
          player1 = undefined;
        }
      }
    }
  });
});

function idToGrid(id) {
  splited = id.split('-');
  row = splited[0];
  col = splited[1];
  var colGrid = col-1;
  var rowGrid;
  switch (row) {
    case 'A':
      rowGrid = 0;
      break;

    case 'B':
      rowGrid = 1;
      break;

    case 'C':
      rowGrid = 2;
      break;

    case 'D':
      rowGrid = 3;
      break;

    case 'E':
      rowGrid = 4;
      break;

    case 'F':
      rowGrid = 5;
      break;

    case 'G':
      rowGrid = 6;
      break;

    case 'H':
      rowGrid = 7;
      break;

    case 'I':
      rowGrid = 8;
      break;

    case 'J':
      rowGrid = 9;
      break;

  }

  return {col : colGrid, row : rowGrid};
}

function isAlign(gridPos, boat) {
  var type = boat.type;
  if (typeof boat.pos[type] === 'undefined') {
    if (typeof boat.pos[0] === 'undefined') {
      //console.log('pos0')
      return true;
    } else if (typeof boat.pos[1] == 'undefined') {
      if ((gridPos.row === boat.pos[0].row && gridPos.col === (boat.pos[0].col + 1)) ^
          (gridPos.row === boat.pos[0].row && gridPos.col === (boat.pos[0].col - 1)) ^
          (gridPos.col === boat.pos[0].col && gridPos.row === (boat.pos[0].row + 1)) ^
          (gridPos.col === boat.pos[0].col && gridPos.row === (boat.pos[0].row - 1)))
      {
        //console.log(gridPos.row === boat.pos[0].row && gridPos.col === (boat.pos[0].col + 1))
        //console.log(gridPos.row === boat.pos[0].row && gridPos.col === (boat.pos[0].col - 1))
        //console.log('near')
        return true;
      }
    } else if (type > 1) {
      if (typeof boat.pos[2] == 'undefined') {
        //console.log('pos2')
        if (boat.pos[0].row === boat.pos[1].row && boat.pos[0].row === gridPos.row)  {
          //console.log('meme row')
          if ((boat.pos[0].col === (gridPos.col + 1) || boat.pos[1].col === (gridPos.col - 1)) ^
              (boat.pos[0].col === (gridPos.col - 1) || boat.pos[1].col === (gridPos.col + 1)) ) {
            //console.log('true')
            return true;
          }
        } else if (boat.pos[0].col === boat.pos[1].col && boat.pos[0].col === gridPos.col) {
          if ((boat.pos[0].row === (gridPos.row + 1) || boat.pos[1].row === (gridPos.row - 1)) ^
              (boat.pos[0].row === (gridPos.row - 1) || boat.pos[1].row === (gridPos.row + 1)) ) {
            //console.log('true')
            return true;
          }
        }
      } else if (type > 2) {
        if (typeof boat.pos[3] == 'undefined') {
          if (boat.pos[0].row === boat.pos[1].row && boat.pos[0].row === gridPos.row)  {
            //console.log('meme row')
            if ((boat.pos[0].col === (gridPos.col + 1) || boat.pos[2].col === (gridPos.col - 1) || boat.pos[1].col === (gridPos.col + 1)) ^
                (boat.pos[0].col === (gridPos.col - 1) || boat.pos[2].col === (gridPos.col + 1) || boat.pos[1].col === (gridPos.col - 1)) ) {
              return true;
            }
          } else if (boat.pos[0].col === boat.pos[1].col && boat.pos[0].col === gridPos.col) {
            if ((boat.pos[0].row === (gridPos.row + 1) || boat.pos[2].row === (gridPos.row - 1) || boat.pos[1].row === (gridPos.row - 1)) ^
                (boat.pos[0].row === (gridPos.row - 1) || boat.pos[2].row === (gridPos.row + 1) || boat.pos[1].row === (gridPos.row + 1)) ) {
              return true;
            }
          }
        } else if (type > 3) {
          if (typeof boat.pos[4] == 'undefined') {
            if (boat.pos[0].row === boat.pos[1].row && boat.pos[0].row === gridPos.row)  {
              //console.log('meme row')
              if ((boat.pos[0].col === (gridPos.col + 1) || boat.pos[2].col === (gridPos.col - 1) || boat.pos[1].col === (gridPos.col + 1) || boat.pos[3].col === (gridPos.col + 1)) ^
                  (boat.pos[0].col === (gridPos.col - 1) || boat.pos[2].col === (gridPos.col + 1) || boat.pos[1].col === (gridPos.col - 1) || boat.pos[3].col === (gridPos.col - 1)) ) {
                //console.log('true')
                return true;
              }
            } else if (boat.pos[0].col === boat.pos[1].col && boat.pos[0].col === gridPos.col) {
              if ((boat.pos[0].row === (gridPos.row + 1) || boat.pos[2].row === (gridPos.row - 1) || boat.pos[1].row === (gridPos.row - 1) || boat.pos[3].row === (gridPos.row - 1)) ^
                  (boat.pos[0].row === (gridPos.row - 1) || boat.pos[2].row === (gridPos.row + 1) || boat.pos[1].row === (gridPos.row + 1) || boat.pos[3].row === (gridPos.row + 1)) ) {
                //console.log('true')
                return true;
              }
            }
          }
        }
      }
    }
  }
  return false;
}

function resetGame() {
  selectGrid1 = [
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ];
  selectGrid2 = [
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ];

  boats1 = {
    porteAvion : {type : 4, pos : []},
    croiseur : {type : 3, pos : []},
    contreTorpilleur : {type : 2, pos : []},
    sousMarin : {type : 2, pos : []},
    torpilleur : {type : 1, pos : []}
  }

  boats2 = {
    porteAvion : {type : 4, pos : []},
    croiseur : {type : 3, pos : []},
    contreTorpilleur : {type : 2, pos : []},
    sousMarin : {type : 2, pos : []},
    torpilleur : {type : 1, pos : []}
  }

  boatState1 = 0;
  boatState2 = 0;

  state = 0;
}
