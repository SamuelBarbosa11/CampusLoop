import { useEffect, useRef, useState } from "react";

import type { ReactNode } from "react";

import Toast from "../components/Smalls/Toast";

import { ToastContext, type ToastState } from "./ToastContext";

import { registerToasts } from "../services/toast.service";

interface Props {
	children: ReactNode;
}

const initialState: ToastState = {
	message: "",
	type: "success",
	visible: false,
};

export default function ToastProvider({ children }: Props) {
	const [state, setState] = useState(initialState);

	const timeoutRef = useRef<number>(0);

	function show(type: ToastState["type"], message: string) {
		clearTimeout(timeoutRef.current);

		setState({
			type,
			message,
			visible: true,
		});

		timeoutRef.current = window.setTimeout(() => {
			hide();
		}, 5000);
	}

	function hide() {
		clearTimeout(timeoutRef.current);
		
		setState((prev) => ({
			...prev,
			visible: false,
		}));
	}

	useEffect(() => {
		return () => clearTimeout(timeoutRef.current);
	}, []);

	useEffect(() => {
		registerToasts({
			success: (message) => show("success", message),

			error: (message) => show("error", message),

			info: (message) => show("info", message),
		});
	}, []);

	return (
		<ToastContext.Provider
			value={{
				state,

				success: (message) => show("success", message),

				error: (message) => show("error", message),

				info: (message) => show("info", message),

				hide,
			}}
		>
			{children}

			<Toast {...state} />
		</ToastContext.Provider>
	);
}
