import { cn } from "@/lib/utils";

import { ArrowUpRight } from "lucide-react";
import {
  default as NextLink,
  type LinkProps as NextLinkProps,
} from "next/link";
import type { PropsWithChildren } from "react";

type BaseLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof NextLinkProps
> &
  NextLinkProps &
  React.RefAttributes<HTMLAnchorElement>;

interface LinkProps extends Omit<BaseLinkProps, "target"> {
  text: string;
  unstyled?: boolean;
  external?: boolean;
}

export const Link = ({
  text,
  unstyled,
  external,
  className,
  ...rest
}: PropsWithChildren<LinkProps>) => {
  return (
    <NextLink
      passHref
      legacyBehavior
      target={external ? "_blank" : "_self"}
      {...rest}
    >
      <a
        className={cn(
          unstyled || "text-cyan-500 hover:underline transition-all",
          "inline-block",
          className,
        )}
      >
        {text}
        <ArrowUpRight className="text-cyan-500 inline-block w-2 h-2 mb-4 text-muted-foreground" />
      </a>
    </NextLink>
  );
};
