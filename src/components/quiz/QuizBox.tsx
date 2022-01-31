import { useState, useContext, useEffect } from 'react';
import Quiz from '../../classes/Quiz';
import { QuizContext } from '../../context/AppContext';
import AnswerButtons from './AnswerButtons';
import AnswerForm from './AnswerForm';
import QuizControls from './QuizControls';

export default function QuizBox() {
	// AppContext
	const { quiz, setQuiz } = useContext(QuizContext);

	// Background colors
	const neutralColor = 'hsl(200, 100%, 20%)';
	const successColor = 'hsl(145, 100%, 20%)';
	const failureColor = 'hsl(0, 100%, 20%)';
	// Background success image
	const successImage = "url('images/Confetti.gif')";

	// Background Color state
	const [backgroundColor, setBackgroundColor] = useState(neutralColor);

	// Render Background color on background state change
	useEffect(() => {
		document.body.style.backgroundColor = backgroundColor;
	}, [backgroundColor]);

	// Background State
	const [backgroundImage, setBackgroundImage] = useState('');

	// Render Background image on background state change
	useEffect(() => {
		document.body.style.backgroundImage = backgroundImage;
	}, [backgroundImage]);

	// Audio
	const [victorySound, setVictorySound] = useState<any>(null);
	useEffect(() => {
		setVictorySound(new Audio('audio/victory.mp3'));
	}, []);

	// States for QuestionBox

	// QuestionBox
	const [questionBoxState, setQuestionBoxState] = useState(false);
	const [question, setQuestion] = useState('');

	// Button Quiz
	const [buttonState, setButtonState] = useState(false);

	// Form Quiz
	const [formState, setFormState] = useState(false);
	const [formInput, setFormInput] = useState('');

	// States for Controls
	const [startButtonState, setStartButtonState] = useState(true);
	const [nextButtonState, setNextButtonState] = useState(false);

	async function startGame() {
		try {
			const newQuiz = await Quiz.newQuiz();
			setQuiz(newQuiz);

			setStartButtonState(false);
			nextQuestion(newQuiz);
		} catch (error) {
			if (error instanceof TypeError && error.message === 'Failed to fetch') {
				console.log(error);
				return;
			}
			throw error;
		}
	}
	async function nextQuestion(quiz: Quiz) {
		try {
			if (quiz.getRoundNumber() !== 0) {
				await quiz.getQuizQuestion();
			}
			setQuestion(quiz.getQuestion());
			setNextButtonState(false);
			if (quiz.getType() !== undefined) {
				let questionType = quiz.getType();
				switch (questionType) {
					case 'button':
						setQuestionBoxState(true);
						setButtonState(true);
					case 'form':
						setQuestionBoxState(true);
						setFormState(true);
					case 'snake':
					// props.setQuizBox(false);
					// props.setSnakeGame(true);
					case 'findCow':
					case 'findI':
				}
			} else if (quiz.getGameWin() === true) {
				setQuestionBoxState(true);
				setQuestion('You WIN!');
				document.body.classList.add('correct');
				console.log('You Won!');
			}
		} catch (error) {
			if (error instanceof TypeError && error.message === 'Failed to fetch') {
				console.log(error);
				setStartButtonState(true);
				return;
			}
			throw error;
		}
	}
	function handleClick(index: number) {
		const questionChoice = quiz.getAnswers()[index];
		// selectAnswer(questionChoice);
	}
	function handleSubmit(
		event:
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
			| React.FormEvent<HTMLFormElement>
	) {
		event.preventDefault();
		// selectAnswer(formInput);
	}
	// async function selectAnswer(choice: string) {
	// 	const response = await quiz.submitUserChoice(user, choice);
	// 	if (response.answer === true) {
	// 		const dataAnswersArray = quiz.getAnswers().map((question) => {
	// 			if (question.answer === choice || questionsData.length === 1) {
	// 				return { ...question, status: 'correct' };
	// 			} else {
	// 				return { ...question, status: 'wrong' };
	// 			}
	// 		});
	// 		setQuestionsData(dataAnswersArray);
	// 		setBackgroundColor(successColor);
	// 		setBackgroundImage(successImage);
	// 		victorySound.play();
	// 	} else {
	// 		const dataAnswersArray = questionsData.map((question) => {
	// 			return { ...question, status: 'wrong' };
	// 		});
	// 		quiz.setQuestion('You lost!');
	// 		setQuestionsData(dataAnswersArray);
	// 		setBackgroundColor(failureColor);
	// 	}
	// 	setNextButtonState(true);
	// }
	return (
		<div id="quiz-box" className="rounded mx-auto p-2">
			<div className="container-fluid">
				{questionBoxState ? (
					<div id="question-box" className="row">
						<div id="question" className="col mb-4">
							{question}
						</div>
						<div className="w-100"></div>
						<div className="col mb-4">
							{buttonState ? (
								<AnswerButtons handleClick={handleClick} />
							) : formState ? (
								<AnswerForm
									value={formInput}
									setFormInput={setFormInput}
									handleSubmit={handleSubmit}
								/>
							) : null}
						</div>
					</div>
				) : null}

				<QuizControls
					handleNextButton={nextQuestion}
					handleStartButton={startGame}
					startButtonState={startButtonState}
					nextButtonState={nextButtonState}
				/>
			</div>
		</div>
	);
}
