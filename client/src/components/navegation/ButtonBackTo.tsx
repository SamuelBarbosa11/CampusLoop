import { useNavigate } from "react-router";
import clsx from "clsx";

import { IoMdArrowRoundBack } from "react-icons/io";

type ButtonBackToProps = {
	className?: string;
	tag?: string;
};

export default function ButtonBackTo({ className, tag }: ButtonBackToProps) {
	const navigate = useNavigate();

	function back() {
		if (tag) {
			return navigate(`${tag}`);
		}
		return navigate(-1);
	}

	return (
		<button
			className={clsx(
				"rounded-2xl border-2 border-(--shark) p-3 cursor-pointer transition duration-300 hover:scale-105",
				className
			)}
			onClick={back}
		>
			<IoMdArrowRoundBack size="1.5rem" color="var(--secondary)" />
		</button>
	);
}
