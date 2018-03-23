import { assert } from "chai";

import { Block } from "./block.model";
import { Blockchain } from "./blockchain.model";

const TEST_DATA: string = "TEST";

describe("Blockchain", () => {
	it("should create a new blockchain", () => {
		const blockchain: Blockchain = new Blockchain();
		assert.isDefined(blockchain.getGenesisBlock());
	});

	it("should create a blockchain with existing blocks", () => {
		const testBlock: Block = new Block({
			data: TEST_DATA,
			index: 0,
			previousHash: null
		});
		const blockchain: Blockchain = new Blockchain([testBlock]);
		assert.equal(blockchain.getChain()[0], testBlock);
	});

	it("should generate a new block", () => {
		const blockchain: Blockchain = new Blockchain();
		blockchain.generateNextBlock(TEST_DATA);
		const latestBlock: Block = blockchain.getLatestBlock();
		assert.equal(latestBlock.data, TEST_DATA);
	});

	it("should overwrite the existing chain", () => {
		const blockchain: Blockchain = new Blockchain();
		blockchain.generateNextBlock(TEST_DATA);
		const copy: Blockchain = new Blockchain(blockchain.getChain().slice());
		copy.generateNextBlock(TEST_DATA);
		assert.lengthOf(blockchain.getChain(), 2);
		blockchain.replaceChain(copy.getChain());
		assert.lengthOf(blockchain.getChain(), 3);
	});

	it("should not overwrite the existing chain with a corrupted chain", () => {
		const blockchain: Blockchain = new Blockchain();
		blockchain.generateNextBlock(TEST_DATA);
		const copy: Blockchain = new Blockchain(blockchain.getChain().slice());
		copy.generateNextBlock(TEST_DATA);
		const corruptedChain: Block[] = copy.getChain().slice();
		corruptedChain.splice(1, 1);
		blockchain.replaceChain(corruptedChain);
		assert.notEqual(blockchain.getChain(), corruptedChain);
	});
});
