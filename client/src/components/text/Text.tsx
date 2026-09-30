import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
import { textVariants, type TextVariant } from "./textVariants";

export type TextProps<T extends ElementType = "span"> = {
	as?: T;
	variant?: TextVariant;
	className?: string;
	children?: ReactNode;
} & Omit<
	ComponentPropsWithoutRef<T>,
	"as" | "className" | "children" | "variant"
>;

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
