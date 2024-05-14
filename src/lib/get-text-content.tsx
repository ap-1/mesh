import { env } from "@/env";
import { createAI, getMutableAIState, render } from "ai/rsc";
import { OpenAI } from "openai";

import { validateRequest } from "@/auth/validate-request";
import { createImage } from "@/db/adapter";
import { generateIdFromEntropySize } from "lucia";

import { apply } from "@/lib/bionic-reading";
import { LoaderCircleIcon } from "lucide-react";
import type { ReactNode } from "react";

const openai = new OpenAI({
	apiKey: env.OPENAI_API_KEY,
});

type AIStateItem =
	| {
		readonly role: "user" | "assistant" | "system";
		readonly content: any;
	}
	| {
		readonly role: "function";
		readonly content: string;
		readonly name: string;
	};

interface UIStateItem {
	id: number;
	display: ReactNode;
}

const initialAIState: AIStateItem[] = [];
const initialUIState: UIStateItem = null!;

const Loading = () => {
	return <LoaderCircleIcon className="inline animate-spin ml-2 my-auto size-4" />
}

async function getTextContent(base64_image: string): Promise<UIStateItem> {
	"use server";

	const { user } = await validateRequest();
	const aiState = getMutableAIState<typeof AI>();

	if (!user) {
		return {
			id: Date.now(),
			display: <p> Not authenticated</p>,
		};
	}

	aiState.update([
		{
			role: "user",
			content: [
				{
					type: "text",
					text: "Please transcribe the text in this image.",
				},
				{
					type: "image_url",
					image_url: { url: base64_image },
				},
			],
		},
	]);

	const ui = render({
		model: "gpt-4o",
		provider: openai,
		messages: [...aiState.get()],
		initial: <Loading />,
		text: async ({ content, done }) => {
			if (done) {
				aiState.done([
					...aiState.get(),
					{
						role: "assistant",
						content,
					},
				]);

				const imageId = generateIdFromEntropySize(16);
				createImage({
					id: imageId,
					userId: user.id,
					text: content,
					url: base64_image,
				});
			}

			return (
				<p>
					{apply(content)}
					{done || (
						<Loading />
					)}
				</p>
			);
		},
	});

	return {
		id: Date.now(),
		display: ui,
	};
}

export const AI = createAI({
	actions: { getTextContent },
	initialUIState,
	initialAIState,
});
