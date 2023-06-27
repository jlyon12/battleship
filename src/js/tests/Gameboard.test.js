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
