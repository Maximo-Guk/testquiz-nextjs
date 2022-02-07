import React, { useState } from 'react';
import Head from 'next/head';
import AppProvider from '../context/AppContext';
import QuizBox from '../components/quiz/QuizBox';
import Snake from '../components/snakeGame/Snake';
import FindCow from '../components/quiz/FindCow';
import FindI from '../components/quiz/FindI';
import EvilCows from '../components/quiz/EvilCows';
export default function Quiz() {
	const [quizBoxState, setQuizBoxState] = useState(true);
	const [snakeGameState, setSnakeGameState] = useState(false);
	const [findCowState, setFindCowState] = useState(false);
	const [findIState, setFindIState] = useState(false);
	const [evilCowsState, setEvilCowsState] = useState(false);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Anthony's Ultimate Quiz</title>
				<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=VT323"
				/>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap.min.css"
					integrity="sha512-GQGU0fMMi238uA+a/bdWJfpUGKUkBdgfFdgBm72SUQ6BeyWjoY/ton0tEjH+OSH9iP4Dfh+7HM0I9f5eR0L/4w=="
					crossOrigin="anonymous"
					referrerPolicy="no-referrer"
				/>
				<link rel="stylesheet" href="css/quiz.css" />
				<link rel="stylesheet" href="css/snake.css" />
				<link rel="preload" as="image" href="images/confetti.gif" />
			</Head>
			<AppProvider>
				{quizBoxState ? (
					<QuizBox
						setQuizBoxState={setQuizBoxState}
						setSnakeGameState={setSnakeGameState}
						setFindCowState={setFindCowState}
						setFindIState={setFindIState}
						setEvilCowsState={setEvilCowsState}
					/>
				) : snakeGameState ? (
					<Snake
						setQuizBoxState={setQuizBoxState}
						setSnakeGameState={setSnakeGameState}
					/>
				) : findCowState ? (
					<FindCow
						setQuizBoxState={setQuizBoxState}
						setFindCowState={setFindCowState}
					/>
				) : findIState ? (
					<FindI
						setQuizBoxState={setQuizBoxState}
						setFindIState={setFindIState}
					/>
				) : evilCowsState ? (
					<EvilCows
						setQuizBoxState={setQuizBoxState}
						setEvilCowsState={setEvilCowsState}
					/>
				) : null}
			</AppProvider>
		</>
	);
}
