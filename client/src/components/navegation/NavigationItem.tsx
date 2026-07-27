import type { IconType } from "react-icons";
import clsx from "clsx";

import Text from "../text/Text";

import { useNavigate } from "react-router";

type NavigationItemIconProps =
	| {
			icon: IconType;
			image?: never;
	  }
	| {
			icon?: never;
			image: string;
	  };

type NavigationItemProps = NavigationItemIconProps & {
	label?: string;
	tag?: string;

	size?: number | string;

	className?: string;
};

export default function NavigationItem(
	props: NavigationItemProps
) {
	const navigate = useNavigate();

	const { label = "", tag = "", size = "1rem", className = "" } = props;

	const iconSize = typeof size === "number" ? `${size}px` : size;

	const path = tag ? `/${tag}` : "/";

	const active = location.pathname === path;
	const iconColor = active ? "var(--dark-purple)" : "white";

	let content;

	if (props.icon) {
		const Icon = props.icon;
		content = (
			<div className="bg-clip-content bg-transparent">
				<Icon size={iconSize} color={iconColor} />
			</div>
		);
	} else {
		content = (
			<img
				src={props.image}
				alt=""
				style={{
					width: iconSize,
					height: iconSize,
					objectFit: "contain",
					borderRadius: "50%",
				}}
			/>
		);
	}

	return (
		<Text
			as="button"
			variant="button"
			className={clsx(
				[
					"text-(--secondary) flex flex-col justify-center items-center uppercase font-bold font-(family-name:--font-geist) focus:outline-none cursor-pointer gap-2",
				],
				className
			)}
			onClick={() => navigate(`/${tag}`)}
		>
			{content}
			{label}
		</Text>
	);
}
