/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Display.js":
/*!***************************!*\
  !*** ./src/js/Display.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const display = (() => {
  const playerBoard = document.getElementById('playerBoard');
  const computerBoard = document.getElementById('computerBoard');
  const placementBoard = document.getElementById('placementBoard');
  const startBtn = document.getElementById('startGame');
  const rotateBtn = document.getElementById('rotate');
  const newGameBtn = document.getElementById('newGame');
  const gameText = document.getElementById('gameText');
  const renderPlacementBoard = gameBoard => {
    placementBoard.textContent = '';
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const cell = document.createElement('div');
        cell.classList.add('main__board__cell');
        cell.dataset.coord = `${j},${i}`;
        if (gameBoard.board[i][j] === 'X') {
          cell.classList.add('ship');
        }
        placementBoard.appendChild(cell);
      }
    }
  };
  const renderShipPlacementText = ship => {
    if (ship === undefined) gameText.textContent = ``;else gameText.textContent = `Place your ${ship.name}`;
  };
  const renderEnemyShipsRemainingText = gameBoard => {
    gameText.textContent = `${5 - gameBoard.sunkShips.length} enemy ships remaining`;
  };
  const renderErrorMessage = error => {
    gameText.textContent = `${error.message}`;
  };
  const renderFriendlyFireMessage = () => {
    gameText.textContent = `FRIENDLY FIRE! Please attack enemy waters only.`;
  };
  const renderPlayerWinnerText = winner => {
    gameText.textContent = `GAME OVER: ${winner.name} has sunk all enemy ships.`;
  };
  const renderPlayerLoserText = winner => {
    gameText.textContent = `GAME OVER: ${winner.name} has sunk all of your ships.`;
  };
  const renderPlayerBoard = gameBoard => {
    playerBoard.textContent = '';
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const cell = document.createElement('div');
        cell.classList.add('main__board__cell');
        cell.dataset.coord = `${j},${i}`;
        if (gameBoard.board[i][j] === 'X') {
          cell.classList.add('ship');
        } else if (gameBoard.board[i][j] === 'H') {
          cell.classList.add('hit');
        } else if (gameBoard.board[i][j] === 'M') {
          cell.classList.add('miss');
        }
        playerBoard.appendChild(cell);
      }
    }
  };
  const renderComputerBoard = gameBoard => {
    computerBoard.textContent = '';
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const cell = document.createElement('div');
        cell.classList.add('main__board__cell');
        cell.dataset.coord = `${j},${i}`;
        if (gameBoard.board[i][j] === 'H') {
          cell.classList.add('hit');
        } else if (gameBoard.board[i][j] === 'M') {
          cell.classList.add('miss');
        }
        computerBoard.appendChild(cell);
      }
    }
  };
  return {
    playerBoard,
    computerBoard,
    placementBoard,
    startBtn,
    rotateBtn,
    newGameBtn,
    gameText,
    renderPlayerBoard,
    renderComputerBoard,
    renderPlacementBoard,
    renderShipPlacementText,
    renderEnemyShipsRemainingText,
    renderFriendlyFireMessage,
    renderErrorMessage,
    renderPlayerWinnerText,
    renderPlayerLoserText
  };
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (display);

/***/ }),

/***/ "./src/js/Game.js":
/*!************************!*\
  !*** ./src/js/Game.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ "./src/js/Player.js");
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard */ "./src/js/Gameboard.js");
/* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Display */ "./src/js/Display.js");



