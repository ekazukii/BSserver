module.exports = function(end, port) {
  var io = require("socket.io")(port);
  const TOUR = 7;
  const TOURADV = 8;
  var player1, player2;
  var grid1 = [
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
  ];
  var grid2 = [
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
  ];

  var id1 = -1;
  var id2 = -1;

  var boats1 = {
    porteAvion : {type : 4, pos : []},
    croiseur : {type : 3, pos : []},
    contreTorpilleur : {type : 2, pos : []},
    sousMarin : {type : 2, pos : []},
    torpilleur : {type : 1, pos : []}
  };
  var boats2 = {
    porteAvion : {type : 4, pos : []},
    croiseur : {type : 3, pos : []},
    contreTorpilleur : {type : 2, pos : []},
    sousMarin : {type : 2, pos : []},
    torpilleur : {type : 1, pos : []}
  };

  var listBoatsId1 = [];
  var listBoatsId2 = [];

  var boatState1 = 0;
  var boatState2 = 0;

  var state = 0;

  io.on("connection", function (socket) {
    var cookie = socket.handshake.headers.cookie;
    var splited = cookie.split(';');
    var obj = {}
    for (var i = 0; i < splited.length; i++) {
      var keyValue = splited[i].split('=');
      obj[keyValue[0].replace(' ','')] = keyValue[1].replace(' ','');
    }

    console.log("connect");
    if (typeof player1 === "undefined") {

      socket.player = 1;
      player1 = socket;
      socket.emit("connection", "ok");
      socket.emit("player", "1");
      socket.emit("state", 0);
      console.log("player1 connected");

      var rawId = obj.valjeux.split('.')[0]
      var id = rawId.replace('s%3A', '')
      id1 = id;
      socket.id = id;
      player1.id = id;

      console.log(id)

      socket.on("click", function(id) {
        var gridPos = idToGrid(id);
        if (grid1[gridPos.row][gridPos.col] === "empty") {
          switch (boatState1) {
            case 1:
              if (typeof boats1.porteAvion.pos[boats1.porteAvion.type] === "undefined") {
                if (isAlign(gridPos, boats1.porteAvion)) {
                  player1.emit("addBoat", id);
                  listBoatsId1.push(id);
                  grid1[gridPos.row][gridPos.col] = "porteAvion";
                  boats1.porteAvion.pos.push(gridPos);
                  if (typeof boats1.porteAvion.pos[boats1.porteAvion.type] !== "undefined") {
                    boatState1++;
                    player1.emit("state", boatState1);
                  }
                }
              }
              break;
            case 2:
              if (typeof boats1.croiseur.pos[boats1.croiseur.type] === "undefined") {
                if (isAlign(gridPos, boats1.croiseur)) {
                  player1.emit("addBoat", id);
                  listBoatsId1.push(id);
                  grid1[gridPos.row][gridPos.col] = "croiseur";
                  boats1.croiseur.pos.push(gridPos);
                  if (typeof boats1.croiseur.pos[boats1.croiseur.type] !== "undefined") {
                    boatState1++;
                    player1.emit("state", boatState1);
                  }
                }
              }
              break;
            case 3:
              if (typeof boats1.contreTorpilleur.pos[boats1.contreTorpilleur.type] === "undefined") {
                if (isAlign(gridPos, boats1.contreTorpilleur)) {
                  player1.emit("addBoat", id);
                  listBoatsId1.push(id);
                  grid1[gridPos.row][gridPos.col] = "contreTorpilleur";
                  boats1.contreTorpilleur.pos.push(gridPos);
                  if (typeof boats1.contreTorpilleur.pos[boats1.contreTorpilleur.type] !== "undefined") {
                    boatState1++;
                    player1.emit("state", boatState1);
                  }
                }
              }
              break;
            case 4:
              if (typeof boats1.sousMarin.pos[boats1.sousMarin.type] === "undefined") {
                if (isAlign(gridPos, boats1.sousMarin)) {
                  player1.emit("addBoat", id);
                  listBoatsId1.push(id);
                  grid1[gridPos.row][gridPos.col] = "sousMarin";
                  boats1.sousMarin.pos.push(gridPos);
                  if (typeof boats1.sousMarin.pos[boats1.sousMarin.type] !== "undefined") {
                    boatState1++;
                    player1.emit("state", boatState1);
                  }
                }
              }
              break;
            case 5:
              if (typeof boats1.torpilleur.pos[boats1.torpilleur.type] === "undefined") {
                if (isAlign(gridPos, boats1.torpilleur)) {
                  player1.emit("addBoat", id);
                  listBoatsId1.push(id);
                  grid1[gridPos.row][gridPos.col] = "torpilleur";
                  boats1.torpilleur.pos.push(gridPos);
                  if (typeof boats1.torpilleur.pos[boats1.torpilleur.type] !== "undefined") {
                    boatState1++;
                    player1.emit("state", boatState1);
                    if (boatState2 === boatState1) {
                      player1.emit("state", TOUR);
                      player2.emit("state", TOURADV);
                      state = 1;
                      sendListId();
                    }
                  }
                }
              }
              break;
          }
        }
      });

      socket.on("shoot", function(id) {
        if (state === socket.player) {
          var gridPos = idToGrid(id);
          if (grid2[gridPos.row][gridPos.col] === "empty") {
            changeTurn();
            grid2[gridPos.row][gridPos.col] = "shooted";
            socket.emit("miss", id);
          } else if (grid2[gridPos.row][gridPos.col] === "porteAvion") {
            changeTurn();
            grid2[gridPos.row][gridPos.col] = "shooted";
            if (isSunk(grid2, boats2.porteAvion)) {
              socket.emit("sunk", id);
            } else {
              socket.emit("hit", id);
            }
          } else if (grid2[gridPos.row][gridPos.col] === "croiseur") {
            changeTurn();
            grid2[gridPos.row][gridPos.col] = "shooted";
            if (isSunk(grid2, boats2.croiseur)) {
              socket.emit("sunk", id);
            } else {
              socket.emit("hit", id);
            }
          } else if (grid2[gridPos.row][gridPos.col] === "contreTorpilleur") {
            changeTurn();
            grid2[gridPos.row][gridPos.col] = "shooted";
            if (isSunk(grid2, boats2.contreTorpilleur)) {
              socket.emit("sunk", id);
            } else {
              socket.emit("hit", id);
            }
          } else if (grid2[gridPos.row][gridPos.col] === "sousMarin") {
            changeTurn();
            grid2[gridPos.row][gridPos.col] = "shooted";
            if (isSunk(grid2, boats2.sousMarin)) {
              socket.emit("sunk", id);
            } else {
              socket.emit("hit", id);
            }
          } else if (grid2[gridPos.row][gridPos.col] === "torpilleur") {
            changeTurn();
            grid2[gridPos.row][gridPos.col] = "shooted";
            if (isSunk(grid2, boats2.torpilleur)) {
              socket.emit("sunk", id);
            } else {
              socket.emit("hit", id);
            }
          }

          if (j1Win()) {
            console.log("J1 WIN");
            state = 3;
            player1.emit("state", 10);
            player2.emit("state", 9);
            end(id1, id2);
            resetGame();
          }
        }

      })

    } else if (typeof player2 === "undefined"){
      socket.player = 2;
      player2 = socket;
      socket.emit("connection", "ok");
      socket.emit("player", "2");
      io.emit("state", 1);
      boatState1 = 1, boatState2 = 1;
      console.log("player2 connected");

      var rawId = obj.valjeux.split('.')[0]
      var id = rawId.replace('s%3A', '')
      id2 = id;
      socket.id = id;
      player2.id = id;

      console.log(id)

      socket.on("click", function(id) {
        var gridPos = idToGrid(id);
        if (grid2[gridPos.row][gridPos.col] === "empty") {
          switch (boatState2) {
            case 1:
              if (typeof boats2.porteAvion.pos[boats2.porteAvion.type] === "undefined") {
                if (isAlign(gridPos, boats2.porteAvion)) {
                  player2.emit("addBoat", id);
                  listBoatsId2.push(id);
                  grid2[gridPos.row][gridPos.col] = "porteAvion";
                  boats2.porteAvion.pos.push(gridPos);
                  if (typeof boats2.porteAvion.pos[boats2.porteAvion.type] !== "undefined") {
                    boatState2++;
                    player2.emit("state", boatState2);
                  }
                }
              }
              break;
            case 2:
              if (typeof boats2.croiseur.pos[boats2.croiseur.type] === "undefined") {
                if (isAlign(gridPos, boats2.croiseur)) {
                  player2.emit("addBoat", id);
                  listBoatsId2.push(id);
                  grid2[gridPos.row][gridPos.col] = "croiseur";
                  boats2.croiseur.pos.push(gridPos);
                  if (typeof boats2.croiseur.pos[boats2.croiseur.type] !== "undefined") {
                    boatState2++
                    player2.emit("state", boatState2);
                  }
                }
              }
              break;
            case 3:
              if (typeof boats2.contreTorpilleur.pos[boats2.contreTorpilleur.type] === "undefined") {
                if (isAlign(gridPos, boats2.contreTorpilleur)) {
                  player2.emit("addBoat", id);
                  listBoatsId2.push(id);
                  grid2[gridPos.row][gridPos.col] = "contreTorpilleur";
                  boats2.contreTorpilleur.pos.push(gridPos);
                  if (typeof boats2.contreTorpilleur.pos[boats2.contreTorpilleur.type] !== "undefined") {
                    boatState2++
                    player2.emit("state", boatState2);
                  }
                }
              }
              break;
            case 4:
              if (typeof boats2.sousMarin.pos[boats2.sousMarin.type] === "undefined") {
                if (isAlign(gridPos, boats2.sousMarin)) {
                  player2.emit("addBoat", id);
                  listBoatsId2.push(id);
                  grid2[gridPos.row][gridPos.col] = "sousMarin";
                  boats2.sousMarin.pos.push(gridPos);
                  if (typeof boats2.sousMarin.pos[boats2.sousMarin.type] !== "undefined") {
                    boatState2++
                    player2.emit("state", boatState2);
                  }
                }
              }
              break;
            case 5:
              if (typeof boats2.torpilleur.pos[boats2.torpilleur.type] === "undefined") {
                if (isAlign(gridPos, boats2.torpilleur)) {
                  player2.emit("addBoat", id);
                  listBoatsId2.push(id);
                  grid2[gridPos.row][gridPos.col] = "torpilleur";
                  boats2.torpilleur.pos.push(gridPos);
                  if (typeof boats2.torpilleur.pos[boats2.torpilleur.type] !== "undefined") {
                    boatState2++
                    player2.emit("state", boatState2);
                    if (boatState2 === boatState1) {
                      player2.emit("state", TOUR);
                      player1.emit("state", TOURADV);
                      state = 2;
                      sendListId();
                    }
                  }
                }
              }
              break;
          }
        }
      });

      socket.on("shoot", function(id) {
        if (state === socket.player) {
          var gridPos = idToGrid(id);
          if (grid1[gridPos.row][gridPos.col] === "empty") {
            changeTurn();
            grid1[gridPos.row][gridPos.col] = "shooted";
            socket.emit("miss", id)
          } else if (grid1[gridPos.row][gridPos.col] === "porteAvion") {
            changeTurn()
            grid1[gridPos.row][gridPos.col] = "shooted";
            if (isSunk(grid1, boats1.porteAvion)) {
              socket.emit("sunk", id)
            } else {
              socket.emit("hit", id)
            }
          } else if (grid1[gridPos.row][gridPos.col] === "croiseur") {
            changeTurn()
            grid1[gridPos.row][gridPos.col] = "shooted";
            if (isSunk(grid1, boats1.croiseur)) {
              socket.emit("sunk", id)
            } else {
              socket.emit("hit", id)
            }
          } else if (grid1[gridPos.row][gridPos.col] === "contreTorpilleur") {
            changeTurn()
            grid1[gridPos.row][gridPos.col] = "shooted";
            if (isSunk(grid1, boats1.contreTorpilleur)) {
              socket.emit("sunk", id)
            } else {
              socket.emit("hit", id)
            }
          } else if (grid1[gridPos.row][gridPos.col] === "sousMarin") {
            changeTurn()
            grid1[gridPos.row][gridPos.col] = "shooted";
            if (isSunk(grid1, boats1.sousMarin)) {
              socket.emit("sunk", id)
            } else {
              socket.emit("hit", id)
            }
          } else if (grid1[gridPos.row][gridPos.col] === "torpilleur") {
            changeTurn()
            grid1[gridPos.row][gridPos.col] = "shooted";
            if (isSunk(grid1, boats1.torpilleur)) {
              socket.emit("sunk", id)
            } else {
              socket.emit("hit", id)
            }
          }

          if (j2Win() === true) {
            console.log("J2 WIN")
            state = 3;
            end(id2, id1);
            player2.emit("state", 10);
            player1.emit("state", 9);
            resetGame();
          }
        }

      })


    } else {
      socket.emit("connection", "fail");
    }

    socket.on("disconnect", function () {
      io.emit("user disconnected");
      //resetGame();
    });
  });

  function idToGrid(id) {
    splited = id.split("-");
    row = splited[0];
    col = splited[1];
    var colGrid = col-1;
    var rowGrid;
    switch (row) {
      case "A":
        rowGrid = 0;
        break;

      case "B":
        rowGrid = 1;
        break;

      case "C":
        rowGrid = 2;
        break;

      case "D":
        rowGrid = 3;
        break;

      case "E":
        rowGrid = 4;
        break;

      case "F":
        rowGrid = 5;
        break;

      case "G":
        rowGrid = 6;
        break;

      case "H":
        rowGrid = 7;
        break;

      case "I":
        rowGrid = 8;
        break;

      case "J":
        rowGrid = 9;
        break;

    }

    return {col : colGrid, row : rowGrid};
  }

  function isAlign(gridPos, boat) {
    var type = boat.type;
    if (typeof boat.pos[type] === "undefined") {
      if (typeof boat.pos[0] === "undefined") {
        return true;
      } else if (typeof boat.pos[1] == "undefined") {
        if ((gridPos.row === boat.pos[0].row && gridPos.col === (boat.pos[0].col + 1)) ^
            (gridPos.row === boat.pos[0].row && gridPos.col === (boat.pos[0].col - 1)) ^
            (gridPos.col === boat.pos[0].col && gridPos.row === (boat.pos[0].row + 1)) ^
            (gridPos.col === boat.pos[0].col && gridPos.row === (boat.pos[0].row - 1)))
        {
          return true;
        }
      } else if (type > 1) {
        if (typeof boat.pos[2] == "undefined") {
          if (boat.pos[0].row === boat.pos[1].row && boat.pos[0].row === gridPos.row)  {
            if ((boat.pos[0].col === (gridPos.col + 1) || boat.pos[1].col === (gridPos.col - 1)) ^
                (boat.pos[0].col === (gridPos.col - 1) || boat.pos[1].col === (gridPos.col + 1)) ) {
              return true;
            }
          } else if (boat.pos[0].col === boat.pos[1].col && boat.pos[0].col === gridPos.col) {
            if ((boat.pos[0].row === (gridPos.row + 1) || boat.pos[1].row === (gridPos.row - 1)) ^
                (boat.pos[0].row === (gridPos.row - 1) || boat.pos[1].row === (gridPos.row + 1)) ) {
              return true;
            }
          }
        } else if (type > 2) {
          if (typeof boat.pos[3] == "undefined") {
            if (boat.pos[0].row === boat.pos[1].row && boat.pos[0].row === gridPos.row)  {
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
            if (typeof boat.pos[4] == "undefined") {
              if (boat.pos[0].row === boat.pos[1].row && boat.pos[0].row === gridPos.row)  {
                if ((boat.pos[0].col === (gridPos.col + 1) || boat.pos[2].col === (gridPos.col - 1) || boat.pos[1].col === (gridPos.col + 1) || boat.pos[3].col === (gridPos.col + 1)) ^
                    (boat.pos[0].col === (gridPos.col - 1) || boat.pos[2].col === (gridPos.col + 1) || boat.pos[1].col === (gridPos.col - 1) || boat.pos[3].col === (gridPos.col - 1)) ) {
                  return true;
                }
              } else if (boat.pos[0].col === boat.pos[1].col && boat.pos[0].col === gridPos.col) {
                if ((boat.pos[0].row === (gridPos.row + 1) || boat.pos[2].row === (gridPos.row - 1) || boat.pos[1].row === (gridPos.row - 1) || boat.pos[3].row === (gridPos.row - 1)) ^
                    (boat.pos[0].row === (gridPos.row - 1) || boat.pos[2].row === (gridPos.row + 1) || boat.pos[1].row === (gridPos.row + 1) || boat.pos[3].row === (gridPos.row + 1)) ) {
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
    grid1 = [
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ];
    grid2 = [
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
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

    listBoatsId1 = []
    listBoatsId2 = []

    boatState1 = 0;
    boatState2 = 0;

    state = 0;

    player1 = undefined;
    player2 = undefined;
  }

  function changeTurn() {
    if (state === 1) {
      player1.emit("state", TOURADV)
      player2.emit("state", TOUR)
      state = 2
    } else if (state === 2) {
      player1.emit("state", TOUR)
      player2.emit("state", TOURADV)
      state = 1
    } else {
      console.error("State is " + state);
      var err = new Error("State is " + state);
      throw err;
    }
  }

  function sendListId() {
    for (var i = 0; i < listBoatsId1.length; i++) {
      player1.emit("listId", listBoatsId1[i].replace("-selection", ""))
    }

    for (var i = 0; i < listBoatsId2.length; i++) {
      player2.emit("listId", listBoatsId2[i].replace("-selection", ""))
    }
  }

  function isSunk(grid, boat) {
    for (var i = 0; i < (boat.type + 1); i++) {
      if (grid[boat.pos[i].row][boat.pos[i].col] !== "shooted") {

        return false
      }
    }

    return true
  }


  function j1Win() {
    for (var i = 0; i < grid2.length; i++) {
      for (var j = 0; j < grid2[i].length; j++) {
        if(grid2[i][j] !== "empty" && grid2[i][j] !== "shooted") {
          return false;
        }
      }
    }
    return true;
  }

  function j2Win() {
    for (var i = 0; i < grid1.length; i++) {
      for (var j = 0; j < grid1[i].length; j++) {
        if(grid1[i][j] !== "empty" && grid1[i][j] !== "shooted") {
          return false;
        }
      }
    }
    return true;
  }

}
