import { useEffect, useRef, useState } from "react";

import type { ReactNode } from "react";

import Toast from "../components/smalls/Toast";

import {
	ToastContext,
	type ToastOptions,
	type ToastState,
} from "./ToastContext";

import { registerToasts } from "../services/toast";

interface Props {
	children: ReactNode;
}

export default function ToastProvider({ children }: Props) {
	const [toasts, setToasts] = useState<ToastState[]>([]);

	const timeouts = useRef(new Map<string, number>());
	const removeTimeouts = useRef(new Map<string, number>());

	function show(options: ToastOptions) {
		const newId = crypto.randomUUID();

		const newToast: ToastState = {
			id: newId,
			type: options.type,
			message: options.message,
			visible: true,
		};

		setToasts((previous) => [newToast, ...previous]);

		const duration = options.duration ?? 5000;

		if (duration > 0) {
			const timeout = window.setTimeout(() => {
				hide(newId);
			}, duration);

			timeouts.current.set(newId, timeout);
		}

		return newId;
	}

	function hide(id: string) {
		// impede chamar hide duas vezes
		if (removeTimeouts.current.has(id)) {
			return;
		}

		const timeout = timeouts.current.get(id);

		if (timeout) {
			clearTimeout(timeout);
			timeouts.current.delete(id);
		}

		setToasts((previous) =>
			previous.map((toast) =>
				toast.id === id ? { ...toast, visible: false } : toast
			)
		);

		const removeTimeout = window.setTimeout(() => {
			setToasts((previous) => previous.filter((t) => t.id !== id));

			removeTimeouts.current.delete(id);
		}, 300);

		removeTimeouts.current.set(id, removeTimeout);
	}

	useEffect(() => {
		return () => {
			timeouts.current.forEach(clearTimeout);
			removeTimeouts.current.forEach(clearTimeout);

			timeouts.current.clear();
			removeTimeouts.current.clear();
		};
	}, []);

	useEffect(() => {
		registerToasts({
			show,
			hide,
		});
	}, []);

	return (
		<ToastContext.Provider
			value={{
				toasts,
				show,
				hide,
			}}
		>
			{children}

			<div className="fixed top-6 left-1/2 -translate-x-1/2  z-50 flex flex-col gap-3">
				{toasts.map((toast) => (
					<Toast key={toast.id} {...toast} />
				))}
			</div>
		</ToastContext.Provider>
	);
}
