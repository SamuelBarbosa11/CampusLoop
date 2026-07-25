import { supabase } from "../api/supabase";

import type {
	LoginDTO,
	RegisterDTO,
	ForgotPasswordDTO,
	ResetPasswordDTO,
} from "../types/auth.types";

// Cadastro
export async function register({ name, email, password }: RegisterDTO) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				name,
			},
		},
	});

	if (error) throw error;

	if (!data.user) {
		throw new Error("Usuário não criado.");
	}

	const { error: profileError } = await supabase.from("profiles").insert({
		id: data.user.id,
		name,
	});

	if (profileError) throw profileError;
}

// Login
export async function login({ email, password }: LoginDTO) {
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw error;
}

// Logout
export async function logout() {
	const { error } = await supabase.auth.signOut();

	if (error) {
		throw new Error(error.message);
	}
}

// Forgot
export async function forgotPassword({ email }: ForgotPasswordDTO) {
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${window.location.origin}/auth`,
	});

	if (error) {
		throw new Error(error.message);
	}
}

// Reset
export async function resetPassword({ password }: ResetPasswordDTO) {
	const { error } = await supabase.auth.updateUser({
		password,
	});

	if (error) throw error;
}

// Usuário atual
export async function getCurrentUser() {
	const { data, error } = await supabase.auth.getUser();

	if (error) {
		throw new Error(error.message);
	}

	return data.user;
}
