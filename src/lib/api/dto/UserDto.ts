import type { User } from '../models/User';

export class UserDto implements User {
	username: string;
	displayName: string;
	bio: string;
	email: string;
	roles: { name: string }[];
	avatar: string;

	constructor(user: User) {
		this.username = user.username;
		this.displayName = user.displayName;
		this.bio = user.bio;
		this.email = user.email;
		this.roles = user.roles;
		this.avatar = user.avatar;
	}

	static toJSON(user: UserDto) {
		return { ...user };
	}
}
