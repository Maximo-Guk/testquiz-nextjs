import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function QuizControls(props: any) {
	const { state, dispatch } = useContext(AppContext);
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
						onClick={() => props.handleNextButton(state.uuid)}
						className="font-weight-bold btn border border-dark rounded mx-auto py-2 px-4"
					>
						Next
					</button>
				</div>
			) : null}
		</div>
	);
}
