import type { CSSProperties } from "react";
import clsx from "clsx";

interface SpinnerProps {
	size?: number | string;
	color?: CSSProperties["color"];
	className?: string;
}

export default function Spinner({
	size = "1.25rem",
	color = "var(--secondary)",
	className,
}: SpinnerProps) {
	const spinnerSize = typeof size === "number" ? `${size}px` : size;

	return (
		<div
			className={clsx(
				"inline-block rounded-full border-3 border-current border-t-transparent animate-spin",
				className
			)}
			style={{
				width: spinnerSize,
				height: spinnerSize,
				color: color,
			}}
			aria-label="Carregando"
			role="status"
		/>
	);
}
