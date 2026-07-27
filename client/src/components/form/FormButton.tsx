import clsx from "clsx";
import type { CSSProperties } from "react";

import type { ButtonHTMLAttributes } from "react";

import Text from "../text/Text";
import Spinner from "../smalls/Spinner";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	color?: CSSProperties["color"];
	backgroundColor?: CSSProperties["backgroundColor"];
}

export default function FormButton({
	loading,
	color = "var(--tertiary)",
	backgroundColor = "white",
	children,
	className,
	...props
}: FormButtonProps) {
	return (
		<Text
			as="button"
			variant="button"
			{...props}
			disabled={loading || props.disabled}
			className={clsx(
				"rounded-xl font-semibold transition duration-300 px-4 py-3 cursor-pointer hover:scale-102 disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			style={{ backgroundColor, color }}
		>
			{loading ? <Spinner /> : children}
		</Text>
	);
}
