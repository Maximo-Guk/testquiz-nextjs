import { getQuizQuestion } from '../requests/BackendGetRequest';
import { submitQuizResponse } from '../requests/BackendPostRequest';
import User from './User';

export interface Answer {
	answer: string;
	status?: string;
}

export default class Quiz {
	private readonly user: User;
	private roundNumber: number;
	private question: string;
	private type: string;
	private answers: Answer[];
	private gameWin: boolean;

	private constructor(
		user: User,
		roundNumber: number,
		question: string,
		type: string,
		answers: Answer[],
		gameWin: boolean
	) {
		this.user = user;
		this.roundNumber = roundNumber;
		this.question = question;
		this.type = type;
		this.answers = answers;
		this.gameWin = gameWin;
	}

	public getRoundNumber() {
		return this.roundNumber;
	}
	public getQuestion() {
		return this.question;
	}
	public getType() {
		return this.type;
	}
	public getAnswers() {
		return this.answers;
	}
	public getGameWin() {
		return this.gameWin;
	}
	private incrementRoundNumber() {
		this.roundNumber++;
	}
	private setQuestion(question: string) {
		this.question = question;
	}
	private setType(type: string) {
		this.type = type;
	}
	private setAnswers(answers: Answer[]) {
		this.answers = answers;
	}
	private setGameWin(gameWin: boolean) {
		this.gameWin = gameWin;
	}

	public static async newQuiz() {
		const user = await User.newUser();
		const response = await getQuizQuestion(user.getUuid());
		const roundNumber = 0;
		const gameWin = false;
		const answers = Quiz.toAnswers(response.answers);

		return new Quiz(
			user,
			roundNumber,
			response.question,
			response.type,
			answers,
			gameWin
		);
	}

	private static toAnswers(answers: string[]) {
		return answers.map((answer) => {
			return { answer: answer } as Answer;
		});
	}

	public async submitChoice(choice: string) {
		const response = await submitQuizResponse(this.user.getUuid(), choice);
		this.incrementRoundNumber();

		return response;
	}

	public async getQuizQuestion() {
		const response = await getQuizQuestion(this.user.getUuid());

		if (response.gameWin) {
			this.setGameWin(true);
			return;
		}

		const answers = Quiz.toAnswers(response.answers);

		this.setQuestion(response.question);
		this.setType(response.type);
		this.setAnswers(answers);
	}
}
