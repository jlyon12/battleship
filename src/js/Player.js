export default function createPlayer(name) {
	const player = {};
	if (typeof name !== 'string')
		throw new TypeError('Player name must be a string');
	player.name = name;
	player.attack = (attackCoords, opponentBoard) => {
		const target = opponentBoard;
		if (target.missedAttacks.has(String(attackCoords))) {
			throw new Error('This attack has already been attempted. It was a miss.');
		}
		if (target.successfulAttacks.has(String(attackCoords))) {
			throw new Error('This attack has already been attempted. It was a hit.');
		}
		target.receiveAttack(attackCoords);
	};
	player.randomAttack = (opponentBoard) => {
		const attackCoords = getRandomCoord();
		const target = opponentBoard;
		if (target.missedAttacks.has(String(attackCoords))) {
			player.randomAttack(opponentBoard);
		}
		if (target.successfulAttacks.has(String(attackCoords))) {
			player.randomAttack(opponentBoard);
		}
		target.receiveAttack(attackCoords);
	};
	return player;
}

const getRandomCoord = () => {
	const possibleCoords = [];
	for (let i = 0; i < 10; i += 1) {
		for (let j = 0; j < 10; j += 1) {
			possibleCoords.push([i, j]);
		}
	}
	return possibleCoords[Math.floor(Math.random() * possibleCoords.length)];
};
