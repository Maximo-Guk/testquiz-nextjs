import type quizQuestion from '../types/quizQuestion';
import type User from '../types/User';

// Fetch GET Implementation
async function getData(endpoint: string) {
	// API Endpoint
	const url = 'https://maximoguk.com/api/quiz/v2' + endpoint;
	const response = await fetch(url, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'omit',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		redirect: 'error',
		referrerPolicy: 'strict-origin',
	});
	// 2xx
	if (response.ok) {
		return response.json();
	} else {
		throw await response.text();
	}
}

// get new user
export async function getNewUser(): Promise<User> {
	return await await getData('');
}

// get user by uuid, returning quiz questions for user
export async function getQuizQuestion(uuid: string): Promise<quizQuestion> {
	return await await getData('/' + uuid);
}
