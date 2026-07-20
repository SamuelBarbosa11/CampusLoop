import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";

export const textVariants = {
	default: "text-sm md:text-lg lg:text-xl",

	title: "text-3xl md:text-5xl lg:text-7xl font-geist font-extrabold",

	subtitle: "text-2xl md:text-3xl lg:text-4xl font-bold font-geist",

	description: "text-sm md:text-md lg:text-lg font-geist",

	muted: "text-sm md:text-md lg:text-lg",

	heading: "text-xs sm:text-sm md:text-base font-geist",

	button: "text-base leading-[1.5rem]",

	label: "text-xs leading-4",

	pwa_card: "text-sm leading-[1.25rem]",

	card_title: "text-xs md:text-sm lg:text-base font-semibold leading-[1.5rem]",
	card_description: "text-xs font-semibold leading-[1rem]",
} as const;

type TextVariant = keyof typeof textVariants;

type TextProps<T extends ElementType = "span"> = {
	as?: T;
	variant?: TextVariant;
	className?: string;
	children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function Text<T extends ElementType = "span">({
	as,
	variant = "default",
	className = "",
	children,
	...props
}: TextProps<T>) {
	const Component = as || "span";

	return (
		<Component className={clsx(textVariants[variant], className)} {...props}>
			{children}
		</Component>
	);
}
