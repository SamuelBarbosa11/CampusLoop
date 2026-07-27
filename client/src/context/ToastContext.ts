import { createContext } from "react";

export type ToastType = "success" | "error" | "info" | "warning" | "loading";

export interface ToastState {
	id: string;
	type: ToastType;
	message?: string;
	visible: boolean;
}

export interface ToastOptions {
	type: ToastType;
	message?: string;
	duration?: number;
}

interface ToastContextData {
	toasts: ToastState[];
	show(toast: ToastOptions): string;
	hide(id: string): void;
}

export const ToastContext = createContext({} as ToastContextData);
