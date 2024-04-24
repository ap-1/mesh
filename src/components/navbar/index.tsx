import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { BrainCircuitIcon } from "lucide-react";

import { Content } from "@/components/content";
import { ThemeSwitcher } from "@/components/navbar/theme-switcher";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
	return (
		<Content as="nav" className="flex flex-row justify-between h-24">
			<Link href="/" className="flex flex-row my-auto gap-x-4">
				<BrainCircuitIcon className="my-auto size-8" />
				<p className="hidden text-2xl font-bold sm:block">
					Bionic Reading
				</p>
			</Link>

			<div className="flex items-center gap-x-2">
				<ThemeSwitcher />

				<Link
					href="https://github.com/ap-1/bionic-reading"
					target="_blank"
				>
					<Button variant="ghost" size="icon">
						<GitHubLogoIcon className="size-5" />
					</Button>
				</Link>
			</div>
		</Content>
	);
};
