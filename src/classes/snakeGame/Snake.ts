export default class Snake {
	private speed: number;
	private direction: number;
	private position: [number, number];

	private constructor(
		speed: number,
		direction: number,
		position: [number, number]
	) {
		this.direction = direction;
		this.speed = speed;
		this.position = position;
	}

	public static newSnake(speed: number) {
		const direction = 0;
		const position: [number, number] = [0, 0];

		return new Snake(speed, direction, position);
	}

	public getXPosition() {
		return this.position[0];
	}

	public getYPosition() {
		return this.position[1];
	}
}