const gameState = (() => {
  let player = (0,_Player__WEBPACK_IMPORTED_MODULE_0__["default"])('Player');
  let computer = (0,_Player__WEBPACK_IMPORTED_MODULE_0__["default"])('Computer');
  let playerBoard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
  let computerBoard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
  let activePlayer = player;
  let gameOver = false;
  let winner = null;
  computerBoard.randomizeShips();
  _Display__WEBPACK_IMPORTED_MODULE_2__["default"].renderPlayerBoard(playerBoard);
  _Display__WEBPACK_IMPORTED_MODULE_2__["default"].renderComputerBoard(computerBoard);
  const getPlayerBoard = () => playerBoard;
  const resetGame = () => {
    player = (0,_Player__WEBPACK_IMPORTED_MODULE_0__["default"])('Player');
    computer = (0,_Player__WEBPACK_IMPORTED_MODULE_0__["default"])('Computer');
    playerBoard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
    computerBoard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
    activePlayer = player;
    gameOver = false;
    winner = null;
    computerBoard.randomizeShips();
    _Display__WEBPACK_IMPORTED_MODULE_2__["default"].renderComputerBoard(computerBoard);
  };
  _Display__WEBPACK_IMPORTED_MODULE_2__["default"].renderComputerBoard(computerBoard);
  const playRound = attackCoords => {
    if (!gameOver) {
      if (activePlayer === player) {
        playerTurn(attackCoords);
        alternateTurn();
      }
      if (activePlayer === computer) {
        computerTurn();
        alternateTurn();
      }
      _Display__WEBPACK_IMPORTED_MODULE_2__["default"].renderEnemyShipsRemainingText(computerBoard);
      checkForWinner();
    }
  };
  const playerTurn = attackCoords => {
    player.attack(attackCoords, computerBoard);
    _Display__WEBPACK_IMPORTED_MODULE_2__["default"].renderComputerBoard(computerBoard);
  };
  const computerTurn = () => {
    computer.randomAttack(playerBoard);
    _Display__WEBPACK_IMPORTED_MODULE_2__["default"].renderPlayerBoard(playerBoard);
  };
  const alternateTurn = () => {
    activePlayer === player ? activePlayer = computer : activePlayer = player;
  };
  const checkForWinner = () => {
    if (computerBoard.allShipsSunk) {
      winner = player;
      gameOver = true;
      _Display__WEBPACK_IMPORTED_MODULE_2__["default"].renderPlayerWinnerText(winner);
    }
    if (playerBoard.allShipsSunk) {
      winner = computer;
      gameOver = true;
      _Display__WEBPACK_IMPORTED_MODULE_2__["default"].renderPlayerLoserText(winner);
    }
  };
  return {
    playRound,
    resetGame,
    getPlayerBoard
  };
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameState);

/***/ }),

