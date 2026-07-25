type ToastFunction = (message: string) => void;

let successFn: ToastFunction | null = null;
let errorFn: ToastFunction | null = null;
let infoFn: ToastFunction | null = null;

export function registerToasts(toasts: {
	success: ToastFunction;
	error: ToastFunction;
	info: ToastFunction;
}) {
	successFn = toasts.success;
	errorFn = toasts.error;
	infoFn = toasts.info;
}

export function showSuccess(message: string) {
	successFn?.(message);
}

export function showError(message: string) {
	errorFn?.(message);
}

export function showInfo(message: string) {
	infoFn?.(message);
}