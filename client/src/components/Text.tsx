import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";

export const textVariants = {
	default: "text-sm md:text-lg lg:text-xl",

	title: "text-3xl md:text-5xl lg:text-7xl font-geist font-extrabold",

	subtitle: "text-2xl md:text-3xl lg:text-4xl font-bold font-geist",

	description: "text-sm md:text-md lg:text-lg font-geist",

	muted: "text-sm md:text-lg",

	heading: "text-xs sm:text-sm md:text-base font-geist",

	button: "text-base leading-[1.5rem]",

	label: "text-xs md:text-sm leading-4 tracking-wider",

	pwa_card: "text-sm leading-[1.25rem]",

	card_title: "text-xs md:text-xl font-semibold leading-[1.5rem]",
	card_description: "text-xs md:text-base font-semibold leading-[1rem]",
	card_category: "text-sm md:text-lg font-semibold tracking-wider",
} as const;

export type TextVariant = keyof typeof textVariants;

export type TextProps<T extends ElementType = "span"> = {
	as?: T;
	variant?: TextVariant;
	className?: string;
	children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children" | "variant">;

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
