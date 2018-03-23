import { Block } from "../block.model";
import { Blockchain } from "../blockchain.model";
import { calculateBlockHash } from "./crypto";

export function isValidChain(genesis: Block, chain: Block[]): boolean {
	if (calculateBlockHash(genesis) !== chain[0].hash) {
		return false;
	}

	return chain.reduce(
		(valid, block) => isValidNewBlock(block, this.chain[block.index - 1]) || valid,
		true
	);
}

export function isValidNewBlock(newBlock: Block, previousBlock: Block): boolean {
	if (previousBlock.index + 1 !== newBlock.index) {
		return false;
	} else if (previousBlock.hash !== newBlock.previousHash) {
		return false;
	} else if (calculateBlockHash(newBlock) !== newBlock.hash) {
		return false;
	}
	return true;
}
