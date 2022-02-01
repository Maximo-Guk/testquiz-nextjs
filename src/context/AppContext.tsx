import React, { createContext, useEffect, useState } from 'react';
import Quiz from '../classes/Quiz';

interface QuizContextTypes {
	loading: boolean;
	quiz: Quiz;
	setQuiz: React.Dispatch<React.SetStateAction<Quiz>>;
}
interface QuizProviderTypes {
	children: React.ReactNode;
}

export const QuizContext = createContext<QuizContextTypes>(
	{} as QuizContextTypes
);

// Quiz provider wrapper contains logic for user class and quiz class
export default function AuthProvider({ children }: QuizProviderTypes) {
	const [quiz, setQuiz] = useState<Quiz>({} as Quiz);
	const [loading, setLoading] = useState(true);

	// verify user's uuid on refresh of page
	// useEffect(() => {
	// 	if (user) {
	// 		setLoading(true);
	// 		verification();
	// 	}
	// }, []);

	// verify token by contacting verify endpoint on CF worker
	// proceed to then getUser with this decoded userName from token and then populate user with it's retrieved attributes
	async function verification() {
		try {
			quiz.getQuizQuestion();
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	}

	return (
		<QuizContext.Provider
			value={{
				loading,
				quiz,
				setQuiz,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
}
