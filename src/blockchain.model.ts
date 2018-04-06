import { Block } from "./block.model";

export class Blockchain<T> {
  public static validateChain(chain: Block<any>[], genesis?: Block<any>): boolean {
    if (!Array.isArray(chain)) {
      return false;
    }

    if (chain.length === 0) {
      return false;
    }

    if (genesis && Block.calculateHash(genesis) !== chain[0].hash) {
      return false;
    }

    return chain.reduce((valid, block) => {
      return (block.index !== 0 && Block.validate(block, chain[block.index - 1])) || valid;
    }, true);
  }

  private chain: Block<T>[];

  constructor(chain?: Block<T>[]) {
    if (chain) {
      if (!Blockchain.validateChain(chain)) {
        throw new Error("Invalid chain array.");
      }
      this.chain = chain;
      return;
    }
    const genesisBlock: Block<T> = new Block<T>(null, "GENESIS");
    this.chain = [genesisBlock];
  }

  public get data(): (T | string)[] {
    return this.chain.map(block => block.data);
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
    const parent: Block<T> = this.getLatestBlock();
    const next: Block<T> = new Block<T>(parent, data);
    this.chain.push(next);
    return next;
  }

  public update(chain: Block<T>[]): boolean {
    const isValid: boolean = Blockchain.validateChain(chain, this.getGenesisBlock());
    const isChainLonger: boolean = chain.length > this.chain.length;
    if (isValid && isChainLonger) {
      this.chain = chain;
      return true;
    }
    return false;
  }

  public toJSON(): string {
    return JSON.stringify(this.chain);
  }
}
