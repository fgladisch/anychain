import crypto = require("crypto");

export class Block<T> {
  public static calculateHash(block: Block<any>): string {
    const json: string = JSON.stringify(block.data);
    const text: string = `${block.index}${block.parent}${block.time}${json}`;
    return crypto
      .createHash("sha256")
      .update(text, "utf8")
      .digest("hex");
  }

  public static validate(block: Block<any>, parent: Block<any>): boolean {
    return (
      parent.index + 1 === block.index &&
      parent.hash === block.parent &&
      Block.calculateHash(block) === block.hash
    );
  }

  public index: number;
  public parent: string;
  public time: number;
  public data: T | string;
  public hash: string;

  constructor(parent: Block<T>, data: T | string) {
    if (parent) {
      this.index = parent.index + 1;
      this.parent = parent.hash;
    } else {
      this.index = 0;
      this.parent = null;
    }

    this.data = data;

    this.time = Date.now();
    this.hash = Block.calculateHash(this);
  }
}
