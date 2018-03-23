import { Block, BlockParams } from "./block.model";
import { isValidChain, isValidNewBlock } from "./util/blockchain";
import { calculateBlockHash } from "./util/crypto";

const GENESIS_BLOCK_PARAMS: BlockParams = {
	data: "GENESIS",
	index: 0,
	previousHash: null
};

export class Blockchain {
	private chain: Block[];

	constructor(chain: Block[]) {
		if (chain) {
			this.chain = chain;
		} else {
			const genesisBlock: Block = new Block(GENESIS_BLOCK_PARAMS);
			this.chain = [genesisBlock];
		}
	}

	public getChain(): Block[] {
		return this.chain;
	}

	public getGenesisBlock(): Block {
		return this.chain[0];
	}

	public getLatestBlock(): Block {
		return this.chain[this.chain.length - 1];
	}

	public generateNextBlock(data: string): Block {
		const previousBlock: Block = this.getLatestBlock();

		const nextBlock: Block = new Block({
			data,
			index: previousBlock.index + 1,
			previousHash: previousBlock.hash
		});

		this.chain.push(nextBlock);

		return nextBlock;
	}

	public replaceChain(newBlocks: Block[]): void {
		if (isValidChain(this.chain[0], newBlocks) && newBlocks.length > this.chain.length) {
			this.chain = newBlocks;
			// TODO: broadcastLatest();
		}
	}
}
