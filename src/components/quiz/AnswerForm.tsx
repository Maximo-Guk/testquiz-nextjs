import React from 'react';
import type { Answer } from '../../classes/quiz/Quiz';

interface propsTypes {
	value: string;
	answers: Answer[];
	setFormInput: React.Dispatch<React.SetStateAction<string>>;
	handleSubmit: (
		event:
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
			| React.FormEvent<HTMLFormElement>
	) => void;
}

export default function AnswerForm(props: propsTypes) {
	return (
		<div id="answer-form" className="row text-center">
			{props.answers ? (
				<div className="col">
					<form onSubmit={(event) => props.handleSubmit(event)}>
						<div className="row form-group">
							<label
								className="visually-hidden"
								htmlFor="inlineFormInputAnswer"
							>
								Answer
							</label>
							<input
								type="text"
								id="inlineFormInputAnswer"
								className="form-control rounded"
								placeholder="Answer"
								value={props.value}
								onChange={(event) => props.setFormInput(event.target.value)}
							></input>
						</div>
						<div className="row form-group">
							<button
								type="submit"
								className={`btn border border-dark rounded btn-primary w-100 ${props.answers[0].status}`}
								onClick={(event) => props.handleSubmit(event)}
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			) : null}
		</div>
	);
}
