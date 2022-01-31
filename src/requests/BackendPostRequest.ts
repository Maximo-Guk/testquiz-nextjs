import type quizAnswer from '../types/quizAnswer';

// Fetch POST Implementation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function postData(endpoint: string, data: any) {
	// API Endpoint
	const url = 'https://maximoguk.com/api/quiz' + endpoint;
	const response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'omit',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		redirect: 'error',
		referrerPolicy: 'strict-origin',
		body: JSON.stringify(data),
	});
	// 2xx
	if (response.ok) {
		return await response.json();
	} else {
		throw await response.text();
	}
}

// send user quiz response to server
export async function submitQuizResponse(
	uuid: string,
	choice: string
): Promise<quizAnswer> {
	return await postData('/' + uuid, { answer: choice });
}
