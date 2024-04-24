"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { action } from "@/app/signin/action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

const schema = z.object({
	username: z.string().min(1, { message: "Please enter your username" }),
	password: z.string().min(1, { message: "Please enter your password" }),
});

export type Schema = z.infer<typeof schema>;

export const SigninForm = () => {
	const form = useForm<Schema>({
		resolver: zodResolver(schema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = (values: Schema) => {
		action(values)
			.then((response) => {
				if (response.error) {
					return toast.error(response.error);
				} else {
					toast.success("Signed in successfully");
				}
			})
			.catch((err) => toast.error(err.message));
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 max-w-2xl mx-auto"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your username here"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter your password here"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					Sign in
				</Button>
			</form>
		</Form>
	);
};
