export default function createPlayer(name) {
	const player = {};
	if (typeof name !== 'string')
		throw new TypeError('Player name must be a string');
	player.name = name;
	return player;
}
