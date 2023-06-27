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
