import createPlayer from './Player';
import createGameboard from './Gameboard';
import display from './Display';

const gameState = (() => {
	const player = createPlayer('Player');
	const computer = createPlayer('Computer');
	const playerBoard = createGameboard();
	const computerBoard = createGameboard();

	let activePlayer = player;
	let gameOver = false;
	let winner;

	// TODO: Allow player to place own ships
	playerBoard.placeShip(5, [0, 0]);
	playerBoard.placeShip(4, [6, 2], false);
	playerBoard.placeShip(3, [7, 7]);
	playerBoard.placeShip(3, [0, 7]);
	playerBoard.placeShip(2, [4, 4], false);
	// TODO: Randomize computer ship positions
	computerBoard.placeShip(5, [0, 0]);
	computerBoard.placeShip(4, [6, 2], false);
	computerBoard.placeShip(3, [7, 7]);
	computerBoard.placeShip(3, [0, 7]);
	computerBoard.placeShip(2, [4, 4], false);

	display.renderPlayerBoard(playerBoard);
	display.renderComputerBoard(computerBoard);
	const playRound = (attackCoords) => {
		if (!gameOver) {
			if (activePlayer === player) {
				playerTurn(attackCoords);
				alternateTurn();
			}
			if (activePlayer === computer) {
				computerTurn();
				alternateTurn();
			}
			checkForWinner();
		}
	};
	const playerTurn = (attackCoords) => {
		try {
			player.attack(attackCoords, computerBoard);
			display.renderComputerBoard(computerBoard);
		} catch (error) {
			alert(error.message);
		}
	};
	const computerTurn = () => {
		computer.randomAttack(playerBoard);
		display.renderPlayerBoard(playerBoard);
	};
	const alternateTurn = () => {
		activePlayer === player
			? (activePlayer = computer)
			: (activePlayer = player);
	};

	const checkForWinner = () => {
		if (computerBoard.allShipsSunk) {
			winner = player;
			gameOver = true;
			handleGameOver();
		}
		if (playerBoard.allShipsSunk) {
			winner = computer;
			gameOver = true;
			handleGameOver();
		}
	};

	const handleGameOver = () => {
		setTimeout(() => {
			alert(`Game over ${winner.name} has won!`);
		}, 500);
	};

	return {
		playRound,
	};
})();
export default gameState;
