/* eslint-disable no-undef */
import createPlayer from '../Player';

test(`Players can be created with a name`, () => {
	const player1 = createPlayer('Bob Ross');
	expect(player1.name).toBe('Bob Ross');
});
test(`Throw if name !== string`, () => {
	expect(() => {
		createPlayer(666);
	}).toThrow(TypeError);
});
