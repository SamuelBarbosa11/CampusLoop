import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import clsx from "clsx";

import Text from "./Text";

import { useNavigate } from "react-router";

type NavLinkIconProps =
	| {
			icon: IconType;
			image?: never;
	  }
	| {
			icon?: never;
			image: string;
	  };

type NavLinkProps = NavLinkIconProps & {
	label?: string;
	tag?: string;

	size?: number | string;
	color?: CSSProperties["color"];

	className?: string;
};

export default function NavLink(props: NavLinkProps) {
	const navigate = useNavigate();

	const {
		label = "",
		tag = "",
		size = "1rem",
		color = "white",
		className = "",
	} = props;

	const iconSize = typeof size === "number" ? `${size}px` : size;

	let content;

	if (props.icon) {
		const Icon = props.icon;
		content = (
			<div className="bg-clip-content bg-transparent">
				<Icon size={iconSize} color={color} />
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
					"text-(--manatee) flex flex-col justify-center items-center gap-2 uppercase font-bold font-(family-name:--font-geist) no-focus-outline",
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
