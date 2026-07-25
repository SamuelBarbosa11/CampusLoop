import clsx from "clsx";

import Text from "../text/Text";
import { CgProfile } from "react-icons/cg";

import type { Announce } from "../../types/announce.types";

import { formatRelativeTime } from "../../utils/formatRelativeTime";
import { useNavigate } from "react-router";

export type Category =
	| "Livros"
	| "Engenharia"
	| "Computação"
	| "Jalecos"
	| "Móveis"
	| "Eletrônicos"
	| "Acessórios";

interface CardProps {
	item: Announce;
	className?: string;
	clickable?: boolean;
	keepStyle?: boolean;
}

export default function Card({
	item,
	className,
	clickable,
	keepStyle,
}: CardProps) {
	const navigate = useNavigate();

	function handleClick() {
		if (!clickable) return;

		navigate(`/profile/${item.user.id}`);
	}

	return (
		<figure
			onClick={handleClick}
			className={clsx(
				"shrink-0 bg-(--woodsmoke) rounded-3xl",
				keepStyle
					? "w-72 min-h-112 border border-(--shark)"
					: "w-full md:w-72 md:min-h-112 md:border md:border-(--shark)",
				clickable &&
					"group transition duration-200 hover:border-(--dark-purple) md:hover:z-1 md:hover:scale-105 md:hover:animate-[bouncing_3s_ease-in-out_infinite]",
				className
			)}
		>
			{item.image_url ? (
				<img
					src={item.image_url}
					alt={item.title}
					className={clsx(
						"aspect-square rounded-t-3xl object-cover ",
						keepStyle ? "w-72 max-h-72" : "w-full md:w-72 md:max-h-72"
					)}
				/>
			) : (
				<div className="aspect-square w-full md:w-72 md:max-h-72 rounded-t-3xl bg-(--shark) animate-pulse"></div>
			)}

			<figcaption
				className={clsx("py-5", keepStyle ? "px-3" : "md:px-5")}
			>
				<div className="w-full flex items-start gap-3">
					<Text
						variant="card_title"
						className={clsx(
							"min-w-0 flex-1 line-clamp-2 transition duration-200",
							clickable && "group-hover:text-(--mauve)"
						)}
					>
						{item.title}
					</Text>

					<div className="shrink-0">
						{item.donation ? (
							<div className="flex justify-center items-center rounded-full bg-(--mauve-10) border border-(--mauve)/20 px-2 py-1">
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
				</div>

				<Text
					variant="card_description"
					className="text-(--secondary) line-clamp-2 mt-2"
				>
					{item.description}
				</Text>

				<div className="flex flex-start items-center gap-2 mt-3">
					{item.user.photo_url ? (
						<img
							src={item.user.photo_url}
							alt=""
							className="aspect-square w-8 rounded-full object-cover"
						/>
					) : (
						<CgProfile color="var(--secondary)" className="w-6 h-6" />
					)}

					<Text variant="card_description" className="text-(--secondary)">
						{item.user.name}
					</Text>

					{item.created_at && (
						<Text variant="label" className="text-(--secondary)">
							{" "}
							• há {formatRelativeTime(item.created_at)}
						</Text>
					)}
				</div>
			</figcaption>
		</figure>
	);
}
