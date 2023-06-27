/* eslint-disable no-undef */
import createShip from '../Ship';

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

test('All five battleships can be created with correct lengths', () => {
	const carrier = createShip(5);
	const battleship = createShip(4);
	const detroyer = createShip(3);
	const submarine = createShip(3);
	const patrolBoat = createShip(2);
	expect(carrier.length).toBe(5);
	expect(battleship.length).toBe(4);
	expect(detroyer.length).toBe(3);
	expect(submarine.length).toBe(3);
	expect(patrolBoat.length).toBe(2);
});

test('New ships are not sunk by default', () => {
	const ship = createShip(3);
	expect(ship.sunk).toBe(false);
});

test('Ships can be hit', () => {
	const ship = createShip(3);
	ship.hit();
	expect(ship.hitsTaken).toBe(1);
});
test('Ship can be sunk', () => {
	const ship = createShip(3);
	ship.hit();
	ship.hit();
	ship.hit();
	expect(ship.sunk).toBe(true);
});
test('Hits can not exceed ship length', () => {
	const ship = createShip(3);
	ship.hit();
	ship.hit();
	ship.hit();
	ship.hit();
	expect(ship.hitsTaken).toBe(ship.length);
});
