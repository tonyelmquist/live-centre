import React from 'react';
import ReactDom from 'react-dom';
import testUtil from 'react-dom/test-utils';
import {assert, expect} from 'chai';
import VideoPlayer from '../../scripts/components/VideoPlayer';

describe("Video Player",() => {
    it('should exist', ()=> {
        expect(VideoPlayer).should.exist;
    });
});
