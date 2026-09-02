# cent.js

Javascript library to communicate with Centrifugo HTTP API.

## Installation

```bash
$ npm i cent.js
```

## Usage

First see [available API methods in documentation](https://centrifugal.dev/docs/server/server_api).

This library contains `CentClient` class to send messages to Centrifugo from your node-powered backend:

```javascript
import { CentClient } from 'cent.js';

// Initialize client instance.
const client = new CentClient({
    url: 'http://localhost:8000/api',
    apiKey: 'XXX'
});

// Publish data into channel
const publishRes = await client.publish({
    channel: 'public:chat',
    data: {input: "test"}
}).catch(err => handleError()); // We throw error in case of unsuccessful
                                // response from Centrifugo or some other 
                                // internal errors.

// Other available methods
await client.unsubscribe({user: 'user_id', channel: 'channel'});
await client.disconnect({user: 'user_id'})
await client.getHistory({channel: 'channel'})
await client.getPresence({channel: 'channel'})
await client.getChannels()
await client.getInfo()
await client.removeHistory({channel: 'channel'})
```

`cent.js` is a native ESM package. The ESM-only package boundary is a breaking change for older Node.js releases and
CommonJS loaders. Use Node.js 20.19.x or Node.js 22.13+.

Modern CommonJS applications on those Node.js versions can synchronously load the same ESM package:

```javascript
const { CentClient } = require('cent.js');
```

## Stay in touch

* Author - [Alexey Filippov](https://t.me/socketsomeone)
* Twitter - [@SocketSomeone](https://twitter.com/SocketSomeone)

## License

[MIT](https://github.com/SocketSomeone/necord/blob/master/LICENSE) © [Alexey Filippov](https://github.com/SocketSomeone)
