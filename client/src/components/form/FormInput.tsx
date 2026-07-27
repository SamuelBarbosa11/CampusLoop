import { useState } from "react";
import clsx from "clsx";

import { GrFormView, GrFormViewHide } from "react-icons/gr";

import type { InputHTMLAttributes } from "react";

import Text from "../text/Text";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	placeholder?: string;
	viewEye?: boolean;
	className?: string;
	type?: string;
	invalid?: boolean;
}

export default function FormInput({
	label,
	placeholder,
	viewEye = false,
	className,
	type = "text",
	invalid,
	...props
}: FormInputProps) {
	const [showPassword, setShowPassword] = useState(false);

	const inputType =
		viewEye && type === "password"
			? showPassword
				? "text"
				: "password"
			: type;

	return (
		<div className="flex flex-col min-w-0 w-full gap-2">
			<div
				className={clsx(
					"relative w-full min-w-0 flex flex-col rounded-xl border border-(--shark) bg-(--woodsmoke-secondary) px-4 py-3 focus-within:border-(--mauve) transition-colors duration-300",
					invalid && "border-red-500",
					className
				)}
			>
				<Text
					as="label"
					variant="label"
					className="text-sm tracking-wider text-(--secondary)"
				>
					{label}
				</Text>

				<input
					{...props}
					type={inputType}
					placeholder={placeholder}
					className="outline-none"
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
		</div>
	);
}
