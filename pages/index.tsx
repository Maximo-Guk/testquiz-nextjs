import Head from "next/head";
import React, { useState } from "react";
import QuizBox from "../components/quiz/QuizBox";
import SnakeGame from "../components/snakeGame/SnakeGame";
import { AppProvider } from "../context/AppContext";
export default function Quiz() {
	const [quizBox, setQuizBox] = useState(false);
	const [snakeGame, setSnakeGame] = useState(true);
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Anthony's Ultimate Quiz</title>
				<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
				<link
					rel="stylesheet"
					href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
					integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
					crossOrigin="anonymous"
				/>
				<link rel="stylesheet" href="css/quiz.css" />
				<link rel="stylesheet" href="css/snake.css" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=VT323" />
				{/* Cloudflare Web Analytics */}
				{/*<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "db93db13f3c64b56afc491d1ce02ead0"}'></script>*/}
				{/* End Cloudflare Web Analytics */}
			</Head>
			<AppProvider>
				{quizBox ? (
					<QuizBox
						quizBox={quizBox}
						setQuizBox={setQuizBox}
						setSnakeGame={setSnakeGame}
					></QuizBox>
				) : snakeGame ? (
					<SnakeGame
						snakeGame={snakeGame}
						setQuizBox={setQuizBox}
						setSnakeGame={setSnakeGame}
					></SnakeGame>
				) : null}
			</AppProvider>
		</>
	);
}
