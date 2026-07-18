import Text from "./Text";
import type { NewsCard } from "../moks/moks_news";

interface CardProps {
	item: NewsCard;
}

export default function Card({ item }: CardProps) {
	return (
		<figure className="group shrink-0 w-full md:w-72 md:min-h-112 bg-(--woodsmoke) rounded-3xl md:border md:border-(--shark) cursor-pointer transition duration-200 hover:border-(--dark-purple) md:hover:z-1 md:group-hover:scale-105 md:hover:animate-[bouncing_3s_ease-in-out_infinite]">
			<img
				src={item.image}
				alt={item.title}
				className="aspect-square w-full md:w-72 md:max-h-72 rounded-t-3xl object-cover"
			/>

			<figcaption className="py-5 md:px-5">
				<div className="flex items-start gap-3">
					<Text
						variant="card_title"
						className="min-w-0 flex-1 line-clamp-2 transition duration-200 group-hover:text-(--mauve)"
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
					className="text-(--secondary) line-clamp-2"
				>
					{item.description}
				</Text>

				<div className="flex flex-start items-center gap-2 mt-3">
					{item.author.avatar ? (
						<img
							src={item.author.avatar}
							alt=""
							className="aspect-square w-8 rounded-full object-cover"
						/>
					) : (
						<div className="aspect-square w-8 rounded-full object-cover bg-(--shark) animate-pulse"></div>
					)}

					<Text variant="card_description" className="text-(--secondary)">
						{item.author.name}
					</Text>

					{item.created_at && (
						<Text variant="card_description" className="text-(--secondary)">
							{" "}
							• {item.created_at}
						</Text>
					)}
				</div>
			</figcaption>
		</figure>
	);
}
