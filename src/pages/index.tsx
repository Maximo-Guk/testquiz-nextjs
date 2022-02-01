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
			</Head>
			<AppProvider>
				<QuizBox />
			</AppProvider>
		</>
	);
}
