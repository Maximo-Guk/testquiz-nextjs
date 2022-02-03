import Snake from './Snake';
import SnakeFood from './SnakeFood';

interface CanvasDimensions {
	width: number;
	height: number;
}

export default class SnakeGame {
	private snake: Snake;
	private food: SnakeFood;
	private readonly canvasDimensions: CanvasDimensions;
	private readonly wall: boolean;

	private constructor(
		snake: Snake,
		food: SnakeFood,
		wall: boolean,
		canvasDimensions: CanvasDimensions
	) {
		this.snake = snake;
		this.food = food;
		this.wall = wall;
		this.canvasDimensions = canvasDimensions;
	}

	public getSnakeSpeed() {
		return this.snake.getSpeed();
	}

	public getSnakeDirection() {
		return this.snake.getDirection();
	}

	public getSnakeLength() {
		return this.snake.getLength();
	}

	public getSnakePositionAtIndex(i: number) {
		return this.snake.getPositionAtIndex(i);
	}

	public getWidth() {
		return this.canvasDimensions.width;
	}

	public getHeight() {
		return this.canvasDimensions.height;
	}

	public getWall() {
		return this.wall;
	}

	public getFoodPosition() {
		return this.food.getPosition();
	}

	private setFood(food: SnakeFood) {
		this.food = food;
	}

	public setSnakeDirection(direction: number) {
		this.snake.setDirection(direction);
	}

	public snakeGoUp() {
		this.snake.goUp();
	}

	public snakeGoRight() {
		this.snake.goRight();
	}

	public snakeGoDown() {
		this.snake.goDown();
	}

	public snakeGoLeft() {
		this.snake.goLeft();
	}

	public snakeCheckForCrossingBorder() {
		return this.snake.checkForCrossingBorder(this.getWidth(), this.getHeight());
	}

	public snakeIsTouchingWall() {
		return this.snake.isTouchingWall(this.getWidth(), this.getHeight());
	}

	public snakeIsTouchingItSelf() {
		return this.snake.isTouchingItSelf();
	}

	public snakeIsTouchingFood() {
		return this.snake.isTouchingFood(this.getFoodPosition());
	}

	public addFood() {
		const newSnakeFood = SnakeFood.newSnakeFood(
			this.canvasDimensions.width,
			this.canvasDimensions.height
		);
		this.setFood(newSnakeFood);
		for (var i = 0; i < this.getSnakeLength(); i++) {
			if (this.snake.isTouchingFood(this.getFoodPosition())) {
				this.addFood();
			}
		}
	}

	public static newGame(
		speed: number,
		wall: boolean,
		canvasWidth: number,
		canvasHeight: number
	) {
		const canvasDimensions: CanvasDimensions = {
			width: canvasWidth,
			height: canvasHeight,
		};

		const snake = Snake.newSnake(speed);
		const food = SnakeFood.newSnakeFood(
			canvasDimensions.width,
			canvasDimensions.height
		);

		return new SnakeGame(snake, food, wall, canvasDimensions);
	}
}
