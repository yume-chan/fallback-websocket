# Fallback WebSocket

![Node.js CI](https://github.com/yume-chan/fallback-websocket/workflows/Node.js%20CI/badge.svg)

Get native WebSocket in browsers, or [ws](https://github.com/websockets/ws) in Node.js.

Help you writing WebSocket libraries targeting both browsers and Node.js.

- [Fallback WebSocket](#fallback-websocket)
  - [Difference from isomorphic-ws](#difference-from-isomorphic-ws)
  - [Install](#install)
  - [API](#api)
    - [Note on TypeScript typing](#note-on-typescript-typing)
  - [Usage](#usage)
    - [Force to use ws](#force-to-use-ws)
  - [Development](#development)
    - [Install dependencies](#install-dependencies)
    - [Testing](#testing)
    - [Coverage](#coverage)
  - [License](#license)

## Difference from [isomorphic-ws](https://github.com/heineiuo/isomorphic-ws)

isomorphic-ws relies on bundlers (like Webpack) to choose using either native WebSocket or ws. It's not useful when not using a bundler.

This package detects whether there is a native WebSocket implementation, and fallback to ws if not.

## Install

``` shell
npm install @yume-chan/fallback-websocket
```

`ws` is a peer dependency, you need to install it separately for Node.js.

``` shell
npm install ws
```

## API

``` ts
export default WebSocket: typeof WebSocket;

export connect(url: string): Promise<WebSocket>;
```

### Note on TypeScript typing

The exported object always has native WebSocket's type, so you can't use anything added by ws.

Also, the `onXXX` event handlers of ws are implemented strangely. Setting `onXXX` event handler repeatedly will add multiple handlers, instead of replacing like in browsers, so be careful when using them.

## Usage

``` ts
import WebSocket from '@yume-chan/fallback-websocket';

// do something with WebSocket
```

or use the `connect()` utility function, which returns a Promise that resolves to a connected WebSocket object.

``` ts
import { connect } from '@yume-chan/fallback-websocket';

(async () => {
    try {
        const connection = await connect('ws://localhost:80');
    } catch (e) {
        // handle connection exception.
    }
})();
```

### Force to use ws

In some cases (e.g. running tests in Electron), you might want to use ws even if there is a native implementation.

You can set the `FORCE_WS` environment variable to achieve this.

## Development

This project uses [pnpm](https://pnpm.js.org/) ([GitHub](https://github.com/pnpm/pnpm)) to manage dependency packages.

### Install dependencies

``` shell
pnpm i
```

You may also use `npm`, but the lockfile may become out of sync.

### Testing

``` shell
npm test
```

### Coverage

``` shell
npm run coverage
```

## License

MIT
