import clsx from "clsx";

import Text from "../Text";

import { IoSearch } from "react-icons/io5";

type SearchBarProps = {
	value: string;
	onChange(value: string): void;
	className?: string;
};

export default function SearchBar({
	className,
	value,
	onChange,
}: SearchBarProps) {
	return (
		<div
			className={clsx(
				[
					"flex justify-start items-center rounded-2xl border border-(--shark) gap-2 px-3 py-4 mb-4",
				],
				className
			)}
		>
			<IoSearch color="var(--secondary)" />
			<Text
				as="input"
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Digite aqui uma coisa..."
				variant="heading"
				className="w-full"
			></Text>
		</div>
	);
}
