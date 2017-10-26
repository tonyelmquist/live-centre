import fetchVideos from '../fetchVideos';
import types from '../../constants/ActionTypes';

describe('Fetch video reducer test', () => {
    test('Handles actions correctly', () => {
        const expected = ['video'];
        expect(fetchVideos([], { type: types.FETCH_VIDEOS_SUCCESS, data: expected })).toEqual(
            expected
        );
        expect(fetchVideos([], { type: types.FETCH_VIDEO_FAILED, data: expected })).toEqual([]);
        expect(fetchVideos(undefined, { type: 'IRRELEVANT_TYPE' })).toEqual([]);
    });
});
