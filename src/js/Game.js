import createPlayer from './Player';
import createGameboard from './Gameboard';
import display from './Display';

const gameState = (() => {
	const player = createPlayer('Player');
	const computer = createPlayer('Computer');
	const playerBoard = createGameboard();
	const computerBoard = createGameboard();
	display.renderPlayerBoard(playerBoard);
	display.renderComputerBoard(computerBoard);
})();
export default gameState;
