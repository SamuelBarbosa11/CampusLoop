import Text from "./Text";

import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
	return (
		<div className="flex justify-start items-center rounded-2xl border border-(--shark) gap-2 px-3 py-2">
			<IoSearch color="var(--secondary)" />
			<Text
				as="input"
				type="text"
				placeholder="Digite aqui uma coisa..."
				variant="heading"
				className="w-full"
			></Text>
		</div>
	);
}
