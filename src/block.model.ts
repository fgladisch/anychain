import { calculateBlockHash, createHash } from "./crypto-util";

export interface BlockParams {
	index: number;
	previousHash: string;
	data: string;
}

export class Block {
	public index: number;
	public previousHash: string;
	public timestamp: number;
	public data: string;
	public hash?: string;

	constructor({ index, previousHash, data }: BlockParams) {
		this.index = index;
		this.previousHash = previousHash;
		this.data = data;

		this.timestamp = Date.now();
		this.hash = calculateBlockHash(this);
	}
}
