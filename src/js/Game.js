import createPlayer from './Player';
import createGameboard from './Gameboard';
import display from './Display';

const gameState = (() => {
	let player = createPlayer('Player');
	let computer = createPlayer('Computer');
	let playerBoard = createGameboard();
	let computerBoard = createGameboard();
	let activePlayer = player;
	let gameOver = false;
	let winner = null;
	computerBoard.randomizeShips();
	display.renderPlayerBoard(playerBoard);
	display.renderComputerBoard(computerBoard);

	const getPlayerBoard = () => playerBoard;
	const resetGame = () => {
		player = createPlayer('Player');
		computer = createPlayer('Computer');
		playerBoard = createGameboard();
		computerBoard = createGameboard();
		activePlayer = player;
		gameOver = false;
		winner = null;
		computerBoard.randomizeShips();
		display.renderComputerBoard(computerBoard);
	};

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
			display.renderEnemyShipsRemainingText(computerBoard);
			checkForWinner();
		}
	};
	const playerTurn = (attackCoords) => {
		player.attack(attackCoords, computerBoard);
		display.renderComputerBoard(computerBoard);
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
			display.renderPlayerWinnerText(winner);
		}
		if (playerBoard.allShipsSunk) {
			winner = computer;
			gameOver = true;
			display.renderPlayerLoserText(winner);
		}
	};

	return {
		playRound,
		resetGame,
		getPlayerBoard,
	};
})();
export default gameState;
