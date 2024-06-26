"use server";

import { redirect } from "next/navigation";
import { validateRequest } from "@/auth/validate-request";

import { Content } from "@/components/content";
import { Link } from "@/components/link";
import { SigninForm } from "@/app/login/form";

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
						<Link href="/register" text="Sign up instead" />
					</p>
				</div>

				<SigninForm />
			</div>
		</Content>
	);
}
