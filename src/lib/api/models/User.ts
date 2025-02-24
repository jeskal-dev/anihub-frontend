export interface User {
	username: string;
	displayName: string;
	bio: string;
	email: string;
	roles: { name: string }[];
	avatar: string;
	// favorite: JikanMedia[];
	// watchlist: JikanMedia[];
}
