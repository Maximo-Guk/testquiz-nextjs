import Point from '../../types/Point';

export default class Snake {
	private speed: number;
	private direction: number;
	private positions: Point[];

	private constructor(speed: number, direction: number, positions: Point[]) {
		this.direction = direction;
		this.speed = speed;
		this.positions = positions;
	}

	public getSpeed() {
		return this.speed;
	}

	public getDirection() {
		return this.direction;
	}

	public getLength() {
		return this.positions.length;
	}

	public getPositionAtIndex(i: number) {
		return this.positions[i];
	}

	private getXPosAtIndex(i: number) {
		return this.positions[i].xPos;
	}

	private getYPosAtIndex(i: number) {
		return this.positions[i].yPos;
	}

	private getHeadXPos() {
		return this.positions[0].xPos;
	}

	private getHeadYPos() {
		return this.positions[0].yPos;
	}

	private setPosAtIndex(i: number, position: Point) {
		this.positions[i] = position;
	}

	private setXPosAtIndex(i: number, xPos: number) {
		this.positions[i].xPos = xPos;
	}

	private setYPosAtIndex(i: number, yPos: number) {
		this.positions[i].yPos = yPos;
	}

	private setHeadXPos(xPos: number) {
		this.positions[0].xPos = xPos;
	}

	private setHeadYPos(yPos: number) {
		this.positions[0].yPos = yPos;
	}

	public goUp() {
		this.setHeadYPos(this.getHeadYPos() - 1);
	}

	public goRight() {
		this.setHeadXPos(this.getHeadXPos() + 1);
	}

	public goDown() {
		this.setHeadYPos(this.getHeadYPos() + 1);
	}

	public goLeft() {
		this.setHeadXPos(this.getHeadXPos() + 1);
	}

	public grow() {
		const newPoint = {
			xPos: this.getHeadXPos(),
			yPos: this.getHeadYPos(),
		};

		this.setPosAtIndex(this.getLength(), newPoint);
	}

	public isTouchingWall(canvasWidth: number, canvasHeight: number) {
		if (
			this.getHeadXPos() < 0 ||
			this.getHeadXPos() === canvasWidth / 10 ||
			this.getHeadYPos() < 0 ||
			this.getHeadYPos() === canvasHeight / 10
		) {
			return true;
		}

		return false;
	}

	public move(canvasWidth: number, canvasHeight: number) {
		for (let i = 0; i < this.getLength(); i++) {
			if (this.getXPosAtIndex(i) < 0) {
				this.setXPosAtIndex(i, this.getXPosAtIndex(i) + canvasWidth / 10);
			}
			if (this.getXPosAtIndex(i) === canvasWidth / 10) {
				this.setXPosAtIndex(i, this.getXPosAtIndex(i) - canvasWidth / 10);
			}
			if (this.getYPosAtIndex(i) < 0) {
				this.setYPosAtIndex(i, this.getYPosAtIndex(i) + canvasHeight / 10);
			}
			if (this.getYPosAtIndex(i) === canvasHeight / 10) {
				this.setYPosAtIndex(i, this.getYPosAtIndex(i) - canvasHeight / 10);
			}
		}
	}

	public isTouchingItSelf() {
		for (var i = 1; i < this.getLength(); i++) {
			if (
				this.getHeadXPos() === this.getXPosAtIndex(i) &&
				this.getHeadYPos() === this.getYPosAtIndex(i)
			) {
				return true;
			}
		}
		return false;
	}

	public isTouchingFood(foodPosition: Point) {
		if (
			this.getHeadXPos() === foodPosition.xPos &&
			this.getHeadYPos() === foodPosition.yPos
		) {
			this.grow();
			return true;
		}
		return false;
	}

	public static newSnake(speed: number) {
		const direction = 1;
		let startingPositions: Point[] = [];
		for (let i = 4; i >= 0; i--) {
			startingPositions.push({ xPos: i, yPos: 15 });
		}

		return new Snake(speed, direction, startingPositions);
	}
}
