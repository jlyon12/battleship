import gameState from './Game';

const computerBoard = document.getElementById('computerBoard');
const newGameBtn = document.getElementById('newGame');
computerBoard.addEventListener('click', (e) => {
	const dataArray = Array.from(e.target.dataset.coord);
	const attackCoords = [Number(dataArray[0]), Number(dataArray[2])];
	gameState.playRound(attackCoords);
});

newGameBtn.addEventListener('click', gameState.resetGame);
