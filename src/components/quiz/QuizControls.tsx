import { useContext } from 'react';
import { QuizContext } from '../../context/AppContext';
import Quiz from '../../classes/Quiz';

interface propsTypes {
	handleNextButton: (quiz: Quiz) => Promise<void>;
	handleStartButton: () => Promise<void>;
	startButtonState: boolean;
	nextButtonState: boolean;
}

export default function QuizControls(props: propsTypes) {
	const { quiz } = useContext(QuizContext);

	return (
		<div id="quiz-controls" className="row text-center">
			{props.startButtonState ? (
				<div className="col">
					<button
						id="start-button"
						onClick={() => props.handleStartButton()}
						className="font-weight-bold btn border border-dark rounded mx-auto py-2 px-4"
					>
						Start the Quiz
					</button>
				</div>
			) : props.nextButtonState ? (
				<div className="col">
					<button
						id="next-button"
						onClick={() => props.handleNextButton(quiz)}
						className="font-weight-bold btn border border-dark rounded mx-auto py-2 px-4"
					>
						Next
					</button>
				</div>
			) : null}
		</div>
	);
}
