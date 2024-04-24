import { OpenAI } from "openai";
import { createAI, getMutableAIState, render } from "ai/rsc";
import { env } from "@/env";

import { LoaderCircleIcon } from "lucide-react";

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
	display: React.ReactNode;
}

const initialAIState: AIStateItem[] = [];
const initialUIState: UIStateItem = null!;

async function getTextContent(base64_image: string): Promise<UIStateItem> {
	"use server";

	const aiState = getMutableAIState<typeof AI>();

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
		model: "gpt-4-turbo",
		provider: openai,
		messages: [...aiState.get()],
		text: ({ content, done }) => {
			if (done) {
				aiState.done([
					...aiState.get(),
					{
						role: "assistant",
						content,
					},
				]);
			}

			const words = content.split(" ");
			const halves = words.map((word) => {
				const half = Math.ceil(word.length / 2);
				return [word.slice(0, half), word.slice(half)];
			});

			return (
				<div className="flex flex-row">
					<p>
						{halves.map((word, i) => (
							<span key={i}>
								<span className="font-bold">{word[0]}</span>
								{word[1]}{" "}
							</span>
						))}
					</p>

					{done || (
						<LoaderCircleIcon className="animate-spin ml-2 my-auto size-4" />
					)}
				</div>
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
