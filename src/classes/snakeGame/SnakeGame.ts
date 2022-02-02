import Snake from './Snake';
import SnakeFood from './SnakeFood';

export default class SnakeGame {
	private snake: Snake;
	private food: SnakeFood;
	private readonly canvasDimensions: [number, number];
	private readonly wall: boolean;
	private score: number;
	private gameOver: boolean;

	private constructor(
		snake: Snake,
		food: SnakeFood,
		wall: boolean,
		canvasDimensions: [number, number],
		score: number,
		gameOver: boolean
	) {
		this.snake = snake;
		this.food = food;
		this.wall = wall;
		this.canvasDimensions = canvasDimensions;
		this.score = score;
		this.gameOver = gameOver;
	}

	public static newGame(
		speed: number,
		wall: boolean,
		canvasDimensions: [number, number]
	) {
		const snake = Snake.newSnake(speed);
		const food = SnakeFood.newSnakeFood(canvasDimensions);
		const score = 0;
		const gameOver = false;

		return new SnakeGame(snake, food, wall, canvasDimensions, score, gameOver);
	}
}
