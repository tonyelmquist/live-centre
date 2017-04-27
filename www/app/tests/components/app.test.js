import React from 'react';
import ReactDom from 'react-dom';
import testUtil from 'react-dom/test-utils';
import {assert, expect} from 'chai';
import Player from '../../scripts/containers/Player';

describe("Player",() => {
    it('should exist', ()=> {
        expect(Player).should.exist;
    });
});
