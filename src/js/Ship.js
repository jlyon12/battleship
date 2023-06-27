export default function createShip(length) {
	const ship = {};

	if (typeof length !== 'number') {
		throw new TypeError('Battleship length must be a number');
	}
	if (!(length >= 2 && length <= 5)) {
		throw new RangeError('Battleships must be 2, 3, 4, or 5 length');
	}
	ship.length = length;
	ship.damage = 0;
	ship.sunk = false;

	ship.hit = () => {
		if (!ship.sunk) {
			ship.damage += 1;
		}
		ship.isSunk();
	};

	ship.isSunk = () => {
		if (ship.damage === ship.length) {
			ship.sunk = true;
		}
	};

	return ship;
}
