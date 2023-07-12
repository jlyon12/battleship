const display = (() => {
	const playerBoard = document.getElementById('playerBoard');
	const computerBoard = document.getElementById('computerBoard');
	const placementBoard = document.getElementById('placementBoard');
	const startBtn = document.getElementById('startGame');
	const rotateBtn = document.getElementById('rotate');
	const newGameBtn = document.getElementById('newGame');
	const gameText = document.getElementById('gameText');
	const renderPlacementBoard = (gameBoard) => {
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
	const renderShipPlacementText = (ship) => {
		if (ship === undefined) gameText.textContent = ``;
		else gameText.textContent = `Place your ${ship.name}`;
	};

	const renderEnemyShipsRemainingText = (gameBoard) => {
		gameText.textContent = `${
			5 - gameBoard.sunkShips.length
		} enemy ships remaining`;
	};
	const renderErrorMessage = (error) => {
		gameText.textContent = `${error.message}`;
	};

	const renderFriendlyFireMessage = () => {
		gameText.textContent = `FRIENDLY FIRE! Please attack enemy waters only.`;
	};

	const renderPlayerWinnerText = (winner) => {
		gameText.textContent = `GAME OVER: ${winner.name} has sunk all enemy ships.`;
	};
	const renderPlayerLoserText = (winner) => {
		gameText.textContent = `GAME OVER: ${winner.name} has sunk all of your ships.`;
	};

	const renderPlayerBoard = (gameBoard) => {
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
	const renderComputerBoard = (gameBoard) => {
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
		renderPlayerLoserText,
	};
})();

export default display;
