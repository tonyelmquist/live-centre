import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import {assert} from 'chai';
import {Promise} from 'es6-promise';

describe('Example test', () => {
    it('should start empty', () => {
        const arr = [];

        assert.equal(arr.length, 0);
    });

    it('mocks simplest http GET request', (done) => {
        fetchMock.mock('http://www.fake.com', 301);
        fetch('http://www.fake.com')
            .then((res) => {
                expect(fetchMock.calls().matched.length).to.equal(1);
                expect(res.status).to.equal(301);
                fetchMock.restore();
                done();
            });
    });

    it('returns promise', () => {
        return new Promise((resolve, reject) => {
            // We call resolve(...) when what we were doing async succeeded, and reject(...) when it failed.
            // In this example, we use setTimeout(...) to simulate async code.
            // In reality, you will probably be using something like XHR or an HTML5 API.
            setTimeout(() => resolve("ok")
            , 250);
        }).then((data) => {
            assert.strictEqual(data,"ok","should be the same");
        });
    });
});
