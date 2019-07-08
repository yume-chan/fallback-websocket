# Fallback WebSocket

[![travis-ci](https://travis-ci.org/yume-chan/fallback-websocket.svg?branch=master)](https://travis-ci.org/yume-chan/fallback-websocket)
[![Greenkeeper badge](https://badges.greenkeeper.io/yume-chan/fallback-websocket.svg)](https://greenkeeper.io/)

Get native WebSocket from browsers, with ws as a fallback for Node.js

- [Fallback WebSocket](#Fallback-WebSocket)
  - [Difference from isomorphic-ws](#Difference-from-isomorphic-ws)
  - [API](#API)
    - [Note on TypeScript typing](#Note-on-TypeScript-typing)
    - [Force to use ws](#Force-to-use-ws)
  - [Development](#Development)
    - [Install dependencies:](#Install-dependencies)
    - [Testing](#Testing)
    - [Coverage](#Coverage)
  - [License](#License)

## Difference from [isomorphic-ws](https://github.com/heineiuo/isomorphic-ws)

isomorphic-ws relies on bundlers (like Webpack) to choose using either native WebSocket or ws. It's not useful when not using a bundler.

This package detects whether there is a native WebSocket implementation, and fallback to ws if not.

## API

``` ts
import WebSocket from '@yume-chan/fallback-websocket';

// do something with WebSocket
```

### Note on TypeScript typing

The exported object always has native WebSocket's type, so you can't use anything added by ws.

Also, the `onXXX` event handlers of ws are implemented in a strange way. Setting `onXXX` event handler repeatedly will add multiple handlers, instead of replacing like in browsers, so be careful when using them.

### Force to use ws

In some cases (e.g. running tests in Electron), you might want to use ws even if there is a native implementation.

You can set the `FORCE_WS` environment variable to achieve this.

## Development

This project uses [pnpm](https://pnpm.js.org/) ([GitHub](https://github.com/pnpm/pnpm)) to manage dependency packages.

### Install dependencies:

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
