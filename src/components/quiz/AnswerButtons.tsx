import type { Answer } from '../../classes/Quiz';

interface propsTypes {
	handleClick: (index: number) => void;
	answers: Answer[];
}

export default function AnswerButtons(props: propsTypes) {
	return (
		<div id="answer-buttons" className="row text-center">
			{props.answers
				? props.answers.map((answer, index) => (
						<div className="col" key={index}>
							<button
								className={`btn border border-dark rounded mx-auto w-100 ${answer.status}`}
								onClick={() => props.handleClick(index)}
							>
								{answer.answer}
							</button>
						</div>
				  ))
				: null}
		</div>
	);
}
