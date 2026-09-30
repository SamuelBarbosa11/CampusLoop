import { useEffect, useState } from "react";

import clsx from "clsx";

import Text, { type TextProps } from "./Text";

interface TextAnimatedProps extends TextProps {
	text: string;
	delay?: number;
}

interface AnimatedWordProps extends TextProps {
	word: string;
	index: number;
	delay: number;
}

function AnimatedWord({ word, index, delay, ...props }: AnimatedWordProps) {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		let secondFrame = 0;
		const firstFrame = requestAnimationFrame(() => {
			secondFrame = requestAnimationFrame(() => setVisible(true));
		});

		return () => {
			cancelAnimationFrame(firstFrame);
			cancelAnimationFrame(secondFrame);
		};
	}, []);

	const { style, className, ...rest } = props;

	return (
		<Text
			className={clsx("word", visible && "visible", className)}
			style={{
				...style,
				transitionDelay: `${delay + index * 80}ms`,
			}}
			{...rest}
		>
			{word}&nbsp;
		</Text>
	);
}

export default function TextAnimated({
	text,
	delay = 0,
	...props
}: TextAnimatedProps) {
	const words = text.split(" ");

	return (
		<>
			{words.map((word, index) => (
				<AnimatedWord
					key={`${text}-${index}`}
					word={word}
					index={index}
					delay={delay}
					{...props}
				/>
			))}
		</>
	);
}
