export const apply = (content: string) => {
	const words = content.split(" ");
	const halves = words.map((word) => {
		const half = Math.ceil(word.length / 2);
		return [word.slice(0, half), word.slice(half)];
	});

	return halves.map((word, i) => (
		<span key={i}>
			<span className="font-bold">{word[0]}</span>
			{word[1]}{" "}
		</span>
	));
}
