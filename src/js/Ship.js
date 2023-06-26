export default function createShip(length) {
	if (typeof length !== 'number') {
		throw new TypeError('Battleship length must be a number');
	}
	if (!(length >= 2 && length <= 5)) {
		throw new RangeError('Battleships must be 2, 3, 4, or 5 length');
	}

	return {
		length,
	};
}
