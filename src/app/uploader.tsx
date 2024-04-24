"use client";

import { useUIState, useActions } from "ai/rsc";
import type { AI } from "@/get-text-content";

import { toast } from "sonner";
import { useCallback } from "react";
import { FileUploader } from "@/components/ui/uploader";

export const Uploader = () => {
	const [response, setResponse] = useUIState<typeof AI>();
	const { getTextContent } = useActions<typeof AI>();

	const onUpload = useCallback(
		async (updatedFiles: File[]) => {
			const file = updatedFiles[0];

			const reader = new FileReader();
			reader.onload = async () => {
				const base64 = reader.result as string;

				// Submit and get response message
				toast.promise(getTextContent(base64), {
					success: (message) => {
						setResponse(message);
						return "Scanning text...";
					},
					error: (err) => {
						setResponse(null!);
						console.error(err);

						return `Failed to scan text, see console for more details`;
					},
				});
			};

			reader.readAsDataURL(file);
		},
		[getTextContent, setResponse]
	);

	return (
		<>
			<FileUploader maxSize={1024 * 1024 * 8} onUpload={onUpload} />
			{response && response.display}
		</>
	);
};
