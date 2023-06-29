export default function createHumanPlayer(name) {
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
	return player;
}
