import type { CSSProperties } from "react";
import type { IconType } from "react-icons";

type BubbleIconProps =
	| {
			icon: IconType;
			image?: never;
	  }
	| {
			image: string;
			icon?: never;
	  };

type Props = BubbleIconProps & {
	size?: number | string;

	color?: CSSProperties["color"];
	backgroundColor?: CSSProperties["backgroundColor"];
	borderColor?: CSSProperties["borderColor"];
};

export default function BubbleIcon(props: Props) {
	const {
		size = "1rem",
		color = "white",
		backgroundColor = "grey",
		borderColor = "black",
	} = props;

	const iconSize = typeof size === "number" ? `${size}px` : size;

	let content;

	if (props.icon) {
		const Icon = props.icon;

		content = <Icon size={iconSize} color={color} />;
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
					border: "1px solid",
				}}
			/>
		);
	}

	return (
		<div
			style={{
				backgroundColor,
				border: `1px solid ${borderColor}`,
				borderRadius: "50%",
				width: `calc(${iconSize} + 1rem)`,
				height: `calc(${iconSize} + 1rem)`,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexShrink: 0,
			}}
		>
			{content}
		</div>
	);
}
