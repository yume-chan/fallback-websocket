let result: typeof WebSocket;

if (typeof WebSocket === 'undefined' ||
    (typeof process !== 'undefined' && process.env.FORCE_WS)) {
    result = require("ws");
} else {
    result = WebSocket;
}

export default result;
