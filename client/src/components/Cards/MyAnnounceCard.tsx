import Text from "../Text";

import { FaRegTrashAlt } from "react-icons/fa";

import { useIsDesktop } from "../../hooks/useIsDesktop";
import { formatRelativeTime } from "../../utils/formatRelativeTime";

import type { Announce } from "../../types/announce.types";

export type Category =
	| "Livros"
	| "Engenharia"
	| "Computação"
	| "Jalecos"
	| "Móveis"
	| "Eletrônicos";

interface MyAnnounceCardProps {
	item: Announce;
	onlyView?: boolean;
	onDelete?: (announce: Announce) => void;
}

export default function MyAnnounceCard({
	item,
	onlyView = false,
	onDelete,
}: MyAnnounceCardProps) {
	const isDesktop = useIsDesktop();

	return (
		<figure className="group w-[calc(100vw-2rem)] md:w-[calc(100vw-4rem)] min-h-36 flex gap-2 md:gap-4 shrink-0 bg-(--woodsmoke) rounded-3xl border border-(--shark) cursor-default transition duration-200 hover:border-(--dark-purple)">
			{item.image_url ? (
				<img
					src={item.image_url}
					alt={item.title}
					className="aspect-square w-32 min-h-36 md:w-72 md:h-72 rounded-l-3xl object-cover"
				/>
			) : (
				<div className="aspect-square w-full md:w-72 md:h-72 rounded-t-3xl bg-(--shark) animate-pulse"></div>
			)}

			<figcaption className="relative flex w-full py-2 pr-2 md:py-6 md:pr-4">
				<div className="flex flex-col justify-between">
					<div className="flex flex-col justify-between gap-2">
						<Text
							variant="card_title"
							className="flex-1 line-clamp-2 transition duration-200 group-hover:text-(--mauve) pr-18 mb-1 md:mb-6"
						>
							{item.title}
						</Text>

						<Text
							variant="card_description"
							className="text-(--secondary) line-clamp-2"
						>
							{item.description}
						</Text>
					</div>

					<Text variant="card_category" className="text-(--secondary)">
						{item.category}
					</Text>
				</div>

				<div id="value" className="absolute right-2 top-2 md:top-4">
					{item.donation ? (
						<div className="max-w-max flex justify-end items-center shrink-0 rounded-full bg-(--mauve-10) border border-(--mauve)/20 px-2 py-1">
							<Text
								variant="label"
								className="text-(--mauve) font-bold uppercase"
							>
								Doação
							</Text>
						</div>
					) : (
						<Text variant="card_title" className="text-(--mauve) text-end">
							{`R$ ${item.price}`}
						</Text>
					)}
				</div>

				<div className="absolute bottom-2 right-2 md:bottom-4 flex justify-center items-center gap-3">
					{isDesktop && (
						<Text variant="card_description" className="text-(--secondary)">
							criado há {formatRelativeTime(item.created_at)}
						</Text>
					)}

					{!onlyView && (
						<Text
							id="trash"
							as="button"
							type="button"
							variant="heading"
							className="flex justify-center items-center border border-(--shark) text-(--secondary) rounded-2xl p-2 gap-2 cursor-pointer"
							onClick={() => onDelete?.(item)}
						>
							<FaRegTrashAlt color="var(--secondary)" />
							Excluir
						</Text>
					)}
				</div>
			</figcaption>
		</figure>
	);
}
