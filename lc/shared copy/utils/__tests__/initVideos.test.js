import initVideos from '../initVideos';
// import ActionTypes from '../../actions';

const expectedObject = {
    type: expect.stringMatching(/SUCCESS|FAILED/)
};
const config = {
    searchTerm: '',
    url: 'https://api-eu1.mediabank.me'
};

describe('Should dispatch video fetch actions', () => {
    test('Should dispatch an action twice', () => {
        const dispatchMock = jest.fn();
        return initVideos(dispatchMock).then(() => {
            expect(dispatchMock.mock.calls.length).toBe(2);
        });
    });

    test('Should return a video data', async () => {
        const dispatchMock = jest.fn();
        const data = await initVideos(dispatchMock);
        expect(data).not.toBeNull();
    });

    test('Should reject the promise', async () => {
        const dispatchMock = jest.fn();
        const err = await initVideos(dispatchMock, config);
        expect(err).toMatchObject({ error: expect.any(String) });
        // expect(dispatchMock).toBeCalledWith(expect.objectContaining(expectedObject));
        expect(dispatchMock.mock.calls[0][0]).toMatchObject(expectedObject);
    });

    test('Should dispatch success action', () => {
        const dispatchMock = jest.fn();
        return initVideos(dispatchMock).then(() => {
            expect(dispatchMock).toBeCalledWith(expect.objectContaining(expectedObject));
        });
    });
});