/***/ "./src/js/Gameboard.js":
/*!*****************************!*\
  !*** ./src/js/Gameboard.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createGameboard)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/js/Ship.js");

function createGameboard() {
  const gameboard = {};
  gameboard.board = [];
  gameboard.ships = [];
  gameboard.sunkShips = [];
  gameboard.missedAttacks = new Set();
  gameboard.successfulAttacks = new Set();
  gameboard.allShipsSunk = false;
  gameboard.shipTypes = [{
    name: 'Carrier',
    length: 5
  }, {
    name: 'Battleship',
    length: 4
  }, {
    name: 'Cruiser',
    length: 3
  }, {
    name: 'Submarine',
    length: 3
  }, {
    name: 'Destroyer',
    length: 2
  }];
  gameboard.placedShipTypes = new Set();
  for (let i = 0; i < 10; i += 1) {
    gameboard.board[i] = [];
    for (let j = 0; j < 10; j += 1) {
      gameboard.board[i][j] = null;
    }
  }
  gameboard.calculatePlacement = (length, originCoord, horizontal = true) => {
    const [x, y] = originCoord;
    const shipCells = [];
    if (horizontal) {
      for (let i = 0; i < length; i += 1) {
        shipCells.push([x + i, y]);
      }
    }
    if (!horizontal) {
      for (let i = 0; i < length; i += 1) {
        shipCells.push([x, i + y]);
      }
    }
    return shipCells;
  };
  const validateRange = rangeCells => {
    const validateXArray = rangeCells.every(cell => cell[0] >= 0 && cell[0] < 10);
    const validateYArray = rangeCells.every(cell => cell[1] >= 0 && cell[1] < 10);
    return validateXArray && validateYArray;
  };
  const validateNoCollision = collisionCells => {
    const checkedCells = [];
    collisionCells.forEach(cell => {
      const [x, y] = cell;
      checkedCells.push(gameboard.board[y][x] === null);
    });
    return checkedCells.every(cell => cell === true);
  };
  const validateShipPlacement = shipCells => {
    if (!validateRange(shipCells)) {
      throw new RangeError('Ship placement is out of bounds');
      return false;
    }
    if (!validateNoCollision(shipCells)) {
      throw new Error('Ship placement collides with another ship');
      return false;
    }
    return true;
  };
  gameboard.isValidPlacement = shipCells => {
    if (!validateRange(shipCells)) {
      return false;
    }
    if (!validateNoCollision(shipCells)) {
      return false;
    }
    return true;
  };
  gameboard.placeShip = (length, originCoord = [], horizontal = true) => {
    if (gameboard.ships.length >= 5) throw new Error(`A board cannot contain more than 5 ships`);else {
      const newPlacement = gameboard.calculatePlacement(length, originCoord, horizontal);
      if (validateShipPlacement(newPlacement)) {
        const [x, y] = originCoord;
        const ship = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
        if (horizontal) {
          for (let i = 0; i < ship.length; i += 1) {
            gameboard.board[y][i + x] = 'X';
            ship.cells.add(String([x + i, y]));
          }
        }
        if (!horizontal) {
          for (let i = 0; i < ship.length; i += 1) {
            gameboard.board[i + y][x] = 'X';
            ship.cells.add(String([x, i + y]));
          }
        }
        gameboard.ships.push(ship);
      }
    }
  };
  gameboard.randomizeShips = () => {
    if (gameboard.ships.length >= 5) return;
    const originCoord = getRandomCoord();
    const orientation = getRandomOrientation();
    try {
      for (let i = 0; i < 5; i += 1) {
        const currentShip = gameboard.shipTypes[i];
        if (!gameboard.placedShipTypes.has(currentShip.name)) {
          gameboard.placeShip(currentShip.length, originCoord, orientation);
          gameboard.placedShipTypes.add(currentShip.name);
        }
      }
    } catch {
      while (gameboard.ships.length < 5) {
        gameboard.randomizeShips();
      }
    }
  };
  gameboard.receiveAttack = (coord = []) => {
    const [x, y] = coord;
    if (gameboard.board[y][x] === null) {
      gameboard.missedAttacks.add(String(coord));
      gameboard.board[y][x] = 'M';
    }
    if (gameboard.board[y][x] === 'X') {
      gameboard.successfulAttacks.add(String(coord));
      gameboard.board[y][x] = 'H';
      const hitShipIndex = gameboard.ships.findIndex(ship => ship.cells.has(String(coord)));
      const hitShip = gameboard.ships[hitShipIndex];
      hitShip.hit();
      if (hitShip.sunk === true) {
        gameboard.sunkShips.push(hitShip);
      }
      if (gameboard.sunkShips.length === 5) {
        gameboard.allShipsSunk = true;
      }
    }
  };
  return gameboard;
}
const getRandomCoord = () => {
  const possibleCoords = [];
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      possibleCoords.push([i, j]);
    }
  }
  return possibleCoords[Math.floor(Math.random() * possibleCoords.length)];
};
const getRandomOrientation = () => {
  const number = Math.random() * 1;
  return number >= 0.5;
};

/***/ }),

/***/ "./src/js/Handlers.js":
/*!****************************!*\
  !*** ./src/js/Handlers.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ "./src/js/Game.js");
/* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Display */ "./src/js/Display.js");


