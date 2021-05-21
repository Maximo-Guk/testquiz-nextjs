export default function AnswerButtons(props: any) {
	return (
		<div id="answer-buttons" className="row text-center">
			{props.buttons
				? props.buttons.map((answer: any, index: number) => (
						<div className="col">
							<button
								id={`question${index + 1}`}
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
