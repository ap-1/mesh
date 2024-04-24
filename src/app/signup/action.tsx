"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import argon2 from "argon2";
import { generateIdFromEntropySize } from "lucia";
import { getUserByUsername, createUser } from "@/db/adapter";
import { lucia } from "@/auth";

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
