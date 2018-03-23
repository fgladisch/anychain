import { Block, BlockParams } from "./block.model";
import { calculateBlockHash } from "./crypto-util";

const genesisBlock: Block = new Block({
	data: "Genesis",
	index: 0,
	previousHash: null
});

let blockchain: Block[] = [genesisBlock];

export function getBlockchain(): Block[] {
	return blockchain;
}

function getLatestBlock(): Block {
	return blockchain[blockchain.length - 1];
}

function generateNextBlock(blockData: string): Block {
	const previousBlock: Block = getLatestBlock();
	const newBlock: Block = new Block({
		data: blockData,
		index: previousBlock.index + 1,
		previousHash: previousBlock.hash
	});
	return newBlock;
}

function isValidNewBlock(newBlock: Block, previousBlock: Block): boolean {
	if (previousBlock.index + 1 !== newBlock.index) {
		return false;
	} else if (previousBlock.hash !== newBlock.previousHash) {
		return false;
	} else if (calculateBlockHash(newBlock) !== newBlock.hash) {
		return false;
	}
	return true;
}

// TODO: Validate new blocks?
// function isValidBlockStructure(block: Block): boolean {
// 	return (
// 		typeof block.index === "number" &&
// 		typeof block.hash === "string" &&
// 		typeof block.previousHash === "string" &&
// 		typeof block.timestamp === "number" &&
// 		typeof block.data === "string"
// 	);
// }

function isValidChain(blockchainToValidate: Block[]): boolean {
	if (calculateBlockHash(blockchainToValidate[0]) !== genesisBlock.hash) {
		return false;
	}

	return blockchainToValidate.reduce(
		(isValid, block) => isValidNewBlock(block, blockchainToValidate[block.index - 1]) || isValid,
		true
	);
}

function replaceChain(newBlocks: Block[]): void {
	if (isValidChain(newBlocks) && newBlocks.length > getBlockchain().length) {
		console.log(
			"Received blockchain is valid. Replacing current blockchain with received blockchain"
		);
		blockchain = newBlocks;
		// TODO: broadcastLatest();
	} else {
		console.log("Received blockchain invalid");
	}
}
