import Actions from '../../constants/ActionTypes';
import { fetchVideosSuccess, fetchVideoSuccess, fetchVideoFailed } from '../fetchData';

describe('Data fetching actions', () => {
    test('Should return correct action', () => {
        expect(fetchVideosSuccess().type).toEqual(Actions.FETCH_VIDEOS_SUCCESS);
        expect(fetchVideoSuccess().type).toEqual(Actions.FETCH_VIDEO_SUCCESS);
        expect(fetchVideoFailed().type).toEqual(Actions.FETCH_VIDEO_FAILED);
    });

    test('Should return correct payload', () => {
        const input = 'test data';
        expect(fetchVideosSuccess(input).data).toEqual(input);
        expect(fetchVideoSuccess(input).data).toEqual(input);
    });

    test('Should return only action type', () => {
        const input = 'test data';
        const expected = { type: Actions.FETCH_VIDEO_FAILED };
        const result = fetchVideoFailed(input);
        expect(Object.keys(result)).toHaveLength(1);
        expect(result).toMatchObject(expected);
    });
});