const {
  playerBoard,
  computerBoard,
  placementBoard,
  startBtn,
  rotateBtn,
  newGameBtn,
  gameText
} = _Display__WEBPACK_IMPORTED_MODULE_1__["default"];
let direction = true;
let shipCount = _Game__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerBoard().ships.length;
let currentShip = _Game__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerBoard().shipTypes[shipCount];
const changeDirection = () => {
  direction === true ? direction = false : direction = true;
};
const handleStart = () => {
  startBtn.classList.add('hidden');
  placementBoard.classList.remove('hidden');
  rotateBtn.classList.remove('hidden');
  gameText.classList.remove('hidden');
};
const handleNewGame = () => {
  playerBoard.classList.add('hidden');
  computerBoard.classList.add('hidden');
  newGameBtn.classList.add('hidden');
  rotateBtn.classList.remove('hidden');
  placementBoard.classList.remove('hidden');
  _Game__WEBPACK_IMPORTED_MODULE_0__["default"].resetGame();
  _Display__WEBPACK_IMPORTED_MODULE_1__["default"].renderPlacementBoard(_Game__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerBoard());
  _Display__WEBPACK_IMPORTED_MODULE_1__["default"].renderShipPlacementText();
};
const handlePlayerAttack = e => {
  if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerBoard().ships.length === 5) {
    const dataArray = Array.from(e.target.dataset.coord);
    const attackCoords = [Number(dataArray[0]), Number(dataArray[2])];
    _Game__WEBPACK_IMPORTED_MODULE_0__["default"].playRound(attackCoords);
  }
};
const handlePlayerShipHover = e => {
  const dataArray = Array.from(e.target.dataset.coord);
  const originCoord = [Number(dataArray[0]), Number(dataArray[2])];
  shipCount = _Game__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerBoard().ships.length;
  currentShip = _Game__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerBoard().shipTypes[shipCount];
  if (currentShip === undefined) return;
  const placementCells = _Game__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerBoard().calculatePlacement(currentShip.length, originCoord, direction);
  const isValid = _Game__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerBoard().isValidPlacement(placementCells);
  const placementBoardCells = placementBoard.children;
  const validCellStrings = [];
  const invalidCellStrings = [];
  if (isValid) {
    placementCells.forEach(cell => {
      const test = cell.toString();
      validCellStrings.push(test);
    });
  }
  if (!isValid) {
    placementCells.forEach(cell => {
      const test = cell.toString();
      invalidCellStrings.push(test);
    });
  }
  for (let i = 0; i < placementBoardCells.length; i += 1) {
    placementBoardCells[i].classList.remove('valid-placement');
    placementBoardCells[i].classList.remove('invalid-placement');
    const valid = validCellStrings.includes(placementBoardCells[i].dataset.coord);
    const invalid = invalidCellStrings.includes(placementBoardCells[i].dataset.coord);
    if (valid) {
      placementBoardCells[i].classList.add('valid-placement');
    }
    if (invalid) {
      placementBoardCells[i].classList.add('invalid-placement');
    }
  }
};
const handlePlayerShipPlacement = e => {
  const dataArray = Array.from(e.target.dataset.coord);
  const originCoord = [Number(dataArray[0]), Number(dataArray[2])];
  shipCount = _Game__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerBoard().ships.length;
  currentShip = _Game__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerBoard().shipTypes[shipCount];
  if (currentShip === undefined) return;
  _Game__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerBoard().placeShip(currentShip.length, originCoord, direction);
  _Display__WEBPACK_IMPORTED_MODULE_1__["default"].renderPlacementBoard(_Game__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerBoard());
  if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerBoard().ships.length === 5) {
    placementBoard.classList.add('hidden');
    playerBoard.classList.remove('hidden');
    computerBoard.classList.remove('hidden');
    rotateBtn.classList.add('hidden');
    newGameBtn.classList.remove('hidden');
    _Display__WEBPACK_IMPORTED_MODULE_1__["default"].renderPlayerBoard(_Game__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerBoard());
    _Display__WEBPACK_IMPORTED_MODULE_1__["default"].renderShipPlacementText();
  }
};
startBtn.addEventListener('click', () => {
  handleStart();
  _Display__WEBPACK_IMPORTED_MODULE_1__["default"].renderPlacementBoard(_Game__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerBoard());
});
newGameBtn.addEventListener('click', handleNewGame);
rotateBtn.addEventListener('click', changeDirection);
placementBoard.addEventListener('mouseover', e => {
  handlePlayerShipHover(e);
  _Display__WEBPACK_IMPORTED_MODULE_1__["default"].renderShipPlacementText(currentShip);
});
placementBoard.addEventListener('click', e => {
  try {
    handlePlayerShipPlacement(e);
  } catch (error) {
    _Display__WEBPACK_IMPORTED_MODULE_1__["default"].renderErrorMessage(error);
  }
});
computerBoard.addEventListener('click', e => {
  try {
    handlePlayerAttack(e);
  } catch (error) {
    _Display__WEBPACK_IMPORTED_MODULE_1__["default"].renderErrorMessage(error);
  }
});
playerBoard.addEventListener('click', _Display__WEBPACK_IMPORTED_MODULE_1__["default"].renderFriendlyFireMessage);

/***/ }),

