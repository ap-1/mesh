"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import argon2 from "argon2";
import { getUserByUsername } from "@/db/adapter";
import { lucia } from "@/auth";

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
