# anychain

A blockchain data structure for Node.js! :rocket:

## Quick Start (JavaScript)

```ts
const { Blockchain } = require("@anychain/core");

const blockchain = new Blockchain();

const shipments = [
  {
    trackingId: 42,
    latitude: 40.758895,
    longitude: -73.985131
  }
];

blockchain.add(shipments);
```

## Quick Start (TypeScript)

```ts
import { Block, Blockchain } from "@anychain/core";

interface Shipment {
  trackingId: number;
  latitude: number;
  longitude: number;
}

const shipments: Shipment[] = [
  {
    trackingId: 42,
    latitude: 40.758895,
    longitude: -73.985131
  }
];

const blockchain: Blockchain<Shipment[]> = new Blockchain<Shipment[]>();

const latestBlock: Block<Shipment[]> = blockchain.add(shipments);
```

## Installation

```bash
yarn add @anychain/core
# or
npm install --save @anychain/core
```

## API

### `constructor(chain?: Block<T>[])`

Pass an optional existing `chain` to the constructor.

### `#add(data: T): Block<T>`

Adds a new block with the given data to the blockchain.

### `#update(chain: Block<T>[]): boolean`

Overwrite the current `chain` with a more recent one. Returns `true` when the update was successful.

### `#toJSON(): string`

Returns the following JSON for the example above:

```json
[
  {
    "index": 0,
    "parent": null,
    "data": "GENESIS",
    "time": 1522226975631,
    "hash": "2e465389daa2d20a41fcd12cb7cf2b59fbd04e72dcd5d21cb5c72c91fd83119b"
  },
  {
    "index": 1,
    "parent": "2e465389daa2d20a41fcd12cb7cf2b59fbd04e72dcd5d21cb5c72c91fd83119b",
    "data": [
      {
        "trackingId": 42,
        "latitude": 40.758895,
        "longitude": -73.985131
      }
    ],
    "time": 1522226975631,
    "hash": "9467452a7cdb8491d3b5c1cce93583bb2840e6c0b9e2612f6a915e1df207c52a"
  }
]
```

### `#getChain(): Block<T>[]`

Returns the full `chain` as array.

### `#getGenesisBlock(): Block<T>`

Returns the first `block` in the `chain` (genesis).

### `#getLatestBlock(): Block<T>`

Returns the latest `block` in the `chain`.

## License

[MIT](LICENSE)
