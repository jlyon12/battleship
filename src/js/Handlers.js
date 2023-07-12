import gameState from './Game';
import display from './Display';

const { playerBoard, computerBoard, placementBoard, rotateBtn, newGameBtn } =
	display;

let direction = true;
let shipCount = gameState.getPlayerBoard().ships.length;
let currentShip = gameState.getPlayerBoard().shipTypes[shipCount];

const changeDirection = () => {
	direction === true ? (direction = false) : (direction = true);
};

const handlePlayerAttack = (e) => {
	if (gameState.getPlayerBoard().ships.length === 5) {
		const dataArray = Array.from(e.target.dataset.coord);
		const attackCoords = [Number(dataArray[0]), Number(dataArray[2])];
		gameState.playRound(attackCoords);
	}
};
const handlePlayerShipHover = (e) => {
	const dataArray = Array.from(e.target.dataset.coord);
	const originCoord = [Number(dataArray[0]), Number(dataArray[2])];
	shipCount = gameState.getPlayerBoard().ships.length;
	currentShip = gameState.getPlayerBoard().shipTypes[shipCount];
	if (currentShip === undefined) return;
	const placementCells = gameState
		.getPlayerBoard()
		.calculatePlacement(currentShip.length, originCoord, direction);
	const isValid = gameState.getPlayerBoard().isValidPlacement(placementCells);

	const placementBoardCells = placementBoard.children;
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
	for (let i = 0; i < placementBoardCells.length; i += 1) {
		placementBoardCells[i].classList.remove('valid-placement');
		placementBoardCells[i].classList.remove('invalid-placement');
		const valid = validCellStrings.includes(
			placementBoardCells[i].dataset.coord
		);
		const invalid = invalidCellStrings.includes(
			placementBoardCells[i].dataset.coord
		);
		if (valid) {
			placementBoardCells[i].classList.add('valid-placement');
		}
		if (invalid) {
			placementBoardCells[i].classList.add('invalid-placement');
		}
	}
};

const handlePlayerShipPlacement = (e) => {
	const dataArray = Array.from(e.target.dataset.coord);
	const originCoord = [Number(dataArray[0]), Number(dataArray[2])];
	shipCount = gameState.getPlayerBoard().ships.length;
	currentShip = gameState.getPlayerBoard().shipTypes[shipCount];
	if (currentShip === undefined) return;
	gameState
		.getPlayerBoard()
		.placeShip(currentShip.length, originCoord, direction);
	display.renderPlacementBoard(gameState.getPlayerBoard());
	if (gameState.getPlayerBoard().ships.length === 5) {
		placementBoard.classList.add('hidden');
		playerBoard.classList.remove('hidden');
		computerBoard.classList.remove('hidden');
		display.renderPlayerBoard(gameState.getPlayerBoard());
	}
};
window.addEventListener('load', () => {
	display.renderPlacementBoard(gameState.getPlayerBoard());
});
newGameBtn.addEventListener('click', gameState.resetGame);

rotateBtn.addEventListener('click', changeDirection);

placementBoard.addEventListener('mouseover', (e) => {
	handlePlayerShipHover(e);
});

placementBoard.addEventListener('click', (e) => {
	handlePlayerShipPlacement(e);
});

computerBoard.addEventListener('click', (e) => {
	handlePlayerAttack(e);
});
