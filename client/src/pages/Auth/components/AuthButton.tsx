import clsx from "clsx";
import type { CSSProperties } from "react";

import type { ButtonHTMLAttributes } from "react";

import Text from "../../../components/Text";
import Spinner from "../../../components/Spinner";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	backgroundColor?: CSSProperties["backgroundColor"];
}

export default function AuthButton({
	loading,
	backgroundColor = "white",
	children,
	className,
	...props
}: AuthButtonProps) {
	return (
		<Text
			as="button"
			variant="button"
			{...props}
			disabled={loading || props.disabled}
			className={clsx(
				"rounded-xl font-semibold text-(--tertiary) transition duration-300 px-4 py-3 hover:scale-102 disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			style={{ backgroundColor }}
		>
			{loading ? <Spinner /> : children}
		</Text>
	);
}
