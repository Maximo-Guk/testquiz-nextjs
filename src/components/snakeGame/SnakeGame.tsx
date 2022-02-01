import { useEffect, useState } from 'react';

export default function SnakeGame() {
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

	// Game States

	// TODO: Game Logic

	// TODO: Make this into a function that handles click for the speed setting.
	for (var i = 0; i < speed_setting.length; i++) {
		speed_setting[i].addEventListener('click', function () {
			for (var i = 0; i < speed_setting.length; i++) {
				if (speed_setting[i].checked) {
					setSnakeSpeed(speed_setting[i].value);
				}
			}
		});
	}

	// TODO: Make this into a function that handles click for the speed setting.
	for (var i = 0; i < wall_setting.length; i++) {
		wall_setting[i].addEventListener('click', function () {
			for (var i = 0; i < wall_setting.length; i++) {
				if (wall_setting[i].checked) {
					setWall(wall_setting[i].value);
				}
			}
		});
	}

	//TODO: Handle space keydown, and trigger newgame. Use state when checking the visibility.
	document.onkeydown = function (evt) {
		if (screen_gameover.style.display == 'block') {
			evt = evt || window.event;
			if (evt.code === 'Space') {
				newGame();
			}
		}
	};

	//TODO: Figure out what this does. I think it makes a border?
	function activeDot(x, y) {
		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect(x * 10, y * 10, 10, 10);
	}

	/*TODO: Switch to case? Check to see if that would work, and whether there's anything
	that should be handled with states
	*/
	function changeDir(key) {
		console.log('I pressed ' + key);

		if (key === 'ArrowUp' && snake_dir != 2) {
			console.log('Right');
			snake_next_dir = 0;
		} else {
			if (key === 'ArrowRight' && snake_dir != 3) {
				console.log('Left');
				snake_next_dir = 1;
			} else {
				if (key === 'ArrowDown' && snake_dir != 0) {
					console.log('Up');
					snake_next_dir = 2;
				} else {
					if (key === 'ArrowLeft' && snake_dir != 1) {
						console.log('Down');
						snake_next_dir = 3;
					}
				}
			}
		}
	}

	//TODO: Figure out what this function does, and whether anything needs to be changed about how it works.
	function addFood() {
		food.x = Math.floor(Math.random() * (canvas.width / 10 - 1));
		food.y = Math.floor(Math.random() * (canvas.height / 10 - 1));
		for (var i = 0; i < snake.length; i++) {
			if (checkBlock(food.x, food.y, snake[i].x, snake[i].y)) {
				addFood();
			}
		}
	}

	//TODO: No idea what x and x_ are. Figure out what these parameters are, and what this function does.
	function checkBlock(x, y, _x, _y) {
		return x == _x && y == _y ? true : false;
	}

	//TODO: Not sure what this function does. Does it show a score? If so this can be handled with react.
	function altScore(score_val) {
		ele_score.innerHTML = String(score_val);
	}

	//TODO: Lot's of things to look at within this main loop, and figure out.
	function mainLoop() {
		var _x = snake[0].x;
		var _y = snake[0].y;
		snake_dir = snake_next_dir;

		// 0 - Up, 1 - Right, 2 - Down, 3 - Left
		switch (snake_dir) {
			case 0:
				_y--;
				break;
			case 1:
				_x++;
				break;
			case 2:
				_y++;
				break;
			case 3:
				_x--;
				break;
		}

		snake.pop();
		snake.unshift({ x: _x, y: _y });

		// Wall

		if (wall == 1) {
			// On
			if (
				snake[0].x < 0 ||
				snake[0].x == canvas.width / 10 ||
				snake[0].y < 0 ||
				snake[0].y == canvas.height / 10
			) {
				showScreen(3);
				return;
			}
		} else {
			// Off
			for (var i = 0, x = snake.length; i < x; i++) {
				if (snake[i].x < 0) {
					snake[i].x = snake[i].x + canvas.width / 10;
				}
				if (snake[i].x == canvas.width / 10) {
					snake[i].x = snake[i].x - canvas.width / 10;
				}
				if (snake[i].y < 0) {
					snake[i].y = snake[i].y + canvas.height / 10;
				}
				if (snake[i].y == canvas.height / 10) {
					snake[i].y = snake[i].y - canvas.height / 10;
				}
			}
		}

		// Autophagy death
		for (var i = 1; i < snake.length; i++) {
			if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
				showScreen(3);
				return;
			}
		}

		// Eat Food
		if (checkBlock(snake[0].x, snake[0].y, food.x, food.y)) {
			snake[snake.length] = { x: snake[0].x, y: snake[0].y };
			score += 1;
			altScore(score);
			addFood();
			activeDot(food.x, food.y);
			if (score == 10) {
				var x = document.getElementById('NextPage');
				x.style.display = 'block';
			}
		}

		ctx.beginPath();
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		for (var i = 0; i < snake.length; i++) {
			activeDot(snake[i].x, snake[i].y);
		}

		activeDot(food.x, food.y);

		// Debug
		//document.getElementById("debug").innerHTML = snake_dir + " " + snake_next_dir + " " + snake[0].x + " " + snake[0].y;

		setTimeout(mainLoop, snake_speed);
	}

	function newGame() {
		showScreen(0);
		screen_snake.focus();

		snake = [];
		for (var i = 4; i >= 0; i--) {
			snake.push({ x: i, y: 15 });
		}

		snake_next_dir = 1;

		score = 0;
		altScore(score);

		addFood();

		canvas.onkeydown = function (evt) {
			evt = evt || window.event;
			changeDir(evt.code);
		};
		mainLoop();
	}

	// Change the snake speed...
	// 150 = slow
	// 100 = normal
	// 50 = fast
	function setSnakeSpeed(speed_value) {
		snake_speed = speed_value;
	}

	function setWall(wall_value) {
		wall = wall_value;
		if (wall == 0) {
			screen_snake.style.borderColor = '#606060';
		}
		if (wall == 1) {
			screen_snake.style.borderColor = '#FFFFFF';
		}
	}

	/////////////////////////////////////////////////////////////

	// 0 for the game
	// 1 for the main menu
	// 2 for the settings screen
	// 3 for the game over screen

	function showScreen(screen_opt) {
		switch (screen_opt) {
			case 0:
				screen_snake.style.display = 'block';
				screen_menu.style.display = 'none';
				screen_setting.style.display = 'none';
				screen_gameover.style.display = 'none';
				break;

			case 1:
				screen_snake.style.display = 'none';
				screen_menu.style.display = 'block';
				screen_setting.style.display = 'none';
				screen_gameover.style.display = 'none';
				break;

			case 2:
				screen_snake.style.display = 'none';
				screen_menu.style.display = 'none';
				screen_setting.style.display = 'block';
				screen_gameover.style.display = 'none';
				break;

			case 3:
				screen_snake.style.display = 'none';
				screen_menu.style.display = 'none';
				screen_setting.style.display = 'none';
				screen_gameover.style.display = 'block';
				break;
		}
	}

	return (
		<div id="snakeGame">
			<header className="wrap mx-auto">
				<h1 id="headerTitle" className="text-white">
					Snake
				</h1>
				<p className="score text-white text-right">
					Score: <span id="score_value">0</span>
				</p>
			</header>

			<canvas
				className="wrap mx-auto"
				id="snake"
				width="320"
				height="320"
				tabIndex={1}
			></canvas>
			{/* Game Over Screen */}
			<div id="gameover" className="text-white text-center mx-auto">
				<h2>Game Over</h2>
				<p>
					press{' '}
					<span id="pressSpaceKey" className="bg-white text-dark">
						space
					</span>{' '}
					to begin a
				</p>
				<NewGame handleClick={newGame}></NewGame>
				<SettingMenu handleClick={showScreen}></SettingMenu>
			</div>

			{/* Setting screen */}
			<div id="setting" className="text-white text-center mx-auto">
				<h2>Settings</h2>

				<NewGame handleClick={newGame}></NewGame>
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
					<input id="walloff" type="radio" name="wall" value="0" />
					<label htmlFor="walloff">Off</label>
				</p>
			</div>

			{/* Main Menu Screen */}
			<div id="menu" className="text-white text-center mx-auto">
				<h2>Snake</h2>
				<p id="scoreInstructions">(Score 10 points to win!)</p>
				<br />
				<NewGame handleClick={newGame}></NewGame>
				<SettingMenu handleClick={showScreen}></SettingMenu>
			</div>
		</div>
	);
}
