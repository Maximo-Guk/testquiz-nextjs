import { useState } from 'react';
import SnakeGame from '../../classes/snakeGame/SnakeGame';

export default function Snake() {
	const [snakeGame, setSnakeGame] = useState<SnakeGame>({} as SnakeGame);

	function startGame() {
		SnakeGame.newGame(150, true, [0, 0]);
	}

	return (
		<>
			<header className="wrap">
				<h1>Snake</h1>
				<p className="score">
					Score: <span id="score_value">0</span>
				</p>
			</header>
			<canvas
				className="wrap"
				id="snake"
				width="320"
				height="320"
				tabIndex={1}
			></canvas>

			<div id="gameover">
				<h2>Game Over</h2>
				<p>
					press
					<span style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
						space
					</span>
					to begin a
				</p>
				<a id="newgame_gameover">new game</a>
				<a id="setting_gameover">settings</a>
			</div>

			<div id="setting">
				<h2>Settings</h2>

				<a id="newgame_setting">new game</a>
				<br />
				<p>
					Speed:
					<input id="speed3" type="radio" name="speed" value="35" />
					<label htmlFor="speed3">Fast is the only option!</label>
				</p>
				<br />
				<p>
					Wall:
					<input id="wallon" type="radio" name="wall" value="1" checked />
					<label htmlFor="wallon">On</label>
					<input id="walloff" type="radio" name="wall" value="0" />
					<label htmlFor="walloff">Off</label>
				</p>
			</div>

			<div id="menu">
				<h2>Snake</h2>
				<p
					style={{
						fontFamily:
							'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
					}}
				>
					(Score 10 points to win!)
				</p>
				<br />
				<a id="newgame_menu">new game</a>
				<a id="setting_menu">settings</a>
			</div>
		</>
	);
}

// var activeDot = function (x, y) {
// 	ctx.fillStyle = '#FFFFFF';
// 	ctx.fillRect(x * 10, y * 10, 10, 10);
// };

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
