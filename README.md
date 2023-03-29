# Fallback WebSocket

![Node.js CI](https://github.com/yume-chan/fallback-websocket/workflows/Node.js%20CI/badge.svg)

Get native WebSocket in browsers, or [ws](https://github.com/websockets/ws) in Node.js.

Help you writing WebSocket libraries targeting both browsers and Node.js.

- [Difference between isomorphic-ws](#difference-between-isomorphic-ws)
- [Install](#install)
- [API](#api)
  - [Note on TypeScript typing](#note-on-typescript-typing)
  - [Note on event handler properties](#note-on-event-handler-properties)
- [Usage](#usage)
  - [Force to use `ws`](#force-to-use-ws)
- [Development](#development)
  - [Install dependencies](#install-dependencies)
  - [Testing](#testing)
  - [Coverage](#coverage)
- [License](#license)

## Difference between [isomorphic-ws](https://github.com/heineiuo/isomorphic-ws)

`isomorphic-ws` relies on bundlers (like Webpack) to choose between native implementation and `ws` package. It's not useful when not using a bundler.

This package detects whether there is a native WebSocket implementation, and fallback to `ws` if not.

## Install

```shell
npm install @yume-chan/fallback-websocket
```

`ws` is a peer dependency, you need to install it separately for Node.js.

```shell
npm install ws
```

## API

```ts
export default WebSocket: typeof WebSocket;

export connect(url: string): Promise<WebSocket>;
```

### Note on TypeScript typing

The exported object always has native WebSocket's type, to use fields added by `ws`, import `WebSocket` from `ws` and cast the object to that.

### Note on event handler properties

The `onXXX` event handler properties in `ws` are implemented strangely. Setting these properties multiple times will add multiple handlers, instead of overwriting the previous value as browsers do. Use `addEventListener`/`removeEventListener` when possible.

## Usage

```ts
import WebSocket from "@yume-chan/fallback-websocket";

// do something useful with WebSocket
```

Or use the `connect()` utility function, which returns a Promise that resolves to a connected WebSocket object.

```ts
import { connect } from "@yume-chan/fallback-websocket";

try {
  const connection = await connect("ws://localhost:80");
} catch (e) {
  // handle connection exception.
}
```

### Force to use `ws`

In some cases (e.g. running tests in Electron), you might want to use `ws` even if there is a native implementation.

You can set the `FORCE_WS` environment variable to achieve this.

## Development

This project uses [pnpm](https://pnpm.js.org/) ([GitHub](https://github.com/pnpm/pnpm)) to manage dependency packages.

### Install dependencies

```shell
pnpm i
```

You may also use `npm`, but the lockfile may become out of sync.

### Testing

```shell
npm test
```

### Coverage

```shell
npm run coverage
```

## License

MIT
