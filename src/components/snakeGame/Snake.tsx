import { useEffect, useState } from 'react';
import SnakeGame from '../../classes/snakeGame/SnakeGame';
import Point from '../../types/Point';

interface propsTypes {
	setQuizBoxState: React.Dispatch<React.SetStateAction<boolean>>;
	setSnakeGameState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Snake(props: propsTypes) {
	// Background Color state
	const [backgroundColor, setBackgroundColor] = useState('black');

	// Render Background color on background state change
	useEffect(() => {
		document.body.style.backgroundColor = backgroundColor;
	}, [backgroundColor]);

	// Music
	const [music, setMusic] = useState<any>(null);

	useEffect(() => {
		setMusic(new Audio('audio/snake-music.ogg'));
	}, []);

	useEffect(() => {
		music !== null ? ((music.loop = true), (music.autoplay = true)) : null;
	}, [music]);

	// Game Menu States
	const [gameState, setGameState] = useState(false);
	const [mainMenuState, setMainMenuState] = useState(true);
	const [settingState, setSettingState] = useState(false);
	const [gameOverState, setGameOverState] = useState(false);

	// snakeGame States
	const [snakeGame, setSnakeGame] = useState({} as SnakeGame);
	const [score, setScore] = useState(0);
	const [wall, setWall] = useState(true);

	// When game state changes
	useEffect(() => {
		// Game is starting
		if (gameState) {
			const canvas = document.getElementById('snake') as HTMLCanvasElement;
			setSnakeGame(SnakeGame.newGame(35, wall, canvas.width, canvas.height));
		}
	}, [gameState]);

	// When SnakeGame state changes
	useEffect(() => {
		// SnakeGame is ready
		if (gameState && snakeGame) {
			const canvas = document.getElementById('snake') as HTMLCanvasElement;
			const ctx = canvas.getContext('2d');
			if (ctx) {
				mainLoop(ctx);
			}
		}
	}, [snakeGame]);

	function startGame() {
		setMainMenuState(false);
		setGameOverState(false);
		setSettingState(false);
		setGameState(true);
		setScore(0);
	}

	function showSettings() {
		setMainMenuState(false);
		setGameOverState(false);
		setSettingState(true);
	}

	function gameOver() {
		setGameState(false);
		setGameOverState(true);
	}

	function mainLoop(ctx: CanvasRenderingContext2D) {
		// 0 - Up, 1 - Right, 2 - Down, 3 - Left
		switch (snakeGame.getSnakeDirection()) {
			case 0:
				snakeGame.snakeGoUp();
				break;
			case 1:
				snakeGame.snakeGoRight();
				break;
			case 2:
				snakeGame.snakeGoDown();
				break;
			case 3:
				snakeGame.snakeGoLeft();
				break;
		}

		// Wall
		if (snakeGame.getWall()) {
			// On
			if (snakeGame.snakeIsTouchingWall()) {
				gameOver();
				return;
			}
		} else {
			// Off
			snakeGame.snakeCheckForCrossingBorder();
		}

		// Autophagy death
		if (snakeGame.snakeIsTouchingItSelf()) {
			gameOver();
			return;
		}

		// Eat Food
		if (snakeGame.snakeIsTouchingFood()) {
			setScore((prevScore) => prevScore + 1);
			snakeGame.addFood();
			activeDot(ctx, snakeGame.getFoodPosition());
			if (score === 10) {
				//TODO: Link this to quiz
			}
		}

		ctx.beginPath();
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, snakeGame.getWidth(), snakeGame.getHeight());

		for (let i = 0; i < snakeGame.getSnakeLength(); i++) {
			activeDot(ctx, snakeGame.getSnakePositionAtIndex(i));
		}

		activeDot(ctx, snakeGame.getFoodPosition());

		setTimeout(mainLoop, snakeGame.getSnakeSpeed(), ctx);
	}

	function activeDot(ctx: CanvasRenderingContext2D, position: Point) {
		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect(position.xPos * 10, position.yPos * 10, 10, 10);
	}

	function changeDir(code: string) {
		switch (code) {
			case 'ArrowUp':
				if (snakeGame.getSnakeDirection() !== 2) {
					snakeGame.setSnakeDirection(0);
				}
				break;

			case 'ArrowRight':
				if (snakeGame.getSnakeDirection() !== 3) {
					snakeGame.setSnakeDirection(1);
				}
				break;

			case 'ArrowDown':
				if (snakeGame.getSnakeDirection() !== 0) {
					snakeGame.setSnakeDirection(2);
				}
				break;

			case 'ArrowLeft':
				if (snakeGame.getSnakeDirection() !== 1) {
					snakeGame.setSnakeDirection(3);
				}
				break;
			case 'Space':
				if (gameOverState) {
					startGame();
				}
				break;
		}
	}

	return (
		<div
			id="snakeGame"
			onKeyDown={(event) => changeDir(event.code)}
			tabIndex={1}
		>
			<header className="wrap mx-auto">
				<h1 id="headerTitle" className="text-white">
					Snake
				</h1>
				<p className="score text-white text-right">
					Score: <span id="score_value">{score}</span>
				</p>
			</header>

			{gameState ? (
				<canvas
					className="wrap mx-auto"
					id="snake"
					width="320"
					height="320"
					style={wall ? { borderColor: '#FFFFFF' } : { borderColor: '#606060' }}
				></canvas>
			) : null}

			{gameOverState ? (
				<div id="gameover" className="text-white text-center mx-auto">
					<h2>Game Over</h2>
					<p>
						press{' '}
						<span id="pressSpaceKey" className="bg-white text-dark">
							space
						</span>{' '}
						to begin a
					</p>
					<a onClick={() => startGame()}>new game</a>
					<a onClick={() => showSettings()}>settings</a>
				</div>
			) : null}
			{/* Game Over Screen */}

			{/* Setting screen */}
			{settingState ? (
				<div id="setting" className="text-white text-center mx-auto">
					<h2>Settings</h2>

					<a onClick={() => startGame()}>new game</a>
					<br />
					<p>
						Speed:
						<input id="speed3" type="radio" name="speed" value="35" />
						<label htmlFor="speed3">Fast is the only option!</label>
					</p>
					<br />
					<p>
						Wall:
						<input
							id="wallon"
							type="radio"
							name="wall"
							value="1"
							checked={wall}
							onChange={() => setWall((prevValue) => !prevValue)}
						/>
						<label htmlFor="wallon">On</label>
						<input
							id="walloff"
							type="radio"
							name="wall"
							value="0"
							checked={!wall}
							onChange={() => setWall((prevValue) => !prevValue)}
						/>{' '}
						<label htmlFor="walloff">Off</label>
					</p>
				</div>
			) : null}

			{/* Main Menu Screen */}
			{mainMenuState ? (
				<div id="menu" className="text-white text-center mx-auto">
					<h2>Snake</h2>
					<p id="scoreInstructions">(Score 10 points to win!)</p>
					<br />
					<a onClick={() => startGame()}>new game</a>
					<a onClick={() => showSettings()}>settings</a>
				</div>
			) : null}
		</div>
	);
}
