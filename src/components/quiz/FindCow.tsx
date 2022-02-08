import { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../../context/QuizContext';

interface propsTypes {
	setQuizBoxState: React.Dispatch<React.SetStateAction<boolean>>;
	setFindCowState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FindCow(props: propsTypes) {
	// QuizContext
	const { quiz } = useContext(QuizContext);

	// Background State
	const [backgroundImage, setBackgroundImage] = useState(
		"url('images/cow.png')"
	);

	// Render Background image on background state change
	useEffect(() => {
		document.body.style.backgroundImage = backgroundImage;
	}, [backgroundImage]);

	// Audio
	const [cowSound, setCowSound] = useState<any>(null);
	useEffect(() => {
		setCowSound(new Audio('audio/cow-sound.ogg'));
	}, []);

	// FindCow game states
	const [foundCowState, setFoundCowState] = useState(false);

	async function foundCow() {
		cowSound.play();
		setFoundCowState(true);
	}

	async function finishedGame() {
		await quiz.submitChoice('Find the cow to proceed to the next level');
		props.setQuizBoxState(true);
		props.setFindCowState(false);
	}

	return (
		<>
			<header className="text-center">
				<h1 style={{ color: 'red' }}>Find the Cow</h1>
			</header>

			<div className="d-inline-block" onClick={() => foundCow()}>
				<img src="images/cow.png" alt="Cow" />
			</div>

			{foundCowState ? (
				<div className="text-center h1">
					<button onClick={() => finishedGame()}>Continue</button>
				</div>
			) : null}
		</>
	);
}
