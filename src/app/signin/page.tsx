"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import argon2 from "argon2";
import { getUserByUsername } from "@/db/adapter";
import { lucia } from "@/auth";
import { validateRequest } from "@/auth/validate-request";

import { Content } from "@/components/content";
import { Link } from "@/components/link";
import { SigninForm } from "@/app/signin/form";
import type { Schema } from "@/app/signin/form";

interface ActionResult {
	error: string;
}

export async function action(values: Schema): Promise<ActionResult> {
	const existingUsers = await getUserByUsername(values.username);

	if (existingUsers.length === 0) {
		throw new Error("Invalid username or password");
	}

	const existingUser = existingUsers[0];

	// Potentially don't use argon2.verify() because we want to always hash the password
	// Attackers would otherwise use the timing to determine whether a user exists
	if (!(await argon2.verify(existingUser.hashedPassword, values.password))) {
		throw new Error("Invalid username or password");
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect("/");
}

export default async function Signin() {
	const { user } = await validateRequest();
	if (user) {
		redirect("/");
	}

	return (
		<Content as="main" className="h-[calc(100vh-12rem)] flex">
			<div className="space-y-8 self-center w-full">
				<div className="text-center">
					<h1 className="text-4xl font-bold">
						Sign into your account
					</h1>
					<p className="text-muted-foreground">
						Don&apos;t have an account?{" "}
						<Link href="/signup" text="Sign up instead" />
					</p>
				</div>

				<SigninForm />
			</div>
		</Content>
	);
}
