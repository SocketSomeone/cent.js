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
const { CentClient } = require('cent.js');

// Initialize client instance.
const client = new CentClient({
    host: 'http://localhost:8000/api',
    token: 'XXX'
})

// Publish data into channel
client.publish({
    channel: 'public:chat',
    data: { input: "test" }
})

// Other available methods
client.unsubscribe({ user: 'user_id', channel: 'channel' });
client.disconnect({ user: 'user_id' })
client.getHistory({ channel: 'channel' })
client.getPresence({ channel: 'channel' })
client.getChannels()
client.getInfo()
client.removeHistory({ channel: 'channel' })
```

## Stay in touch

* Author - [Alexey Filippov](https://t.me/socketsomeone)
* Twitter - [@SocketSomeone](https://twitter.com/SocketSomeone)

## License

[MIT](https://github.com/SocketSomeone/necord/blob/master/LICENSE) © [Alexey Filippov](https://github.com/SocketSomeone)
