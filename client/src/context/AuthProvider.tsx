import { useEffect, useEffectEvent, useState, type ReactNode } from "react";

import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

import { supabase } from "../api/supabase";

import { AuthContext } from "./AuthContext";

import type {
	LoginDTO,
	RegisterDTO,
	ForgotPasswordDTO,
	ResetPasswordDTO,
} from "../types/auth.types";
import type { Profile } from "../types/profile.types";

import * as authService from "../services/auth.service";
import { toast } from "../services/toast";

import { getAuthErrorMessage } from "../utils/auth.errors";
interface AuthProviderProps {
	children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const [profile, setProfile] = useState<Profile | null>(null);

	const [loading, setLoading] = useState(true);
	const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);

	const handleAuthStateChange = useEffectEvent(
		(event: AuthChangeEvent, session: Session | null) => {
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

				case "SIGNED_IN":
					// Apenas um login normal limpa o estado.
					if (!isRecoveringPassword) {
						setIsRecoveringPassword(false);
					}
					break;
			}
		}
	);

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
		} = supabase.auth.onAuthStateChange(handleAuthStateChange);

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	async function handleAuthAction<T>(action: () => Promise<T>): Promise<T> {
		try {
			return await action();
		} catch (error) {
			toast.error(getAuthErrorMessage(error));

			throw error;
		}
	}

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

	const login = (data: LoginDTO) =>
		handleAuthAction(() => authService.login(data));

	const register = (data: RegisterDTO) =>
		handleAuthAction(() => authService.register(data));

	const logout = () => handleAuthAction(() => authService.logout());

	const forgotPassword = (data: ForgotPasswordDTO) =>
		handleAuthAction(() => authService.forgotPassword(data));

	const resetPassword = (data: ResetPasswordDTO) =>
		handleAuthAction(() => authService.resetPassword(data));

	function finishPasswordRecovery() {
		setIsRecoveringPassword(false);
	}

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
		finishPasswordRecovery,
		refreshProfile,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