/***/ "./src/js/Player.js":
/*!**************************!*\
  !*** ./src/js/Player.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createPlayer)
/* harmony export */ });
function createPlayer(name) {
  const player = {};
  if (typeof name !== 'string') throw new TypeError('Player name must be a string');
  player.name = name;
  player.attack = (attackCoords, opponentBoard) => {
    const target = opponentBoard;
    if (target.missedAttacks.has(String(attackCoords))) {
      throw new Error('This attack has already been attempted. It was a miss.');
    }
    if (target.successfulAttacks.has(String(attackCoords))) {
      throw new Error('This attack has already been attempted. It was a hit.');
    }
    target.receiveAttack(attackCoords);
  };
  player.randomAttack = opponentBoard => {
    const attackCoords = getRandomCoord();
    const target = opponentBoard;
    if (target.missedAttacks.has(String(attackCoords))) {
      player.randomAttack(opponentBoard);
    }
    if (target.successfulAttacks.has(String(attackCoords))) {
      player.randomAttack(opponentBoard);
    }
    target.receiveAttack(attackCoords);
  };
  return player;
}
const getRandomCoord = () => {
  const possibleCoords = [];
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      possibleCoords.push([i, j]);
    }
  }
  return possibleCoords[Math.floor(Math.random() * possibleCoords.length)];
};

/***/ }),

/***/ "./src/js/Ship.js":
/*!************************!*\
  !*** ./src/js/Ship.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createShip)
/* harmony export */ });
function createShip(length) {
  const ship = {};
  if (typeof length !== 'number') {
    throw new TypeError('Battleship length must be a number');
  }
  if (!(length >= 2 && length <= 5)) {
    throw new RangeError('Battleships must be 2, 3, 4, or 5 length');
  }
  ship.length = length;
  ship.damage = 0;
  ship.sunk = false;
  ship.cells = new Set();
  ship.hit = () => {
    if (!ship.sunk) {
      ship.damage += 1;
    }
    ship.isSunk();
  };
  ship.isSunk = () => {
    if (ship.damage === ship.length) {
      ship.sunk = true;
    }
  };
  return ship;
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/bebas-neue-v10-latin-regular.woff2 */ "./src/assets/fonts/bebas-neue-v10-latin-regular.woff2"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
  font-display: swap;
  font-family: "Bebas Neue";
  font-style: normal;
  font-weight: 400;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___}) format("woff2");
}
.page-wrapper {
  display: grid;
  align-content: space-around;
  text-align: center;
  background-color: #0a2144;
  color: #cccccc;
  font-family: "Bebas Neue", system-ui;
  letter-spacing: 0.05rem;
}

.header {
  font-size: 2rem;
}

.main {
  display: grid;
  grid-template-areas: "text" "controls" "game";
  place-content: center;
  gap: 50px;
  grid-template-rows: min-content, min-content, 1fr;
}
.main__game-text {
  grid-area: text;
  font-size: 1.5rem;
}
.main__controls {
  grid-area: controls;
  display: grid;
  grid-auto-flow: column;
  place-content: space-around;
}
.main__controls .btn {
  appearance: none;
  font-size: 1.25rem;
  border-radius: 10px;
  padding: 0.5rem;
  background-color: #cccccc;
  color: #163b66;
}
.main__controls .btn:hover {
  background-color: #6196c6;
}
.main__game {
  grid-area: game;
  display: grid;
  grid-auto-flow: column;
  place-content: center;
  gap: 50px;
}
.main__board {
  height: 420px;
  width: 420px;
  border: 1px solid #163b66;
  display: grid;
  grid-template: repeat(10, 1fr)/repeat(10, 1fr);
}
.main__board__cell {
  background-color: #163b66;
  border: 1px solid #0a2144;
}
.main__board .ship {
  background-color: #c1cfda;
}
.main__board .hit {
  background-color: #941c2f;
}
.main__board .miss {
  background-color: #6196c6;
}
.main__board .valid-placement {
  background-color: #c1cfda;
}
.main__board .invalid-placement {
  background-color: #941c2f;
}

.footer {
  font-size: 1.125rem;
}
.footer__link {
  text-decoration: none;
  color: #6196c6;
}
.footer__link:hover {
  color: #cccccc;
}

