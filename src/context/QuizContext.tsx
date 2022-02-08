import React, { createContext, useState } from 'react';
import Quiz from '../classes/quiz/Quiz';

interface QuizContextTypes {
	quiz: Quiz;
	setQuiz: React.Dispatch<React.SetStateAction<Quiz>>;
}
interface QuizProviderTypes {
	children: React.ReactNode;
}

export const QuizContext = createContext({} as QuizContextTypes);

// Quiz provider wrapper contains logic for user class and quiz class
export default function QuizProvider({ children }: QuizProviderTypes) {
	const [quiz, setQuiz] = useState({} as Quiz);

	return (
		<QuizContext.Provider
			value={{
				quiz,
				setQuiz,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
}
