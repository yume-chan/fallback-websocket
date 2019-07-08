describe('Fallback WebSocket', () => {
    afterEach(() => {
        delete (global as any).WebSocket;

        // instead of `require.cache`, jest has its own module cache
        // that can be cleared with `jest.resetModules()`.
        jest.resetModules();
    })

    it('should export native WebSocket if exist', () => {
        const fakeWebSocket = {};
        (global as any).WebSocket = fakeWebSocket;
        expect(require('../src').default).toBe(fakeWebSocket);
    });

    it('should export ws if native WebSocket not exist', () => {
        expect(require('../src').default).toBe(require('ws'));
    });

    it('should export ws if FORCE_WS is set', () => {
        const fakeWebSocket = {};
        (global as any).WebSocket = fakeWebSocket;

        process.env.FORCE_WS = 'true';

        expect(require('../src').default).toBe(require('ws'));
    });
});
