import { assert } from "chai";

import { Block } from "./block.model";
import { Blockchain } from "./blockchain.model";

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

const TEST_DATA: User = {
  firstName: "Elon",
  id: 42,
  lastName: "Musk"
};

describe("Blockchain", () => {
  it("should create a new blockchain", () => {
    const blockchain: Blockchain<User> = new Blockchain<User>();
    assert.isDefined(blockchain.getGenesisBlock());
  });

  it("should create a blockchain with existing blocks", () => {
    const testBlock: Block<User> = new Block(null, TEST_DATA);
    const blockchain: Blockchain<User> = new Blockchain([testBlock]);
    assert.equal(blockchain.getChain()[0], testBlock);
  });

  it("should generate a new block", () => {
    const blockchain: Blockchain<User> = new Blockchain<User>();
    blockchain.add(TEST_DATA);
    const latestBlock: Block<User> = blockchain.getLatestBlock();
    assert.equal(latestBlock.data, TEST_DATA);
  });

  it("should overwrite the existing chain", () => {
    const blockchain: Blockchain<User> = new Blockchain<User>();
    blockchain.add(TEST_DATA);
    const copy: Blockchain<User> = new Blockchain(blockchain.getChain().slice());
    copy.add(TEST_DATA);
    assert.lengthOf(blockchain.getChain(), 2);
    blockchain.replaceChain(copy.getChain());
    assert.lengthOf(blockchain.getChain(), 3);
  });

  it("should not overwrite the existing chain with a corrupted chain", () => {
    const blockchain: Blockchain<User> = new Blockchain();
    blockchain.add(TEST_DATA);
    const copy: Blockchain<User> = new Blockchain<User>(blockchain.getChain().slice());
    copy.add(TEST_DATA);
    const corruptedChain: Block<User>[] = copy.getChain().slice();
    corruptedChain.splice(1, 1);
    blockchain.replaceChain(corruptedChain);
    assert.notEqual(blockchain.getChain(), corruptedChain);
  });
});
