import Text from "./Text";

interface FilterProps {
	label: string;
	selected: boolean;
	onSelect: () => void;
}

export default function Filter({ label, selected, onSelect }: FilterProps) {
	return (
		<div className="relative max-h-max rounded-xl transition duration-300 bg-(--woodsmoke) border border-(--shark) has-checked:bg-(--button-bg) has-checked:border-(--button-bg) px-4 py-2">
			<input
				type="radio"
				id={label}
				name="category"
				value={label}
				className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer"
				checked={selected}
				onChange={onSelect}
			/>

			<Text
				as="label"
				variant="label"
				className="text-(--secondary) peer-checked:text-(--tertiary) font-semibold"
			>
				{label}
			</Text>
		</div>
	);
}
