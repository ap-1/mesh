import { experimental_useEffectEvent, useEffect } from "react";

export function usePasteImage(
	cb: (image: File) => any,
	options: AddEventListenerOptions = {}
) {
	useEffect(() => {
		const handler: EventListenerOrEventListenerObject = (e) => {
			const event = e as ClipboardEvent;
			const items = event.clipboardData?.items || [];

			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				if (item.kind === "file" && item.type.startsWith("image/")) {
					const image = item.getAsFile();

					if (image) {
						cb(image);
						break;
					}
				}
			}
		};

		window.addEventListener("paste", handler, options);

		return () => window.removeEventListener("paste", handler, options);
	}, [options, cb]);
}
