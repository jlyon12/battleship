export default function createShip(length) {
	const ship = {};

	if (typeof length !== 'number') {
		throw new TypeError('Battleship length must be a number');
	}
	if (!(length >= 2 && length <= 5)) {
		throw new RangeError('Battleships must be 2, 3, 4, or 5 length');
	}
	ship.length = length;
	ship.hitsTaken = 0;
	ship.isSunk = false;

	ship.hit = () => {
		if (!ship.isSunk) {
			ship.hitsTaken += 1;
		}
		ship.checkIfSunk();
	};

	ship.checkIfSunk = () => {
		if (ship.hitsTaken === ship.length) {
			ship.isSunk = true;
		}
	};

	return ship;
}
