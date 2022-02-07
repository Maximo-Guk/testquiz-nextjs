import { useState, useContext, useEffect } from 'react';
import Quiz, { Answer } from '../../classes/quiz/Quiz';
import { QuizContext } from '../../context/AppContext';
import AnswerButtons from './AnswerButtons';
import AnswerForm from './AnswerForm';
import QuizControls from './QuizControls';

interface propsTypes {
	setQuizBoxState: React.Dispatch<React.SetStateAction<boolean>>;
	setSnakeGameState: React.Dispatch<React.SetStateAction<boolean>>;
	setFindCowState: React.Dispatch<React.SetStateAction<boolean>>;
	setFindIState: React.Dispatch<React.SetStateAction<boolean>>;
	setEvilCowsState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function QuizBox(props: propsTypes) {
	// QuizContext
	const { quiz, setQuiz } = useContext(QuizContext);

	// Background colors
	const neutralColor = 'hsl(200, 100%, 20%)';
	const successColor = 'hsl(145, 100%, 20%)';
	const failureColor = 'hsl(0, 100%, 20%)';
	// Background success image
	const successImage = "url('images/confetti.gif')";

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
	const [answers, setAnswers] = useState([] as Answer[]);

	// Form Quiz
	const [formState, setFormState] = useState(false);
	const [formInput, setFormInput] = useState('');

	// States for Controls
	const [startButtonState, setStartButtonState] = useState(true);
	const [nextButtonState, setNextButtonState] = useState(false);

	// Display user facing error messages
	const [errorMessage, setErrorMessage] = useState('');

	// If already active user in state
	useEffect(() => {
		if (Object.keys(quiz).length !== 0) {
			setStartButtonState(false);
			nextQuestion(quiz);
		}
	}, [quiz]);

	async function startQuiz() {
		try {
			setQuiz(await Quiz.newQuiz());
			setStartButtonState(false);
		} catch (error) {
			if (error instanceof TypeError && error.message === 'Failed to fetch') {
				setErrorMessage(error.message);
				return;
			}
			throw error;
		}
	}

	function resetQuiz() {
		setButtonState(false);
		setFormState(false);
		setFormInput('');
		setQuestionBoxState(false);
		setBackgroundColor(neutralColor);
		setBackgroundImage('');
	}

	function restartQuiz() {
		resetQuiz();
		setNextButtonState(false);
		setStartButtonState(true);
	}

	async function nextQuestion(quiz: Quiz) {
		try {
			setErrorMessage('');
			if (quiz.getRoundNumber() !== 0) {
				await quiz.getQuizQuestion();
				resetQuiz();
			}
			setQuestion(quiz.getQuestion());
			setAnswers(quiz.getAnswers());
			setNextButtonState(false);
			if (quiz.getGameWin() !== true) {
				switch (quiz.getType()) {
					case 'button':
						setQuestionBoxState(true);
						setButtonState(true);
						break;
					case 'form':
						setQuestionBoxState(true);
						setFormState(true);
						break;
					case 'snake':
						props.setQuizBoxState(false);
						props.setSnakeGameState(true);
						break;
					case 'findCow':
						props.setQuizBoxState(false);
						props.setFindCowState(true);
						break;
					case 'findI':
						props.setQuizBoxState(false);
						props.setFindIState(true);
						break;
					case 'evilCows':
						props.setQuizBoxState(false);
						props.setEvilCowsState(true);
						break;
				}
			} else {
				setQuestionBoxState(true);
				setQuestion('You WIN!');
				setBackgroundColor(successColor);
				setBackgroundImage(successImage);
				console.log('You Won!');
			}
		} catch (error) {
			if (error instanceof TypeError && error.message === 'Failed to fetch') {
				setErrorMessage(error.message);
				return;
			} else if (
				error instanceof Error &&
				error.message === 'Please retry the submission'
			) {
				setErrorMessage(error.message);
				await quiz.resubmitChoice();
				setNextButtonState(true);
				return;
			}
			restartQuiz();
			throw error;
		}
	}
	function handleClick(index: number) {
		const answerChoice = answers[index];
		if (!answerChoice.status) {
			selectAnswer(answerChoice.answer);
		}
	}
	function handleSubmit(
		event:
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
			| React.FormEvent<HTMLFormElement>
	) {
		event.preventDefault();
		if (formInput !== '' && !answers[0].status) {
			selectAnswer(formInput);
		}
	}
	async function selectAnswer(choice: string) {
		try {
			const response = await quiz.submitChoice(choice);
			if (response.answer === true) {
				const updatedAnswers = answers.map((question) => {
					if (question.answer === quiz.getChoice() || answers.length === 1) {
						return { ...question, status: 'correct' };
					} else {
						return { ...question, status: 'wrong' };
					}
				});
				setAnswers(updatedAnswers);
				setBackgroundColor(successColor);
				setBackgroundImage(successImage);
				victorySound.play();
			} else {
				const updatedAnswers = answers.map((question) => {
					return { ...question, status: 'wrong' };
				});
				setQuestion('You lost!');
				setAnswers(updatedAnswers);
				setBackgroundColor(failureColor);
			}
			setNextButtonState(true);
		} catch (error) {
			if (error instanceof TypeError && error.message === 'Failed to fetch') {
				setErrorMessage(error.message);
				return;
			}
			throw error;
		}
	}
	return (
		<div id="quiz-box" className="rounded mx-auto p-2">
			<div className="container-fluid">
				{errorMessage ? (
					<div className="alert alert-danger" role="alert">
						{errorMessage}
					</div>
				) : null}

				{questionBoxState ? (
					<div id="question-box" className="row">
						<div id="question" className="col mb-4">
							{question}
						</div>
						<div className="w-100"></div>
						<div className="col mb-4">
							{buttonState ? (
								<AnswerButtons handleClick={handleClick} answers={answers} />
							) : formState ? (
								<AnswerForm
									value={formInput}
									answers={answers}
									setFormInput={setFormInput}
									handleSubmit={handleSubmit}
								/>
							) : null}
						</div>
					</div>
				) : null}

				<QuizControls
					handleNextButton={nextQuestion}
					handleStartButton={startQuiz}
					startButtonState={startButtonState}
					nextButtonState={nextButtonState}
				/>
			</div>
		</div>
	);
}
