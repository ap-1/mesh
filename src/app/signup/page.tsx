"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import argon2 from "argon2";
import { generateIdFromEntropySize } from "lucia";
import { getUserByUsername, createUser } from "@/db/adapter";
import { lucia } from "@/auth";
import { validateRequest } from "@/auth/validate-request";

import { Content } from "@/components/content";
import { Link } from "@/components/link";
import { SignupForm } from "@/app/signup/form";
import type { Schema } from "@/app/signin/form";

interface ActionResult {
	error: string;
}

export async function action(values: Schema): Promise<ActionResult> {
	const hashedPassword = await argon2.hash(values.password);
	const userId = generateIdFromEntropySize(16);

	const existingUsers = await getUserByUsername(values.username);

	if (existingUsers.length > 0) {
		throw new Error("User already exists");
	}

	await createUser({
		id: userId,
		username: values.username,
		hashedPassword,
	});

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect("/");
}

export default async function Signup() {
	const { user } = await validateRequest();
	if (user) {
		redirect("/");
	}

	return (
		<Content as="main" className="h-[calc(100vh-12rem)] flex">
			<div className="space-y-8 self-center w-full">
				<div className="text-center">
					<h1 className="text-4xl font-bold">Create an account</h1>
					<p className="text-muted-foreground">
						Already have an account?{" "}
						<Link href="/signin" text="Sign in instead" />
					</p>
				</div>

				<SignupForm />
			</div>
		</Content>
	);
}
