import createShip from './Ship';

export default function createGameboard() {
	const gameboard = {};
	gameboard.board = [];
	gameboard.ships = [];
	gameboard.sunkShips = [];
	gameboard.missedAttacks = new Set();
	gameboard.successfulAttacks = new Set();
	gameboard.allShipsSunk = false;
	gameboard.shipTypes = [
		{ name: 'Carrier', length: 5 },
		{ name: 'Battleship', length: 4 },
		{ name: 'Cruiser', length: 3 },
		{ name: 'Submarine', length: 3 },
		{ name: 'Destroyer', length: 2 },
	];

	for (let i = 0; i < 10; i += 1) {
		gameboard.board[i] = [];
		for (let j = 0; j < 10; j += 1) {
			gameboard.board[i][j] = null;
		}
	}

	const calculatePlacement = (length, originCoord, horizontal = true) => {
		const [x, y] = originCoord;
		const shipCells = [];
		if (horizontal) {
			for (let i = 0; i < length; i += 1) {
				shipCells.push([x + i, y]);
			}
		}
		if (!horizontal) {
			for (let i = 0; i < length; i += 1) {
				shipCells.push([x, i + y]);
			}
		}
		return shipCells;
	};

	const validateShipPlacement = (shipCells) => {
		const validateRange = (rangeCells) => {
			const validateXArray = rangeCells.every(
				(cell) => cell[0] >= 0 && cell[0] < 10
			);
			const validateYArray = rangeCells.every(
				(cell) => cell[1] >= 0 && cell[1] < 10
			);
			return validateXArray && validateYArray;
		};
		const validateNoCollision = (collisionCells) => {
			const checkedCells = [];
			collisionCells.forEach((cell) => {
				const [x, y] = cell;
				checkedCells.push(gameboard.board[y][x] === null);
			});
			return checkedCells.every((cell) => cell === true);
		};

		if (!validateRange(shipCells)) {
			throw new RangeError('Ship placement is out of bounds');
		}
		if (!validateNoCollision(shipCells)) {
			throw new Error('Ship placement collides with another ship');
		}
	};
	gameboard.placeShip = (length, originCoord = [], horizontal = true) => {
		if (gameboard.ships.length >= 5)
			throw new Error(`A board cannot contain more than 5 ships`);
		else {
			const newPlacement = calculatePlacement(length, originCoord, horizontal);
			validateShipPlacement(newPlacement);
			const [x, y] = originCoord;
			const ship = createShip(length);
			if (horizontal) {
				for (let i = 0; i < ship.length; i += 1) {
					gameboard.board[y][i + x] = 'X';
					ship.cells.add(String([x + i, y]));
				}
			}
			if (!horizontal) {
				for (let i = 0; i < ship.length; i += 1) {
					gameboard.board[i + y][x] = 'X';
					ship.cells.add(String([x, i + y]));
				}
			}
			gameboard.ships.push(ship);
		}
	};
	gameboard.randomizeShips = () => {
		if (gameboard.ships.length >= 5) return;
		const originCoord = getRandomCoord();
		const orientation = getRandomOrientation();
		try {
			while (gameboard.ships.length < 5) {
				if (gameboard.ships.length === 0) {
					gameboard.placeShip(5, originCoord, orientation);
				}
				if (gameboard.ships.length === 1) {
					gameboard.placeShip(4, originCoord, orientation);
				}
				if (gameboard.ships.length === 2) {
					gameboard.placeShip(3, originCoord, orientation);
				}
				if (gameboard.ships.length === 3) {
					gameboard.placeShip(3, originCoord, orientation);
				}
				if (gameboard.ships.length === 4) {
					gameboard.placeShip(2, originCoord, orientation);
				}
				gameboard.randomizeShips();
			}
		} catch {
			while (gameboard.ships.length < 5) {
				gameboard.randomizeShips();
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
const getRandomCoord = () => {
	const possibleCoords = [];
	for (let i = 0; i < 10; i += 1) {
		for (let j = 0; j < 10; j += 1) {
			possibleCoords.push([i, j]);
		}
	}
	return possibleCoords[Math.floor(Math.random() * possibleCoords.length)];
};
const getRandomOrientation = () => {
	const number = Math.random() * 1;
	return number >= 0.5;
};
