import createShip from './Ship';

export default function createGameboard() {
	const gameboard = {};
	gameboard.board = [];
	gameboard.ships = [];
	gameboard.sunkShips = [];
	gameboard.missedAttacks = new Set();
	gameboard.successfulAttacks = new Set();
	gameboard.allShipsSunk = false;

	for (let i = 0; i < 10; i += 1) {
		gameboard.board[i] = [];
		for (let j = 0; j < 10; j += 1) {
			gameboard.board[i][j] = null;
		}
	}

	gameboard.placeShip = (length, originCoord = [], horizontal = true) => {
		const [x, y] = originCoord;
		if (gameboard.ships.length >= 5)
			throw new Error(`A board cannot contain more than 5 ships`);
		else {
			const ship = createShip(length);
			gameboard.ships.push(ship);

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
					ship.cells.add(String([x + i, y]));
				}
			}
			if (!horizontal) {
				for (let i = 0; i < ship.length; i += 1) {
					if (gameboard.board[i + y][x] !== null) {
						throw new Error('Ship placement collides with another ship');
					}

					gameboard.board[i + y][x] = 'X';
					ship.cells.add(String([x, i + y]));
				}
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
			const hitShipIndex = gameboard.ships.findIndex((ship) =>
				ship.cells.has(String(coord))
			);
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
