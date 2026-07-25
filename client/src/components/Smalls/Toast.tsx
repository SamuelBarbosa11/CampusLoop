import clsx from "clsx";

import Text from "../Text";

import {
	FaCheckCircle,
	FaExclamationCircle,
	FaInfoCircle,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import type { ToastType } from "../../context/ToastContext";

import { useToast } from "../../hooks/useToast";

interface ToastProps {
	message: string;
	type: ToastType;
	visible: boolean;
}

export default function Toast({ message, type, visible }: ToastProps) {
	const { hide } = useToast();

	const icons = {
		success: <FaCheckCircle />,
		error: <FaExclamationCircle />,
		info: <FaInfoCircle />,
	};

	const colors = {
		success: "bg-green-600",
		error: "bg-red-400",
		info: "bg-blue-600",
	};

	return (
		<div
			className={clsx(
				"fixed left-1/2 top-6 z-50",
				"-translate-x-1/2",
				"transition-all duration-300",
				visible
					? "translate-y-0 opacity-100"
					: "-translate-y-24 opacity-0 pointer-events-none"
			)}
		>
			<div
				className={clsx(
					"flex items-center gap-3",
					"rounded-2xl px-5 py-4 shadow-lg",
					"text-white",
					colors[type]
				)}
			>
				<div className="text-xl">{icons[type]}</div>

				<Text variant="button">{message}</Text>

				<button
					type="button"
					onClick={hide}
					className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
					aria-label="Fechar notificação"
				>
					<IoClose size="1.5rem" />
				</button>
			</div>
		</div>
	);
}
