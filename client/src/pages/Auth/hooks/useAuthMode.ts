import { useEffect, useState } from "react";

import { useAuth } from "../../../hooks/useAuth";

import type { AuthMode } from "../types";

export function useAuthMode() {
	const [mode, setMode] = useState<AuthMode>(() => {
		const params = new URLSearchParams(window.location.search);

		return (params.get("mode") as AuthMode) ?? "login";
	});

	function changeMode(mode: AuthMode) {
		setMode(mode);

		const params = new URLSearchParams(window.location.search);

		if (mode === "login") {
			params.delete("mode");
		} else {
			params.set("mode", mode);
		}

		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?${params}`
		);
	}

	const { isRecoveringPassword } = useAuth();

	useEffect(() => {
		if (isRecoveringPassword) {
			changeMode("reset");
		}
	}, [isRecoveringPassword]);

	return {
		mode,
		setMode: changeMode,
	};
}