.hidden {
  display: none;
}`, "",{"version":3,"sources":["webpack://./src/styles/main.scss"],"names":[],"mappings":"AAAA;EACC,kBAAA;EACA,yBAAA;EACA,kBAAA;EACA,gBAAA;EACA,4DAAA;AACD;AAWA;EACC,aAAA;EACA,2BAAA;EACA,kBAAA;EACA,yBAbgB;EAchB,cAbU;EAcV,oCAhBY;EAkBZ,uBAAA;AAVD;;AAYA;EACC,eAAA;AATD;;AAYA;EACC,aAAA;EACA,6CAAA;EACA,qBAAA;EACA,SAAA;EACA,iDAAA;AATD;AAUC;EACC,eAAA;EACA,iBAAA;AARF;AAUC;EACC,mBAAA;EACA,aAAA;EACA,sBAAA;EACA,2BAAA;AARF;AASE;EACC,gBAAA;EACA,kBAAA;EACA,mBAAA;EACA,eAAA;EACA,yBA1CQ;EA2CR,cA1Ce;AAmClB;AASE;EACC,yBAzCc;AAkCjB;AAUC;EACC,eAAA;EACA,aAAA;EACA,sBAAA;EACA,qBAAA;EACA,SAAA;AARF;AAUC;EACC,aAAA;EACA,YAAA;EACA,yBAAA;EACA,aAAA;EACA,8CAAA;AARF;AASE;EACC,yBA9De;EA+Df,yBAAA;AAPH;AASE;EACC,yBAjEc;AA0DjB;AASE;EACC,yBAhEa;AAyDhB;AASE;EACC,yBApEc;AA6DjB;AASE;EACC,yBAzEe;AAkElB;AASE;EACC,yBA3EiB;AAoEpB;;AAYA;EACC,mBAAA;AATD;AAUC;EACC,qBAAA;EACA,cAnFe;AA2EjB;AAUC;EACC,cA3FS;AAmFX;;AAWA;EACC,aAAA;AARD","sourcesContent":["@font-face {\n\tfont-display: swap;\n\tfont-family: 'Bebas Neue';\n\tfont-style: normal;\n\tfont-weight: 400;\n\tsrc: url('../assets/fonts/bebas-neue-v10-latin-regular.woff2') format('woff2');\n}\n$ff-primary: 'Bebas Neue', system-ui;\n$clr-background: #0a2144;\n$clr-text: #cccccc;\n$clr-board-water: #163b66;\n$clr-board-ship: #c1cfda;\n$clr-board-valid: #c1cfda;\n$clr-board-invalid: #941c2f;\n$clr-board-miss: #6196c6;\n$clr-board-hit: #941c2f;\n\n.page-wrapper {\n\tdisplay: grid;\n\talign-content: space-around;\n\ttext-align: center;\n\tbackground-color: $clr-background;\n\tcolor: $clr-text;\n\tfont-family: $ff-primary;\n\n\tletter-spacing: 0.05rem;\n}\n.header {\n\tfont-size: 2rem;\n}\n\n.main {\n\tdisplay: grid;\n\tgrid-template-areas: 'text' 'controls' 'game';\n\tplace-content: center;\n\tgap: 50px;\n\tgrid-template-rows: min-content, min-content, 1fr;\n\t&__game-text {\n\t\tgrid-area: text;\n\t\tfont-size: 1.5rem;\n\t}\n\t&__controls {\n\t\tgrid-area: controls;\n\t\tdisplay: grid;\n\t\tgrid-auto-flow: column;\n\t\tplace-content: space-around;\n\t\t.btn {\n\t\t\tappearance: none;\n\t\t\tfont-size: 1.25rem;\n\t\t\tborder-radius: 10px;\n\t\t\tpadding: 0.5rem;\n\t\t\tbackground-color: $clr-text;\n\t\t\tcolor: $clr-board-water;\n\t\t}\n\t\t.btn:hover {\n\t\t\tbackground-color: $clr-board-miss;\n\t\t}\n\t}\n\t&__game {\n\t\tgrid-area: game;\n\t\tdisplay: grid;\n\t\tgrid-auto-flow: column;\n\t\tplace-content: center;\n\t\tgap: 50px;\n\t}\n\t&__board {\n\t\theight: 420px;\n\t\twidth: 420px;\n\t\tborder: 1px solid $clr-board-water;\n\t\tdisplay: grid;\n\t\tgrid-template: repeat(10, 1fr) / repeat(10, 1fr);\n\t\t&__cell {\n\t\t\tbackground-color: $clr-board-water;\n\t\t\tborder: 1px solid #0a2144;\n\t\t}\n\t\t.ship {\n\t\t\tbackground-color: $clr-board-ship;\n\t\t}\n\t\t.hit {\n\t\t\tbackground-color: $clr-board-hit;\n\t\t}\n\t\t.miss {\n\t\t\tbackground-color: $clr-board-miss;\n\t\t}\n\t\t.valid-placement {\n\t\t\tbackground-color: $clr-board-valid;\n\t\t}\n\t\t.invalid-placement {\n\t\t\tbackground-color: $clr-board-invalid;\n\t\t}\n\t}\n}\n\n.footer {\n\tfont-size: 1.125rem;\n\t&__link {\n\t\ttext-decoration: none;\n\t\tcolor: $clr-board-miss;\n\t}\n\t&__link:hover {\n\t\tcolor: $clr-text;\n\t}\n}\n.hidden {\n\tdisplay: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/reset.css":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/reset.css ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*
  Josh's Custom CSS Reset
  https://www.joshwcomeau.com/css/custom-css-reset/
*/
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

html,
body {
  height: 100%;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

#root,
#__next {
  isolation: isolate;
}`, "",{"version":3,"sources":["webpack://./src/styles/reset.css"],"names":[],"mappings":"AAAA;;;CAAA;AAIA;;;EAGI,sBAAA;AACJ;;AAEA;EACI,SAAA;AACJ;;AAEA;;EAEI,YAAA;AACJ;;AAEA;EACI,gBAAA;EACA,mCAAA;AACJ;;AAEA;;;;;EAKI,cAAA;EACA,eAAA;AACJ;;AAEA;;;;EAII,aAAA;AACJ;;AAEA;;;;;;;EAOI,yBAAA;AACJ;;AAEA;;EAEI,kBAAA;AACJ","sourcesContent":["/*\n  Josh's Custom CSS Reset\n  https://www.joshwcomeau.com/css/custom-css-reset/\n*/\n*,\n*::before,\n*::after {\n    box-sizing: border-box;\n}\n\n* {\n    margin: 0;\n}\n\nhtml,\nbody {\n    height: 100%;\n}\n\nbody {\n    line-height: 1.5;\n    -webkit-font-smoothing: antialiased;\n}\n\nimg,\npicture,\nvideo,\ncanvas,\nsvg {\n    display: block;\n    max-width: 100%;\n}\n\ninput,\nbutton,\ntextarea,\nselect {\n    font: inherit;\n}\n\np,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n    overflow-wrap: break-word;\n}\n\n#root,\n#__next {\n    isolation: isolate;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/template.html":
/*!***************************!*\
  !*** ./src/template.html ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n    <meta charset=\"UTF-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>\n        Battleship\n    </title>\n</head>\n\n<body class=\"page-wrapper\">\n    <header class=\"header\">\n        <h1 class=\"header__title\">Battleship</h1>\n    </header>\n    <main class=\"main\">\n        <p class=\"main__game-text hidden\" id=\"gameText\">This is a game</p>\n        <div class=\"main__controls\">\n            <button class=\"btn\" id=\"startGame\">Start Game</button>\n            <button class=\"btn hidden\" id=\"rotate\">Rotate</button>\n\n            <button class=\"btn hidden\" id=\"newGame\">New Game</button>\n        </div>\n        <div class=\"main__game\">\n            <div class=\"main__board hidden\" id=\"placementBoard\"></div>\n            <div class=\"main__board hidden\" id=\"playerBoard\"></div>\n            <div class=\"main__board hidden\" id=\"computerBoard\"></div>\n        </div>\n    </main>\n    <footer class=\"footer\">\n        <p class=\"footer__text\">Created by <a href=\"http://www.github.com/probableactions\"\n                class=\"footer__link\">probableactions</a></p>\n    </footer>\n\n</body>\n\n</html>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/reset.css":
/*!******************************!*\
  !*** ./src/styles/reset.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./reset.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/reset.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/fonts/bebas-neue-v10-latin-regular.woff2":
/*!*************************************************************!*\
  !*** ./src/assets/fonts/bebas-neue-v10-latin-regular.woff2 ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "4352f3c0f3586c850c24.woff2";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_reset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/reset.css */ "./src/styles/reset.css");
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _template_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template.html */ "./src/template.html");
/* harmony import */ var _js_Handlers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/Handlers */ "./src/js/Handlers.js");




})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map