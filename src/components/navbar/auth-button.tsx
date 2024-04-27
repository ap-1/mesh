"use client";

import { Button } from "@/components/ui/button";
import type { User } from "lucia";

interface AuthButtonProps {
	user: User | null;
	handleAuthClick: () => Promise<void>;
}

export const AuthButton = ({ user, handleAuthClick }: AuthButtonProps) => {
	return (
		<form action={handleAuthClick}>
			<Button>{user ? "Logout" : "Sign in"}</Button>
		</form>
	);
};
