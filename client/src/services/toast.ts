import type { ToastOptions } from "../context/ToastContext";

type ShowToast = (options: ToastOptions) => string;
type HideToast = (id: string) => void;
type ToastId = string;

let showFn: ShowToast | null = null;
let hideFn: HideToast | null = null;

export function registerToasts(toasts: {
	show: (options: ToastOptions) => ToastId;
	hide: (id: ToastId) => void;
}) {
	showFn = toasts.show;
	hideFn = toasts.hide;
}

export const toast = {
	success(message: string) {
		return showFn?.({
			type: "success",
			message,
		});
	},

	error(message: string) {
		return showFn?.({
			type: "error",
			message,
		});
	},

	info(message: string) {
		return showFn?.({
			type: "info",
			message,
			duration: 7500,
		});
	},

	warning(message: string) {
		return showFn?.({
			type: "warning",
			message,
		});
	},

	loading(message?: string) {
		return showFn?.({
			type: "loading",
			message,
			duration: 0,
		});
	},

	hide(id: string) {
		hideFn?.(id);
	},
};
