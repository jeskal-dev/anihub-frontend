import type { RegisterSchema } from '../validations/authSchema';

export class RegisterDto {
	static cleanRegisterSchema(data: RegisterSchema) {
		const { email, password, username } = data;
		return { email, password, username };
	}
}
