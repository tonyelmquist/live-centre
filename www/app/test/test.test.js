import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import { assert } from 'chai';

describe('Example test', () => {
    it('should start empty', () => {
        const arr = [];

        assert.equal(arr.length, 0);
    });

    it('mocks simplest http get request', (done) => {
        fetchMock.mock('http://www.fake.com', 301);
        fetch('http://www.fake.com')
            .then((res) => {
                expect(fetchMock.calls().matched.length).to.equal(1);
                expect(res.status).to.equal(301);
                fetchMock.restore();
                done();
            });
    });
});
