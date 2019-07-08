import value from '../src';

describe('module', () => {
    it('should export 42', () => {
        expect(value).toBe(42);
    });
});
