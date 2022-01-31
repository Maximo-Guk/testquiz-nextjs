import { useContext } from 'react';
import { QuizContext } from '../../context/AppContext';

interface propsTypes {
	handleClick: (index: number) => void;
}

export default function AnswerButtons(props: propsTypes) {
	const { quiz } = useContext(QuizContext);

	return (
		<div id="answer-buttons" className="row text-center">
			{quiz.getAnswers()
				? quiz.getAnswers().map((answer, index: number) => (
						<div className="col" key={index}>
							<button
								id={`question${index}`}
								className={`btn border border-dark rounded mx-auto w-100`}
								onClick={() => props.handleClick(index)}
							>
								{answer}
							</button>
						</div>
				  ))
				: null}
		</div>
	);
}
