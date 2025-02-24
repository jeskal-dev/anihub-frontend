export class TokenDto {
	accessToken: string;
	refreshToken: string;
	expiresIn = 0.2;
	constructor(data: Record<string, string>) {
		this.accessToken = data.access_token;
		this.refreshToken = data.refresh_token;
	}

	static exportRefreshToken(token: string | null) {
		if (token == null) throw new Error('No token provided');

		return {
			refresh_token: token
		};
	}
	static exportAccessToken(token: string | null) {
		if (token == null) throw new Error('No token provided');
		return {
			access_token: token
		};
	}
}
