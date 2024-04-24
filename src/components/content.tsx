import { cn } from "@/lib/utils";
import { createElement } from "react";

export interface ContentProps<T extends keyof JSX.IntrinsicElements>
	extends React.HTMLProps<T> {
	outerClassName?: string;
}

export const Content = <T extends keyof JSX.IntrinsicElements = "div">({
	as,
	outerClassName,
	className,
	children,
	...rest
}: ContentProps<T>) => {
	return createElement(
		as ?? "div",
		{
			className: outerClassName,
			...rest,
		},
		<div className={cn("mx-auto max-w-6xl px-8", className)}>
			{children}
		</div>
	);
};
