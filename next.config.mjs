// import MillionLint from "@million/lint";
// import million from "million/compiler";

import { fileURLToPath } from "url";
import createJiti from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));
jiti("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		serverActions: {
			bodySizeLimit: "5mb",
		}
	}
};

export default nextConfig;

// Million Lint is only supported on vscode
// const millionConfig = {
// 	auto: true,
// };

// export default MillionLint.next({
// 	rsc: true,
// })(nextConfig, millionConfig);

// Running both Million Lint and million breaks ai/rsc
// (million.next(nextConfig, millionConfig));
