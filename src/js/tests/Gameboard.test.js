/* eslint-disable no-undef */
import createGameboard from '../Gameboard';

test('Gameboard is 2D array of 10x10 null cells', () => {
	const gameboard = createGameboard();
	expect(gameboard.board.length).toBe(10);
	for (let i = 0; i < 10; i += 1) {
		expect(gameboard.board[i].length).toBe(10);
		expect(gameboard.board[i].every((value) => value === null)).toBeTruthy();
	}
});
test('Place battleship horizontally', () => {
	const gameboard = createGameboard();
	gameboard.placeShip(5, [0, 0]);
	expect(gameboard.board[0][0]).toBe('X');
	expect(gameboard.board[0][1]).toBe('X');
	expect(gameboard.board[0][2]).toBe('X');
	expect(gameboard.board[0][3]).toBe('X');
	expect(gameboard.board[0][4]).toBe('X');
});
test('Place battleship vertically', () => {
	const gameboard = createGameboard();
	gameboard.placeShip(5, [0, 0], false);
	expect(gameboard.board[0][0]).toBe('X');
	expect(gameboard.board[1][0]).toBe('X');
	expect(gameboard.board[2][0]).toBe('X');
	expect(gameboard.board[3][0]).toBe('X');
	expect(gameboard.board[4][0]).toBe('X');
});

test('Placed ships are stored in  array', () => {
	const gameboard = createGameboard();
	gameboard.placeShip(5, [0, 0], false);
	expect(gameboard.ships.length).toBe(1);
});

test('A board can have a maximum of 5 ships', () => {
	const gameboard = createGameboard();
	gameboard.placeShip(5, [0, 0], false);
	gameboard.placeShip(4, [1, 0], false);
	gameboard.placeShip(3, [2, 0], false);
	gameboard.placeShip(3, [3, 0], false);
	gameboard.placeShip(2, [4, 0], false);
	expect(() => {
		gameboard.placeShip(2, [5, 0], false);
	}).toThrow(Error);
	expect(gameboard.ships.length).toBe(5);
});

test('Throw RangeError if ship placement is out of board bounds', () => {
	const gameboard = createGameboard();
	expect(() => {
		gameboard.placeShip(5, [6, 5]);
	}).toThrow(RangeError);
	expect(() => {
		gameboard.placeShip(5, [-1, 5]);
	}).toThrow(RangeError);
	expect(() => {
		gameboard.placeShip(5, [0, 6], false);
	}).toThrow(RangeError);
	expect(() => {
		gameboard.placeShip(5, [0, -1]);
	}).toThrow(RangeError);
});

test('Throw Error if ship placement collides with already placed ship', () => {
	const gameboard = createGameboard();
	gameboard.placeShip(5, [0, 0]);
	expect(() => {
		gameboard.placeShip(5, [0, 0]);
	}).toThrow(Error);
	expect(() => {
		gameboard.placeShip(3, [2, 0], false);
	}).toThrow(Error);
});

test('Successful attack is stored in a set', () => {
	const gameboard = createGameboard();
	gameboard.placeShip(5, [0, 0], false);
	gameboard.receiveAttack([0, 0]);
	expect(gameboard.successfulAttacks.has('0,0')).toBe(true);
});

test("Successful attacks increase hit ship's damage count", () => {
	const gameboard = createGameboard();
	gameboard.placeShip(5, [0, 0]);
	const ship = gameboard.ships[0];
	gameboard.receiveAttack([0, 0]);
	expect(ship.damage).toBe(1);
});

test('Successful attacks appear on the board', () => {
	const gameboard = createGameboard();
	gameboard.placeShip(5, [0, 0]);
	gameboard.receiveAttack([0, 0]);
	expect(gameboard.board[0][0]).toBe('H');
});

test('Missed attack is stored in a set', () => {
	const gameboard = createGameboard();
	gameboard.placeShip(5, [0, 0], false);
	gameboard.receiveAttack([9, 9]);
	expect(gameboard.missedAttacks.has('9,9')).toBe(true);
});

