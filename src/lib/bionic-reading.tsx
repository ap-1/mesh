import { franc } from "franc";

export const apply = (content: string) => {
	let code = franc(content);
	if (code === "und") {
		code = "en";
	}

	const words = new Intl.Segmenter(code, { granularity: "word" });
	const segments = Array.from(words.segment(content));

	return segments.map(({ isWordLike, segment }, i) => {
		if (isWordLike) {
			const graphemes = new Intl.Segmenter(code, { granularity: "grapheme" });
			const subsegments = Array.from(graphemes.segment(segment))
				.map(({ segment }) => segment);

			const half = Math.ceil(subsegments.length / 2);

			return (
				<span key={i}>
					<span className="font-bold">
						{subsegments.slice(0, half).join("")}
					</span>
					{subsegments.slice(half).join("")}
				</span>
			);
		}

		return <span key={i}>{segment}</span>;
	})
}
