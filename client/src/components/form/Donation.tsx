import Filter from "../search/Filter";

interface DonationProps {
	selected: boolean;
	onSelect: () => void;
	className?: string;
}

export default function Donation(props: DonationProps) {
	return (
		<Filter
			label="Doação"
			selected={props.selected}
			onSelect={props.onSelect}
			className={props.className}
		/>
	);
}