test("Missed attacks do not affect ship's damage count", () => {
	const gameboard = createGameboard();
	gameboard.placeShip(5, [0, 0]);
	const ship = gameboard.ships[0];
	gameboard.receiveAttack([1, 1]);
	expect(ship.damage).toBe(0);
});

test('Missed attacks are shown on the board', () => {
	const gameboard = createGameboard();
	gameboard.placeShip(5, [0, 0], false);
	gameboard.receiveAttack([9, 9]);
	expect(gameboard.board[9][9]).toBe('M');
});

test('Ships are considered sunk when enough successful hits have occurred', () => {
	const gameboard = createGameboard();
	// Vertical position
	gameboard.placeShip(5, [0, 0], false);
	const ship = gameboard.ships[0];
	gameboard.receiveAttack([0, 0]);
	gameboard.receiveAttack([0, 1]);
	gameboard.receiveAttack([0, 2]);
	gameboard.receiveAttack([0, 3]);
	gameboard.receiveAttack([0, 4]);
	// Horizontal position
	gameboard.placeShip(3, [4, 4]);
	const ship2 = gameboard.ships[1];
	gameboard.receiveAttack([4, 4]);
	gameboard.receiveAttack([5, 4]);
	gameboard.receiveAttack([6, 4]);
	expect(ship.sunk).toBe(true);
	expect(ship2.sunk).toBe(true);
});

test('Sunk ships are tracked in an array', () => {
	const gameboard = createGameboard();
	gameboard.placeShip(5, [0, 0], false);
	gameboard.receiveAttack([0, 0]);
	gameboard.receiveAttack([0, 1]);
	gameboard.receiveAttack([0, 2]);
	gameboard.receiveAttack([0, 3]);
	gameboard.receiveAttack([0, 4]);
	expect(gameboard.sunkShips.length).toBe(1);
});
test('Gameboard reports all ships as sunk', () => {
	const gameboard = createGameboard();
	gameboard.placeShip(5, [0, 0]);
	gameboard.placeShip(4, [0, 1]);
	gameboard.placeShip(3, [0, 2]);
	gameboard.placeShip(3, [0, 3]);
	gameboard.placeShip(2, [0, 4]);
	// Ship 1
	gameboard.receiveAttack([0, 0]);
	gameboard.receiveAttack([1, 0]);
	gameboard.receiveAttack([2, 0]);
	gameboard.receiveAttack([3, 0]);
	gameboard.receiveAttack([4, 0]);
	// Ship 2
	gameboard.receiveAttack([0, 1]);
	gameboard.receiveAttack([1, 1]);
	gameboard.receiveAttack([2, 1]);
	gameboard.receiveAttack([3, 1]);
	// Ship 3
	gameboard.receiveAttack([0, 2]);
	gameboard.receiveAttack([1, 2]);
	gameboard.receiveAttack([2, 2]);
	// Ship 4
	gameboard.receiveAttack([0, 3]);
	gameboard.receiveAttack([1, 3]);
	gameboard.receiveAttack([2, 3]);
	// Ship 5
	gameboard.receiveAttack([0, 4]);
	gameboard.receiveAttack([1, 4]);

	expect(gameboard.sunkShips.length).toBe(5);
	expect(gameboard.allShipsSunk).toBe(true);
});
test('Randomized board has 5 ships', () => {
	const board = createGameboard();
	board.randomizeShips();
	expect(board.ships.length).toBe(5);
});
test('Randomized board has 5 ships with correct lengths', () => {
	const board = createGameboard();
	board.randomizeShips();
	expect(board.ships.length).toBe(5);
	expect(board.placedShipTypes.has('Carrier')).toBe(true);
	expect(board.placedShipTypes.has('Battleship')).toBe(true);
	expect(board.placedShipTypes.has('Cruiser')).toBe(true);
	expect(board.placedShipTypes.has('Submarine')).toBe(true);
	expect(board.placedShipTypes.has('Destroyer')).toBe(true);
});
