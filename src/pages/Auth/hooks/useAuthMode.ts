import { useEffect, useState } from "react";

import { supabase } from "../../../api/supabase";

import type { AuthMode } from "../types";

export function useAuthMode() {
	const [mode, setMode] = useState<AuthMode>("login");

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event) => {
			if (event === "PASSWORD_RECOVERY") {
				setMode("reset");
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return {
		mode,
		setMode,
	};
}
