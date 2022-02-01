import { getNewUser } from '../requests/BackendGetRequest';

export default class User {
	private uuid: string;

	private constructor(uuid: string) {
		this.uuid = uuid;
	}

	public static async newUser() {
		const response = await getNewUser();

		return new User(response.uuid);
	}

	public getUuid() {
		return this.uuid;
	}
}
