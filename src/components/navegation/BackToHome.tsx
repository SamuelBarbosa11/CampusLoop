import clsx from "clsx";

import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";

type BackToHomeProps = {
	className?: string;
};

export default function BackToHome({ className }: BackToHomeProps) {
	const navigate = useNavigate();

	return (
		<button
			className={clsx(
				"rounded-2xl border-2 border-(--shark) p-3 cursor-pointer transition duration-300 hover:scale-105",
				className
			)}
			onClick={() => navigate("/")}
		>
			<IoMdArrowRoundBack size="1.5rem" color="var(--secondary)" />
		</button>
	);
}
