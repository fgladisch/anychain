import { assert } from "chai";

import { Block } from "./block.model";
import { Blockchain } from "./blockchain.model";

interface Shipment {
  trackingId: number;
  latitude: number;
  longitude: number;
}

const TEST_DATA: Shipment[] = [
  {
    latitude: 40.758895,
    longitude: -73.985131,
    trackingId: 42
  }
];

describe("Blockchain", () => {
  it("should create a new blockchain", () => {
    const blockchain: Blockchain<Shipment[]> = new Blockchain<Shipment[]>();
    assert.isDefined(blockchain.getGenesisBlock());
  });

  it("should create a blockchain with existing blocks", () => {
    const testBlock: Block<Shipment[]> = new Block(null, TEST_DATA);
    const blockchain: Blockchain<Shipment[]> = new Blockchain([testBlock]);
    assert.equal(blockchain.getChain()[0], testBlock);
  });

  it("should generate a new block", () => {
    const blockchain: Blockchain<Shipment[]> = new Blockchain<Shipment[]>();
    blockchain.add(TEST_DATA);
    const latestBlock: Block<Shipment[]> = blockchain.getLatestBlock();
    assert.equal(latestBlock.data, TEST_DATA);
  });

  it("should overwrite the existing chain", () => {
    const blockchain: Blockchain<Shipment[]> = new Blockchain<Shipment[]>();
    blockchain.add(TEST_DATA);
    const copy: Blockchain<Shipment[]> = new Blockchain(blockchain.getChain().slice());
    copy.add(TEST_DATA);
    assert.lengthOf(blockchain.getChain(), 2);
    blockchain.update(copy.getChain());
    assert.lengthOf(blockchain.getChain(), 3);
  });

  it("should not overwrite the existing chain with a corrupted chain", () => {
    const blockchain: Blockchain<Shipment[]> = new Blockchain();
    blockchain.add(TEST_DATA);
    const copy: Blockchain<Shipment[]> = new Blockchain<Shipment[]>(blockchain.getChain().slice());
    copy.add(TEST_DATA);
    const corruptedChain: Block<Shipment[]>[] = copy.getChain().slice();
    corruptedChain.splice(1, 1);
    blockchain.update(corruptedChain);
    assert.notEqual(blockchain.getChain(), corruptedChain);
  });
});
