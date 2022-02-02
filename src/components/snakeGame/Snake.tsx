import { useEffect, useState } from 'react';
import SnakeGame from '../../classes/snakeGame/SnakeGame';
import Point from '../../types/Point';

export default function Snake() {
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
	const [score, setScore] = useState(0);

	// When game state changes
	useEffect(() => {
		// Game is started
		if (gameState) {
			const canvas = document.getElementById('snake') as HTMLCanvasElement;
			const ctx = canvas.getContext('2d');
			if (ctx) {
				const newSnakeGame = SnakeGame.newGame(
					150,
					false,
					canvas.width,
					canvas.height
				);
				mainLoop(newSnakeGame, ctx);
			}
		}
	}, [gameState]);

	function startGame() {
		setMainMenuState(false);
		setGameOverState(false);
		setGameState(true);
		setScore(0);
	}

	function gameOver() {
		setGameState(false);
		setGameOverState(true);
	}

	function mainLoop(snakeGame: SnakeGame, ctx: CanvasRenderingContext2D) {
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
			snakeGame.snakeMove();
		}

		// Autophagy death
		if (snakeGame.snakeIsTouchingItSelf()) {
			gameOver();
			return;
		}

		// Eat Food
		if (snakeGame.snakeIsTouchingFood()) {
			setScore((prevScore) => prevScore++);
			snakeGame.addFood();
			activeDot(ctx, snakeGame.getFoodPosition());
			if (score === 10) {
				//TODO: Link this to quiz
				const x = document.getElementById('NextPage');
				if (x) {
					x.style.display = 'block';
				}
			}
		}

		ctx.beginPath();
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, snakeGame.getWidth(), snakeGame.getHeight());

		for (let i = 0; i < snakeGame.getSnakeLength(); i++) {
			activeDot(ctx, snakeGame.getSnakePositionAtIndex(i));
		}

		activeDot(ctx, snakeGame.getFoodPosition());

		setTimeout(mainLoop, snakeGame.getSnakeSpeed(), snakeGame, ctx);
	}

	function activeDot(ctx: CanvasRenderingContext2D, position: Point) {
		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect(position.xPos * 10, position.yPos * 10, 10, 10);
	}

	return (
		<div id="snakeGame">
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
					tabIndex={1}
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
					<a onClick={() => console.log('Show settings')}>settings</a>
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
						<input id="wallon" type="radio" name="wall" value="1" />
						<label htmlFor="wallon">On</label>
						<input id="walloff" type="radio" name="wall" value="0" />{' '}
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
					<a onClick={() => console.log('Show settings')}>settings</a>
				</div>
			) : null}
		</div>
	);
}

// var changeDir = function (key) {
// 	if (key == 38 && snake_dir != 2) {
// 		snake_next_dir = 0;
// 	} else {
// 		if (key == 39 && snake_dir != 3) {
// 			snake_next_dir = 1;
// 		} else {
// 			if (key == 40 && snake_dir != 0) {
// 				snake_next_dir = 2;
// 			} else {
// 				if (key == 37 && snake_dir != 1) {
// 					snake_next_dir = 3;
// 				}
// 			}
// 		}
// 	}
// };

// var addFood = function () {
// 	food.x = Math.floor(Math.random() * (canvas.width / 10 - 1));
// 	food.y = Math.floor(Math.random() * (canvas.height / 10 - 1));
// 	for (var i = 0; i < snake.length; i++) {
// 		if (checkBlock(food.x, food.y, snake[i].x, snake[i].y)) {
// 			addFood();
// 		}
// 	}
// };

// var checkBlock = function (x, y, _x, _y) {
// 	return x == _x && y == _y ? true : false;
// };

// var altScore = function (score_val) {
// 	ele_score.innerHTML = String(score_val);
// };

// var mainLoop = function () {
// 	var _x = snake[0].x;
// 	var _y = snake[0].y;
// 	snake_dir = snake_next_dir;

// 	// 0 - Up, 1 - Right, 2 - Down, 3 - Left
// 	switch (snake_dir) {
// 		case 0:
// 			_y--;
// 			break;
// 		case 1:
// 			_x++;
// 			break;
// 		case 2:
// 			_y++;
// 			break;
// 		case 3:
// 			_x--;
// 			break;
// 	}

// 	snake.pop();
// 	snake.unshift({ x: _x, y: _y });

// 	// Wall

// 	if (wall == 1) {
// 		// On
// 		if (
// 			snake[0].x < 0 ||
// 			snake[0].x == canvas.width / 10 ||
// 			snake[0].y < 0 ||
// 			snake[0].y == canvas.height / 10
// 		) {
// 			showScreen(3);
// 			return;
// 		}
// 	} else {
// 		// Off
// 		for (var i = 0, x = snake.length; i < x; i++) {
// 			if (snake[i].x < 0) {
// 				snake[i].x = snake[i].x + canvas.width / 10;
// 			}
// 			if (snake[i].x == canvas.width / 10) {
// 				snake[i].x = snake[i].x - canvas.width / 10;
// 			}
// 			if (snake[i].y < 0) {
// 				snake[i].y = snake[i].y + canvas.height / 10;
// 			}
// 			if (snake[i].y == canvas.height / 10) {
// 				snake[i].y = snake[i].y - canvas.height / 10;
// 			}
// 		}
// 	}

