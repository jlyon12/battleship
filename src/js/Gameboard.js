import createShip from './Ship';

export default function createGameboard() {
	const gameboard = {};
	gameboard.board = [];
	for (let i = 0; i < 10; i += 1) {
		gameboard.board[i] = [];
		for (let j = 0; j < 10; j += 1) {
			gameboard.board[i][j] = null;
		}
	}

	gameboard.placeShip = (length, originCoord = [], horizontal = true) => {
		const [x, y] = originCoord;
		const ship = createShip(length);
		if (x + ship.length > 10 || x < 0)
			throw new RangeError('Ship cannot be placed here');
		if (y + ship.length > 10 || y < 0)
			throw new RangeError('Ship cannot be placed here');

		if (horizontal) {
			for (let i = 0; i < ship.length; i += 1) {
				if (gameboard.board[y][i + x] !== null) {
					throw new Error('Ship placement collides with another ship');
				}
				gameboard.board[y][i + x] = 'X';
			}
		}
		if (!horizontal) {
			for (let i = 0; i < ship.length; i += 1) {
				if (gameboard.board[i + y][x] !== null) {
					throw new Error('Ship placement collides with another ship');
				}
				gameboard.board[i + y][x] = 'X';
			}
		}
	};
	return gameboard;
}
