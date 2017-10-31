import platform from '../platform';

const expected = {
    orientation: expect.any(Function),
    dimensions: expect.any(Function),
    isPortrait: expect.any(Function),
    isLandscape: expect.any(Function),
    isTablet: expect.any(Function),
    isPhone: expect.any(Function),
    OS: expect.any(String)
};

describe('Should return platform data object', () => {
    test('Should return object with correct structure', () => {
        expect(platform).toMatchObject(expected);
    });
    test('Methods return correct data', () => {
        expect(platform.isPortrait()).toEqual(expect.any(Boolean));
        expect(platform.isLandscape()).toEqual(expect.any(Boolean));
        expect(platform.isTablet()).toEqual(expect.any(Boolean));
        expect(platform.isPhone()).toEqual(expect.any(Boolean));
        expect(platform.dimensions()).toMatchObject({
            width: expect.any(Number),
            height: expect.any(Number)
        });
        expect(platform.orientation()).toEqual(expect.stringMatching(/LANDSCAPE|PORTRAIT/));
        expect(platform.OS).toEqual(expect.stringMatching(/ios|android/));
    });
});
