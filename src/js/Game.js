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
	const resetGame = () => {
		let playerName = prompt('What is your name?');
		if (!playerName) playerName = 'Player';
		player = createPlayer(playerName);
		computer = createPlayer('Computer');
		playerBoard = createGameboard();
		computerBoard = createGameboard();

		activePlayer = player;
		gameOver = false;
		winner = null;
		playerBoard.randomizeShips();
		computerBoard.randomizeShips();

		display.renderPlayerBoard(playerBoard);
		display.renderComputerBoard(computerBoard);
	};

	// TODO: Allow player to place own ships

	playerBoard.randomizeShips();
	computerBoard.randomizeShips();

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
		resetGame,
	};
})();
export default gameState;
