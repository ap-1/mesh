"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, DesktopIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
	{ id: "light", name: "Light", Icon: SunIcon },
	{ id: "dark", name: "Dark", Icon: MoonIcon },
	{ id: "system", name: "System", Icon: DesktopIcon },
];

export const ThemeSwitcher = () => {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<SunIcon className="transition-all scale-100 rotate-0 size-5 dark:-rotate-90 dark:scale-0" />
					<MoonIcon className="absolute transition-all scale-0 rotate-90 size-5 dark:rotate-0 dark:scale-100" />

					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				{themes.map((theme) => (
					<DropdownMenuItem
						key={theme.id}
						onClick={() => setTheme(theme.id)}
					>
						<theme.Icon className="mr-2 size-4" />
						{theme.name}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
