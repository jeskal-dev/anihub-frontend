import { http } from '../client';
import { RegisterDto } from '../dto/RegisterDto';
import { TokenDto } from '../dto/TokenDto';
import { UserDto } from '../dto/UserDto';
import { AUTH_ENDPOINTS } from '../endpoints';
import type { LoginSchema, RegisterSchema } from '../validations/authSchema';

export class Auth {
	static async login(body: LoginSchema) {
		const { data } = await http.post(AUTH_ENDPOINTS.LOGIN, body);
		return new TokenDto(data);
	}

	static async logout(token: string) {
		const { data } = await http.post(AUTH_ENDPOINTS.LOGOUT, { token });
		return data;
	}

	static async register(body: RegisterSchema) {
		const values = RegisterDto.cleanRegisterSchema(body);

		const { data } = await http.post(AUTH_ENDPOINTS.REGISTER, values);
		return data;
	}

	static async profile() {
		const { data } = await http.get(AUTH_ENDPOINTS.PROFILE);
		return UserDto.toJSON(new UserDto(data));
	}
}
