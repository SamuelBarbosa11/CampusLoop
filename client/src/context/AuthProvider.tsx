import { useState, useEffect } from "react";

import type { ReactNode } from "react";

import type { User } from "@supabase/supabase-js";

import { supabase } from "../api/supabase";

import { AuthContext } from "./AuthContext";

import type {
	LoginDTO,
	RegisterDTO,
	ForgotPasswordDTO,
	ResetPasswordDTO,
} from "../types/auth.types";

import * as authService from "../services/auth.service";

import type { Profile } from "../types/profile.types";
interface AuthProviderProps {
	children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const [profile, setProfile] = useState<Profile | null>(null);

	const [loading, setLoading] = useState(true);
	const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);

	useEffect(() => {
		let mounted = true;

		async function loadSession() {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!mounted) return;

			setUser(session?.user ?? null);

			if (session?.user) {
				await loadProfile(session.user.id);
			} else {
				setProfile(null);
			}

			setLoading(false);
		}

		loadSession();

		return () => {
			mounted = false;
		};
	}, []);

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			setUser(session?.user ?? null);

			if (session?.user) {
				void loadProfile(session.user.id);
			} else {
				setProfile(null);
			}

			switch (event) {
				case "PASSWORD_RECOVERY":
					setIsRecoveringPassword(true);
					break;

				case "USER_UPDATED":
					setIsRecoveringPassword(false);
					break;

				case "SIGNED_OUT":
					setIsRecoveringPassword(false);
					break;

				case "SIGNED_IN":
					// Apenas um login normal limpa o estado.
					if (!isRecoveringPassword) {
						setIsRecoveringPassword(false);
					}
					break;
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [isRecoveringPassword]);

	async function loadProfile(userId: string) {
		const { data, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", userId)
			.single();

		if (error) {
			setProfile(null);
			return;
		}

		setProfile(data);
	}

	async function refreshProfile() {
		if (!user) return;

		await loadProfile(user.id);
	}

	const login = async (data: LoginDTO) => {
		await authService.login(data);
	};

	const register = async (data: RegisterDTO) => {
		await authService.register(data);
	};

	const logout = async () => {
		await authService.logout();
	};

	const forgotPassword = async (data: ForgotPasswordDTO) => {
		await authService.forgotPassword(data);
	};

	const resetPassword = async (data: ResetPasswordDTO) => {
		await authService.resetPassword(data);
	};

	const value = {
		user,
		profile,
		loading,
		isAuthenticated: user !== null,

		login,
		register,
		logout,
		forgotPassword,
		resetPassword,
		isRecoveringPassword,
		refreshProfile,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
