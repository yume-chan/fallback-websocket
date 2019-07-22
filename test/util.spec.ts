import WebSocket, { Server as WebSocketServer } from 'ws';

import { connect } from '../src';

describe('connect', () => {
    it('should resolve when connected', (done) => {
        const port = 9332;
        const server = new WebSocketServer({ port }, async () => {
            const connection = await connect(`ws://localhost:${port}`);
            expect(connection).toHaveProperty('readyState', WebSocket.OPEN);

            server.close();
            done();
        });
    });

    it('should reject when url is invalid', () => {
        return expect(connect('invalid')).rejects.toThrow();
    });

    it('should reject if connection cannot be established', () => {
        return expect(connect('ws://localhost:9333')).rejects.toThrow();
    });
});
