import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import AnswerButtons from "./AnswerButtons";
import AnswerForm from "./AnswerForm";
import QuizControls from "./QuizControls";

export default function QuizBox(props: any) {
	// AppContext
	const { state, dispatch } = useContext(AppContext);

	// Background colors
	const neutralColor = "hsl(200, 100%, 20%)";
	const successColor = "hsl(145, 100%, 20%)";
	const failureColor = "hsl(0, 100%, 20%)";
	// Background success image
	const successImage = "url('images/Confetti.gif')";

	// Background Color state
	const [backgroundColor, setBackgroundColor] = useState(neutralColor);

	// Render Background color on background state change
	useEffect(() => {
		document.body.style.backgroundColor = backgroundColor;
	}, [backgroundColor]);

	// Background State
	const [backgroundImage, setBackgroundImage] = useState("");

	// Render Background color on background state change
	useEffect(() => {
		document.body.style.backgroundImage = backgroundImage;
	}, [backgroundImage]);

	// Audio
	const [victorySound, setVictorySound] = useState<any>(null);
	useEffect(() => {
		setVictorySound(new Audio("audio/victory.mp3"));
	}, []);

	// States for QuestionBox

	// QuestionBox
	const [questionBoxState, setQuestionBoxState] = useState(false);
	const [question, setQuestion] = useState("");

	// Button Quiz
	const [buttonState, setButtonState] = useState(false);
	const [questionsData, setQuestionsData] = useState<any>([]);

	// Form Quiz
	const [formState, setFormState] = useState(false);
	const [formInput, setFormInput] = useState("");

	// States for Controls
	const [quizControlsState, setQuizControlsState] = useState(true);
	const [startButtonState, setStartButtonState] = useState(true);
	const [nextButtonState, setNextButtonState] = useState(false);

	// Fetch POST Implementation
	async function postData(data = {}) {
		// API Endpoint
		const url = "../api/quiz";
		// Default options are marked with *
		const response = await fetch(url, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			mode: "same-origin", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "omit", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json",
				// "Content-Type": "application/x-www-form-urlencoded",
			},
			redirect: "error", // manual, *follow, error
			referrerPolicy: "strict-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		});
		return response.json(); // parses JSON response into native JavaScript objects
	}

	function startGame() {
		postData({ quizStarted: true }).then((data) => {
			if (data.uuid !== undefined) {
				dispatch({
					type: "CHANGE_UUID",
					payload: data.uuid,
				});
				setStartButtonState(false);
				nextQuestion(data.uuid);
			}
		});
	}
	function nextQuestion(uuid: string) {
		showQuestion(uuid);
	}
	function showQuestion(uuid: string) {
		postData({ uuid: uuid }).then((data) => {
			setQuestionsData(data.answers);
			setQuestion(data.question);
			setNextButtonState(false);
			setButtonState(false);
			setFormState(false);
			setFormInput("");
			setQuestionBoxState(false);
			setBackgroundColor(neutralColor);
			setBackgroundImage("");
			if (data.type !== undefined) {
				let questionType = data.type;
				if (questionType === "button") {
					setQuestionBoxState(true);
					setButtonState(true);
				} else if (questionType === "form") {
					setQuestionBoxState(true);
					setFormState(true);
				} else if (questionType === "snake") {
					props.setQuizBox(false);
					props.setSnakeGame(true);
				} else if (questionType === "findcow") {
				} else if (questionType === "findi") {
				}
			} else if (data.gameWin === true) {
				setQuestionBoxState(true);
				setQuestion("You WIN!");
				document.body.classList.add("correct");
				console.log("You Won!");
			} else if (data.error === "uuid not found") {
				setStartButtonState(true);
			}
		});
	}
	function handleClick(index: number) {
		const questionChoice = questionsData[index];
		if (!questionChoice.status) {
			selectAnswer(questionChoice.answer);
		}
	}
	function handleSubmit(event: any) {
		event.preventDefault();
		if (!questionsData[0].status) {
			selectAnswer(formInput);
		}
	}
	function selectAnswer(choice: any) {
		postData({
			uuid: state.uuid,
			choice: choice,
		}).then((data) => {
			if (data.answer === true) {
				const dataAnswersArray = questionsData.map((question: any) => {
					if (question.answer === choice || questionsData.length === 1) {
						return { ...question, status: "correct" };
					} else {
						return { ...question, status: "wrong" };
					}
				});
				setQuestionsData(dataAnswersArray);
				setBackgroundColor(successColor);
				setBackgroundImage(successImage);
				victorySound.play();
			} else {
				const dataAnswersArray = questionsData.map((question: any) => {
					return { ...question, status: "wrong" };
				});
				setQuestion("You lost!");
				setQuestionsData(dataAnswersArray);
				setBackgroundColor(failureColor);
			}
			setNextButtonState(true);
		});
	}
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
								<AnswerButtons
									buttons={questionsData}
									handleClick={handleClick}
								></AnswerButtons>
							) : formState ? (
								<AnswerForm
									value={formInput}
									questionsData={questionsData}
									setFormInput={setFormInput}
									handleSubmit={handleSubmit}
								></AnswerForm>
							) : null}
						</div>
					</div>
				) : null}

				{quizControlsState ? (
					<QuizControls
						handleNextButton={nextQuestion}
						handleStartButton={startGame}
						startButtonState={startButtonState}
						nextButtonState={nextButtonState}
					></QuizControls>
				) : null}
			</div>
		</div>
	);
}
