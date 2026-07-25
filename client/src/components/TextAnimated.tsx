import { useEffect, useState } from "react";

import clsx from "clsx";

import Text, { type TextProps } from "./Text";

interface TextAnimatedProps extends TextProps {
	text: string;
	delay?: number;
}

export default function TextAnimated({
	text,
	delay = 0,
	...props
}: TextAnimatedProps) {
	const words = text.split(" ");

	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(false);

		const frame = requestAnimationFrame(() => {
			requestAnimationFrame(() => setVisible(true));
		});

		return () => cancelAnimationFrame(frame);
	}, [text]);

	const { style, className, ...rest } = props;

	return (
		<>
			{words.map((word, index) => (
				<Text
					key={index}
					className={clsx("word", visible && "visible", className)}
					style={{
						...style,
						transitionDelay: `${delay + index * 80}ms`,
					}}
					{...rest}
				>
					{word}&nbsp;
				</Text>
			))}
		</>
	);
}
