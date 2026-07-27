import type { User } from "@supabase/supabase-js";

import type { Profile } from "./profile.types";

export type AuthMode = "login" | "register" | "forgot" | "reset";

export interface LoginDTO {
	email: string;
	password: string;
}

export interface RegisterDTO {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface ForgotPasswordDTO {
	email: string;
}

export interface ResetPasswordDTO {
	password: string;
	confirmPassword: string;
}

export interface AuthContextData {
	user: User | null;
	profile: Profile | null;
	isAuthenticated: boolean;
	isRecoveringPassword: boolean;
	finishPasswordRecovery: () => void;
	loading: boolean;
	login(data: LoginDTO): Promise<void>;
	register(data: RegisterDTO): Promise<void>;
	logout(): Promise<void>;
	forgotPassword(data: ForgotPasswordDTO): Promise<void>;
	resetPassword(data: ResetPasswordDTO): Promise<void>;
	refreshProfile: () => Promise<void>;
}
