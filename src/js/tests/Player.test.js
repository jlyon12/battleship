/* eslint-disable no-undef */
import createPlayer from '../Player';
import createGameboard from '../Gameboard';

test(`Players can be created with a name`, () => {
	const player1 = createPlayer('Bob Ross');
	expect(player1.name).toBe('Bob Ross');
});
test(`Throw if name !== string`, () => {
	expect(() => {
		createPlayer(666);
	}).toThrow(TypeError);
});
test(`Player can attack opponent's board`, () => {
	const player1 = createPlayer('Bob Ross');
	const player2 = createPlayer('Robert Ross');
	const player1Board = createGameboard();
	const player2Board = createGameboard();
	player1.attack([0, 0], player2Board);
	player2.attack([1, 1], player1Board);
	expect(player2Board.board[0][0]).toBe('M');
	expect(player1Board.board[1][1]).toBe('M');
});
test(`Throw is player has already missed same coords`, () => {
	const player1 = createPlayer('Bob Ross');
	const player2Board = createGameboard();
	player1.attack([0, 0], player2Board);
	expect(() => {
		player1.attack([0, 0], player2Board);
	}).toThrow(Error('This attack has already been attempted. It was a miss.'));
});
test(`Throw is player has already success hit same coords`, () => {
	const player1 = createPlayer('Bob Ross');
	const player2Board = createGameboard();
	player2Board.placeShip(3, [0, 0]);
	player1.attack([0, 0], player2Board);
	expect(() => {
		player1.attack([0, 0], player2Board);
	}).toThrow(Error('This attack has already been attempted. It was a hit.'));
});
