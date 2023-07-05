const playerBoard = document.getElementById('playerBoard');
const computerBoard = document.getElementById('computerBoard');

const display = (() => {
	const createPlayerBoard = () => {
		for (let i = 0; i < 10; i += 1) {
			for (let j = 0; j < 10; j += 1) {
				const cell = document.createElement('div');
				cell.classList.add('main__board__cell');
				cell.dataset.coord = `${j},${i}`;
				playerBoard.appendChild(cell);
			}
		}
	};
	const createComputerBoard = () => {
		for (let i = 0; i < 10; i += 1) {
			for (let j = 0; j < 10; j += 1) {
				const cell = document.createElement('div');
				cell.classList.add('main__board__cell');
				cell.dataset.coord = `${j},${i}`;
				computerBoard.appendChild(cell);
			}
		}
	};

	return {
		createPlayerBoard,
		createComputerBoard,
	};
})();

export default display;
