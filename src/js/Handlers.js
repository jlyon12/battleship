import gameState from './Game';
import display from './Display';

const playerBoard = document.getElementById('playerBoard');
const computerBoard = document.getElementById('computerBoard');
const rotateBtn = document.getElementById('rotate');
const newGameBtn = document.getElementById('newGame');

let direction = true;
let shipCount = gameState.getPlayerBoard().ships.length;
let currentShip = gameState.getPlayerBoard().shipTypes[shipCount];

const changeDirection = () => {
	direction === true ? (direction = false) : (direction = true);
};

computerBoard.addEventListener('click', (e) => {
	const dataArray = Array.from(e.target.dataset.coord);
	const attackCoords = [Number(dataArray[0]), Number(dataArray[2])];
	gameState.playRound(attackCoords);
});
playerBoard.addEventListener('click', (e) => {
	const dataArray = Array.from(e.target.dataset.coord);
	const originCoord = [Number(dataArray[0]), Number(dataArray[2])];
	shipCount = gameState.getPlayerBoard().ships.length;
	currentShip = gameState.getPlayerBoard().shipTypes[shipCount];
	if (currentShip === undefined) return;

	gameState
		.getPlayerBoard()
		.placeShip(currentShip.length, originCoord, direction);
	display.renderPlayerBoard(gameState.getPlayerBoard());
});

newGameBtn.addEventListener('click', () => {
	gameState.resetGame();
	console.log(gameState.computerBoard);
});
rotateBtn.addEventListener('click', changeDirection);

playerBoard.addEventListener('mouseover', (e) => {
	const dataArray = Array.from(e.target.dataset.coord);
	const originCoord = [Number(dataArray[0]), Number(dataArray[2])];
	shipCount = gameState.getPlayerBoard().ships.length;
	currentShip = gameState.getPlayerBoard().shipTypes[shipCount];
	if (currentShip === undefined) return;
	const placementCells = gameState
		.getPlayerBoard()
		.calculatePlacement(currentShip.length, originCoord, direction);
	const isValid = gameState.getPlayerBoard().isValidPlacement(placementCells);

	const playerBoardCells = playerBoard.children;
	const validCellStrings = [];
	const invalidCellStrings = [];
	if (isValid) {
		placementCells.forEach((cell) => {
			const test = cell.toString();
			validCellStrings.push(test);
		});
	}
	if (!isValid) {
		placementCells.forEach((cell) => {
			const test = cell.toString();
			invalidCellStrings.push(test);
		});
	}

	for (let i = 0; i < playerBoardCells.length; i += 1) {
		playerBoardCells[i].classList.remove('valid-placement');
		playerBoardCells[i].classList.remove('invalid-placement');
		const valid = validCellStrings.includes(playerBoardCells[i].dataset.coord);
		const invalid = invalidCellStrings.includes(
			playerBoardCells[i].dataset.coord
		);
		if (valid) {
			playerBoardCells[i].classList.add('valid-placement');
		}
		if (invalid) {
			playerBoardCells[i].classList.add('invalid-placement');
		}
	}
});
