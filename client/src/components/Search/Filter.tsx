import clsx from "clsx";
import Text from "../Text";

interface FilterProps {
	label: string;
	selected: boolean;
	onSelect: () => void;
	className?: string;
}

export default function Filter({
	label,
	selected,
	onSelect,
	className,
}: FilterProps) {
	return (
		<div
			className={clsx(
				"shrink-0 flex justify-center items-center rounded-xl border transition duration-300 px-4 py-3 cursor-pointer",
				selected
					? "bg-(--bg-button) border-(--bg-button)"
					: "bg-(--woodsmoke) border-(--shark)",
				className
			)}
			onClick={onSelect}
		>
			<Text
				variant="label"
				className={clsx(
					"font-semibold",
					selected ? "text-(--tertiary)" : "text-(--secondary)"
				)}
			>
				{label}
			</Text>
		</div>
	);
}
