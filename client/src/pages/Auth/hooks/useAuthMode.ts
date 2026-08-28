import { useState } from "react";

import { useAuth } from "../../../hooks/useAuth";

import type { AuthMode } from "../types";

export function useAuthMode() {
	const [mode, setMode] = useState<AuthMode>(() => {
		const params = new URLSearchParams(window.location.search);

		return (params.get("mode") as AuthMode) ?? "login";
	});

	const { isRecoveringPassword } = useAuth();

	function changeMode(mode: AuthMode) {
		setMode(mode);

		const params = new URLSearchParams(window.location.search);

		if (mode === "login") {
			params.delete("mode");
		} else {
			params.set("mode", mode);
		}

		const query = params.toString();

		window.history.replaceState(
			{},
			"",
			query ? `${window.location.pathname}?${query}` : window.location.pathname
		);
	}

	return {
		mode: isRecoveringPassword ? "reset" : mode,
		setMode: changeMode,
	};
}
