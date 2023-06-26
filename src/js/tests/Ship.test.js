/* eslint-disable no-undef */
import createShip from '../Ship.js';

test('Throws on invalid ship length', () => {
	expect(() => {
		createShip(1);
	}).toThrow(RangeError);
	expect(() => {
		createShip(6);
	}).toThrow(RangeError);
});

test('Throws if length !== number', () => {
	expect(() => {
		createShip('5');
	}).toThrow(TypeError);
});

test('Carrier Ship Length is 5', () => {
	const carrier = createShip(5);
	expect(carrier.length).toBe(5);
});
test('Battleship Ship Length is 4', () => {
	const battleship = createShip(4);
	expect(battleship.length).toBe(4);
});
test('Detroyer Ship Length is 3', () => {
	const detroyer = createShip(3);
	expect(detroyer.length).toBe(3);
});
test('Submarine Ship Length is 3', () => {
	const submarine = createShip(3);
	expect(submarine.length).toBe(3);
});
test('Patrol Boat Length is 2', () => {
	const patrolBoat = createShip(2);
	expect(patrolBoat.length).toBe(2);
});
