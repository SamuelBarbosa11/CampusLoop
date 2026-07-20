import { useState } from "react";

import clsx from "clsx";

import { GrFormView, GrFormViewHide } from "react-icons/gr";

import type { InputHTMLAttributes } from "react";

import Text from "../../../components/Text";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;

	error?: string;

	viewEye?: boolean;
}

export default function AuthInput({
	label,
	error,
	viewEye = false,
	className,
	type,
	...props
}: AuthInputProps) {
	const [showPassword, setShowPassword] = useState(false);

	const inputType =
		viewEye && type === "password"
			? showPassword
				? "text"
				: "password"
			: type;

	return (
		<div className="flex flex-col gap-2">
			<Text
				as="label"
				variant="label"
				className="text-sm font-semibold uppercase text-(--secondary)"
			>
				{label}
			</Text>

			<div className="relative">
				<input
					{...props}
					type={inputType}
					className={clsx(
						"w-full rounded-xl border border-(--shark) bg-(--woodsmoke-secondary) px-4 py-3 pr-12 outline-none transition-colors duration-300",
						"focus:border-(--mauve)",
						error && "border-red-500",
						className
					)}
				/>

				{viewEye && type === "password" && (
					<button
						type="button"
						onClick={() => setShowPassword((previous) => !previous)}
						className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl text-(--secondary) transition-colors duration-200 hover:text-(--primary)"
					>
						{showPassword ? <GrFormViewHide /> : <GrFormView />}
					</button>
				)}
			</div>

			{error && <span className="text-sm text-red-500">{error}</span>}
		</div>
	);
}
