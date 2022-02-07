import { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../../context/AppContext';

interface propsTypes {
	setQuizBoxState: React.Dispatch<React.SetStateAction<boolean>>;
	setEvilCowsState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EvilCows(props: propsTypes) {
	// QuizContext
	const { quiz } = useContext(QuizContext);

	// Background State
	const [backgroundImage, setBackgroundImage] = useState(
		"url('images/evil-cow.png')"
	);

	// Render Background image on background state change
	useEffect(() => {
		document.body.style.backgroundImage = backgroundImage;
	}, [backgroundImage]);

	async function finishedGame() {
		await quiz.submitChoice('Continue?');
		props.setQuizBoxState(true);
		props.setEvilCowsState(false);
	}

	return (
		<>
			<header className="text-center">
				<h1 style={{ color: 'red' }}>Oh no! There are evil cows everywhere?</h1>
			</header>

			<div className="text-center">
				<button onClick={() => finishedGame()}>Continue?</button>
			</div>
		</>
	);
}
