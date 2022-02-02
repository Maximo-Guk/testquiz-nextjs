export default class SnakeFood {
	private position: [number, number];

	private constructor(position: [number, number]) {
		this.position = position;
	}

	public static newSnakeFood(canvasDimensions: [number, number]) {
		const xPos = Math.floor(Math.random() * (canvasDimensions[0] / 10 - 1));
		const yPos = Math.floor(Math.random() * (canvasDimensions[1] / 10 - 1));

		const position: [number, number] = [xPos, yPos];

		return new SnakeFood(position);
	}
}
