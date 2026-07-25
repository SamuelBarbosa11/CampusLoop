import { createContext } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastState {
	message: string;
	type: ToastType;
	visible: boolean;
}

interface ToastContextData {
	state: ToastState;

	success(message: string): void;
	error(message: string): void;
	info(message: string): void;

	hide(): void;
}

export const ToastContext = createContext({} as ToastContextData);
