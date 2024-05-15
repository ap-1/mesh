import Link from "next/link";
import { redirect } from "next/navigation";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { BrainCircuitIcon } from "lucide-react";

import { validateRequest } from "@/auth/validate-request";
import { logout } from "@/auth/logout";

import { Content } from "@/components/content";
import { ThemeSwitcher } from "@/components/navbar/theme-switcher";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/navbar/auth-button";

export const Navbar = async () => {
	const { user } = await validateRequest();

	const handleAuthClick = async () => {
		"use server";
		if (user) {
			await logout();
		} else {
			redirect("/login");
		}
	};

	return (
		<Content as="nav" className="flex flex-row justify-between h-24">
			<Link href="/" className="flex flex-row my-auto gap-x-4">
				<BrainCircuitIcon className="my-auto size-8" />
				<p className="hidden text-2xl font-bold sm:block">
					Mesh
				</p>
			</Link>

			<div className="flex items-center gap-x-2">
				<ThemeSwitcher />

				<Link
					href="https://github.com/ap-1/mesh"
					target="_blank"
				>
					<Button variant="ghost" size="icon">
						<GitHubLogoIcon className="size-5" />
					</Button>
				</Link>

				<AuthButton user={user} handleAuthClick={handleAuthClick} />
			</div>
		</Content>
	);
};
