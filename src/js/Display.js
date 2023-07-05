const playerBoard = document.getElementById('playerBoard');
const computerBoard = document.getElementById('computerBoard');

const display = (() => {
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
		renderPlayerBoard,
		renderComputerBoard,
	};
})();

export default display;
