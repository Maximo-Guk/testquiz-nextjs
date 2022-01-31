import Head from 'next/head';
import React from 'react';
import QuizBox from '../components/quiz/QuizBox';
import AppProvider from '../context/AppContext';
export default function Quiz() {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Anthony's Ultimate Quiz</title>
				<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
				<link rel="stylesheet" href="css/quiz.css" />
				<link rel="stylesheet" href="css/snake.css" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=VT323"
				/>
			</Head>
			<AppProvider>
				<QuizBox />
			</AppProvider>
		</>
	);
}
