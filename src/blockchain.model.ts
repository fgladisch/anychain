import { Block } from "./block.model";

export class Blockchain<T> {
	public static validate(genesis: Block<any>, chain: Block<any>[]): boolean {
		if (Block.calculateHash(genesis) !== chain[0].hash) {
			return false;
		}

		return chain.reduce((valid, block) => {
			if (block.index === 0) {
				return true;
			}
			return Block.validate(block, chain[block.index - 1]) || valid;
		}, true);
	}

	private chain: Block<T>[];

	constructor(chain?: Block<T>[]) {
		if (chain) {
			this.chain = chain;
		} else {
			const genesisBlock: Block<T> = new Block<T>(null, "GENESIS");
			this.chain = [genesisBlock];
		}
	}

	public getChain(): Block<T>[] {
		return this.chain;
	}

	public getGenesisBlock(): Block<T> {
		return this.chain[0];
	}

	public getLatestBlock(): Block<T> {
		return this.chain[this.chain.length - 1];
	}

	public add(data: T): Block<T> {
		const predecessor: Block<T> = this.getLatestBlock();
		const nextBlock: Block<T> = new Block<T>(predecessor, data);
		this.chain.push(nextBlock);
		return nextBlock;
	}

	public replaceChain(newBlocks: Block<T>[]): void {
		const isValid: boolean = Blockchain.validate(this.getGenesisBlock(), newBlocks);
		if (isValid && newBlocks.length > this.chain.length) {
			this.chain = newBlocks;
		}
	}

	public toJSON(): string {
		return JSON.stringify(this.chain, null, 2);
	}
}
