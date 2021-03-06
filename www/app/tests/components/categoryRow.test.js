import {enzymeMount, enzymeMountWithRouter, expect} from '../tests.helper.js';
import CategoryRow from '../../scripts/components/CategoryRow';
import sinon from 'sinon';


describe('CategoryRow', () => {
    let wrapper;

    const props = {
        tag: {id: "1", name: "nothing"},
        videos: [{id: 1, title: "Lost In Time: Lost forever", description: "Lost in Time description here, episode with id 1.", videoUrl: "731646302.mp4", tags: [{id: "1", name: "nothing"}]}],
        handleCardCategory: function () {},
        handleVideoInfo: function () {},
        showVideoCard: function () {},
        videoCard: {html: '<p>Hello</p>'}
    };

    it('renders CategoryRow', () => {
        wrapper = enzymeMountWithRouter(CategoryRow, props);
        expect(wrapper.find('.slider').exists()).to.be.true;
    });

});