// 	// Autophagy death
// 	for (var i = 1; i < snake.length; i++) {
// 		if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
// 			showScreen(3);
// 			return;
// 		}
// 	}

// 	// Eat Food
// 	if (checkBlock(snake[0].x, snake[0].y, food.x, food.y)) {
// 		snake[snake.length] = { x: snake[0].x, y: snake[0].y };
// 		score += 1;
// 		altScore(score);
// 		addFood();
// 		activeDot(food.x, food.y);
// 		if (score == 10) {
// 			var x = document.getElementById('NextPage');
// 			x.style.display = 'block';
// 		}
// 	}

// 	ctx.beginPath();
// 	ctx.fillStyle = '#000000';
// 	ctx.fillRect(0, 0, canvas.width, canvas.height);

// 	for (var i = 0; i < snake.length; i++) {
// 		activeDot(snake[i].x, snake[i].y);
// 	}

// 	activeDot(food.x, food.y);

// 	setTimeout(mainLoop, snake_speed);
// };

// var newGame = function () {
// 	showScreen(0);
// 	screen_snake.focus();

// 	snake = [];
// 	for (var i = 4; i >= 0; i--) {
// 		snake.push({ x: i, y: 15 });
// 	}

// 	snake_next_dir = 1;

// 	score = 0;
// 	altScore(score);

// 	addFood();

// 	canvas.onkeydown = function (evt) {
// 		evt = evt || window.event;
// 		changeDir(evt.keyCode);
// 	};
// 	mainLoop();
// };

// // Change the snake speed...
// // 150 = slow
// // 100 = normal
// // 50 = fast
// var setSnakeSpeed = function (speed_value) {
// 	snake_speed = speed_value;
// };

// var setWall = function (wall_value) {
// 	wall = wall_value;
// 	if (wall == 0) {
// 		screen_snake.style.borderColor = '#606060';
// 	}
// 	if (wall == 1) {
// 		screen_snake.style.borderColor = '#FFFFFF';
// 	}
// };

// // 0 for the game
// // 1 for the main menu
// // 2 for the settings screen
// // 3 for the game over screen
// var showScreen = function (screen_opt) {
// 	switch (screen_opt) {
// 		case 0:
// 			screen_snake.style.display = 'block';
// 			screen_menu.style.display = 'none';
// 			screen_setting.style.display = 'none';
// 			screen_gameover.style.display = 'none';
// 			break;

// 		case 1:
// 			screen_snake.style.display = 'none';
// 			screen_menu.style.display = 'block';
// 			screen_setting.style.display = 'none';
// 			screen_gameover.style.display = 'none';
// 			break;

// 		case 2:
// 			screen_snake.style.display = 'none';
// 			screen_menu.style.display = 'none';
// 			screen_setting.style.display = 'block';
// 			screen_gameover.style.display = 'none';
// 			break;

// 		case 3:
// 			screen_snake.style.display = 'none';
// 			screen_menu.style.display = 'none';
// 			screen_setting.style.display = 'none';
// 			screen_gameover.style.display = 'block';
// 			break;
// 	}
// };

// window.onload = function () {
// 	canvas = document.getElementById('snake');
// 	ctx = canvas.getContext('2d');

// 	// Screens
// 	screen_snake = document.getElementById('snake');
// 	screen_menu = document.getElementById('menu');
// 	screen_gameover = document.getElementById('gameover');
// 	screen_setting = document.getElementById('setting');

// 	// Buttons
// 	button_newgame_menu = document.getElementById('newgame_menu');
// 	button_newgame_setting = document.getElementById('newgame_setting');
// 	button_newgame_gameover = document.getElementById('newgame_gameover');
// 	button_setting_menu = document.getElementById('setting_menu');
// 	button_setting_gameover = document.getElementById('setting_gameover');

// 	// etc
// 	ele_score = document.getElementById('score_value');
// 	speed_setting = document.getElementsByName('speed');
// 	wall_setting = document.getElementsByName('wall');

// 	// --------------------

// 	button_newgame_menu.onclick = function () {
// 		newGame();
// 	};
// 	button_newgame_gameover.onclick = function () {
// 		newGame();
// 	};
// 	button_newgame_setting.onclick = function () {
// 		newGame();
// 	};
// 	button_setting_menu.onclick = function () {
// 		showScreen(2);
// 	};
// 	button_setting_gameover.onclick = function () {
// 		showScreen(2);
// 	};

// 	setSnakeSpeed(35);
// 	setWall(1);
// 	showScreen('menu');

// 	// speed
// 	for (var i = 0; i < speed_setting.length; i++) {
// 		speed_setting[i].addEventListener('click', function () {
// 			for (var i = 0; i < speed_setting.length; i++) {
// 				if (speed_setting[i].checked) {
// 					setSnakeSpeed(speed_setting[i].value);
// 				}
// 			}
// 		});
// 	}

// 	// wall
// 	for (var i = 0; i < wall_setting.length; i++) {
// 		wall_setting[i].addEventListener('click', function () {
// 			for (var i = 0; i < wall_setting.length; i++) {
// 				if (wall_setting[i].checked) {
// 					setWall(wall_setting[i].value);
// 				}
// 			}
// 		});
// 	}

// 	document.onkeydown = function (evt) {
// 		if (screen_gameover.style.display == 'block') {
// 			evt = evt || window.event;
// 			if (evt.keyCode == 32) {
// 				newGame();
// 			}
// 		}
// 	};
// };
