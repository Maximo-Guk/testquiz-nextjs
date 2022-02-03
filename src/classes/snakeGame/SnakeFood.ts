import Point from '../../types/Point';

export default class SnakeFood {
	private position: Point;

	private constructor(position: Point) {
		this.position = position;
	}

	public getPosition() {
		return this.position;
	}

	public static newSnakeFood(canvasWidth: number, canvasHeight: number) {
		const xPos = Math.floor(Math.random() * (canvasWidth / 10 - 1));
		const yPos = Math.floor(Math.random() * (canvasHeight / 10 - 1));

		const position = { xPos, yPos };

		return new SnakeFood(position);
	}
}
