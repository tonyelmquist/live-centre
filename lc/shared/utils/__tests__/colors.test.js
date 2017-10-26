import colors from '../colors';

const expected = {
    params: expect.any(Object),
    key: expect.any(String),
    routeName: expect.any(String)
};

describe.skip('Should set params for navigation', () => {
    test('Should return object with correct structure', () => {
        expect(colors('DARK', 1)).toMatchObject(expected);
    });
});
