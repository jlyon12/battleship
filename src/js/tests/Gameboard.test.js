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
		gameboard.placeShip(5, [0, 6]);
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

test('Successful attack is stored in successful array', () => {
	const gameboard = createGameboard();
	gameboard.placeShip(5, [0, 0], false);
	gameboard.receiveAttack([0, 0]);
	expect(gameboard.successfulAttacks.length).toBe(1);
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

test('Missed attack is stored in missed array', () => {
	const gameboard = createGameboard();
	gameboard.placeShip(5, [0, 0], false);
	gameboard.receiveAttack([9, 9]);
	expect(gameboard.missedAttacks.length).toBe(1);
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
	gameboard.placeShip(5, [0, 0], false);
	const ship = gameboard.ships[0];
	gameboard.receiveAttack([0, 0]);
	gameboard.receiveAttack([1, 0]);
	gameboard.receiveAttack([2, 0]);
	gameboard.receiveAttack([3, 0]);
	gameboard.receiveAttack([4, 0]);
	expect(ship.sunk).toBe(true);
});

test('Sunk ships are tracked in an array', () => {
	const gameboard = createGameboard();
	gameboard.placeShip(5, [0, 0], false);
	gameboard.receiveAttack([0, 0]);
	gameboard.receiveAttack([1, 0]);
	gameboard.receiveAttack([2, 0]);
	gameboard.receiveAttack([3, 0]);
	gameboard.receiveAttack([4, 0]);
	expect(gameboard.sunkShips.length).toBe(1);
});
