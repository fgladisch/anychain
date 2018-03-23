import crypto = require("crypto");

import { Block } from "../block.model";

export function createHash(text: string): string {
	return crypto
		.createHash("sha256")
		.update(text, "utf8")
		.digest("hex");
}

export function calculateBlockHash({ index, previousHash, timestamp, data }: Block): string {
	return createHash(`${index}_${previousHash}_${timestamp}_${data}`);
}
