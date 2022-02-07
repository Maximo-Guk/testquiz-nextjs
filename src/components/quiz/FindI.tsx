import { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../../context/AppContext';

interface propsTypes {
	setQuizBoxState: React.Dispatch<React.SetStateAction<boolean>>;
	setFindIState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FindI(props: propsTypes) {
	// QuizContext
	const { quiz } = useContext(QuizContext);

	// Background colors
	const successColor = 'hsl(145, 100%, 20%)';
	// Background success image
	const successImage = "url('images/confetti.gif')";

	// Background Color state
	const [backgroundColor, setBackgroundColor] = useState('white');

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

	// FindI game states
	const [nextButtonState, setNextButtonState] = useState(false);

	function foundI() {
		setNextButtonState(true);
		setBackgroundColor(successColor);
		setBackgroundImage(successImage);
		victorySound.play();
	}

	async function finishedGame() {
		await quiz.submitChoice('Find the letter i to proceed to the next level');
		props.setQuizBoxState(true);
		props.setFindIState(false);
	}

	return (
		<div className="text-center">
			<h1>
				Find the letter <span onClick={() => foundI()}>i</span>
			</h1>
			{nextButtonState ? (
				<button
					id="next-button"
					onClick={() => finishedGame()}
					className="font-weight-bold btn border border-dark rounded mx-auto py-2 px-4"
				>
					Next
				</button>
			) : null}
		</div>
	);
}
