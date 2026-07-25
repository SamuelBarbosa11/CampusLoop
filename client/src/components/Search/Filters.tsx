import type { SortOption } from "../../types/filter.types";

import Filter from "./Filter";
import SearchBar from "./SearchBar";

type SearchProps =
	| {
			search: string;
			onSearchChange(value: string): void;
	  }
	| {
			search?: undefined;
			onSearchChange?: undefined;
	  };

type DonationProps =
	| {
			donation: boolean;
			onDonationToggle: () => void;
	  }
	| {
			onDonationToggle?: undefined;
			donation?: undefined;
	  };

type SortProps =
	| {
			sorts: SortOption[];
			sort: string;
			onSortChange: (sort: string) => void;
	  }
	| {
			onSortChange?: undefined;
			sorts?: undefined;
			sort?: undefined;
	  };

interface BaseProps {
	categories: string[];

	category: string;
	onCategoryChange(category: string): void;
}

type FiltersProps = BaseProps & DonationProps & SortProps & SearchProps;

export default function Filters(props: FiltersProps) {
	return (
		<>
			{props.onSearchChange && (
				<SearchBar value={props.search} onChange={props.onSearchChange} />
			)}

			<div className="flex max-h-max gap-2">
				{props.onDonationToggle && (
					<>
						<Filter
							label="Doação"
							selected={props.donation}
							onSelect={props.onDonationToggle}
						/>

						<div className="bg-(--shark) w-px min-h-full"></div>
					</>
				)}

				<div className="flex gap-2 overflow-x-auto">
					{props.categories.map((categoryName) => (
						<Filter
							label={categoryName}
							selected={categoryName === props.category}
							onSelect={() => props.onCategoryChange(categoryName)}
						/>
					))}
				</div>
			</div>

			{props.onSortChange && (
				<div className="max-w-max flex overflow-x-auto gap-2 mt-2">
					{props.sorts.map((sort) => (
						<Filter
							key={sort.value}
							label={sort.label}
							selected={sort.value === props.sort}
							onSelect={() => {
								props.onSortChange(sort.value);
							}}
						/>
					))}
				</div>
			)}
		</>
	);
}
