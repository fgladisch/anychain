import crypto = require("crypto");

export class Block<T> {
  public static calculateHash(block: Block<any>): string {
    const json: string = JSON.stringify(block.data);
    const text: string = `${block.index}${block.predecessor}${block.time}${json}`;
    return crypto
      .createHash("sha256")
      .update(text, "utf8")
      .digest("hex");
  }

  public static validate(block: Block<any>, predecessor: Block<any>): boolean {
    return (
      predecessor.index + 1 === block.index &&
      predecessor.hash === block.predecessor &&
      Block.calculateHash(block) === block.hash
    );
  }

  public index: number;
  public predecessor: string;
  public time: number;
  public data: T | string;
  public hash: string;

  constructor(predecessor: Block<T>, data: T | string) {
    if (predecessor) {
      this.index = predecessor.index + 1;
      this.predecessor = predecessor.hash;
    } else {
      this.index = 0;
      this.predecessor = null;
    }

    this.data = data;

    this.time = Date.now();
    this.hash = Block.calculateHash(this);
  }
}
