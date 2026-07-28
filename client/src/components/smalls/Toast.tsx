import clsx from "clsx";

import Text from "../text/Text";

import {
	FaCheckCircle,
	FaExclamationCircle,
	FaInfoCircle,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Spinner from "./Spinner";

import type { ToastType } from "../../context/ToastContext";

import { useToast } from "../../hooks/useToast";

interface ToastProps {
	id: string;
	type: ToastType;
	message?: string;
	visible: boolean;
}

export default function Toast({ id, type, message, visible }: ToastProps) {
	const { hide } = useToast();

	const icons = {
		success: <FaCheckCircle />,
		error: <FaExclamationCircle />,
		info: <FaInfoCircle />,
		warning: <FaInfoCircle />,
		loading: <Spinner />,
	};

	const colors = {
		success: "bg-green-600",
		error: "bg-red-400",
		info: "bg-blue-600",
		warning: "bg-yellow-600",
		loading: "bg-(--tertiary)",
	};

	return (
		<div
			className={clsx(
				"transition-all duration-300 z-200",
				visible
					? "translate-y-0 opacity-100"
					: "-translate-y-24 opacity-0 pointer-events-none"
			)}
		>
			<div
				className={clsx(
					"flex justify-center items-center w-[calc(100vw-5rem)] md:w-full gap-3",
					"rounded-2xl px-5 py-4 shadow-lg",
					"text-white",
					colors[type]
				)}
			>
				<div className="w-5 h-5">{icons[type]}</div>

				{message && <Text variant="button">{message}</Text>}

				{type !== "loading" && (
					<button
						type="button"
						onClick={() => hide(id)}
						className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
						aria-label="Fechar notificação"
					>
						<IoClose size="1.5rem" />
					</button>
				)}
			</div>
		</div>
	);
}
