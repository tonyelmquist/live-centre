import {enzymeShallow, expect} from '../tests.helper.js';
import ProductCardContainer from '../../scripts/containers/homepage/CardContainer';
import sinon from 'sinon';

describe('ProductCardContainer', () => {

    const props = {
        index: 0,
        isVisible: true,
        video: {
            item: {
                    id: 1,
                    title: "Lost In Time: Lost forever",
                    length: 2659,
                    description: "Lost in Time description here, episode with id 1.",
                    views: 12,
                    preview_url: "#",
                    thumbnail: "lost-in-time.jpg",
                    video_url: "731646302.mp4",
                    season_id: 1,
                    episode_number: 1,
                    tags: [
                        {
                            id: 1,
                            name: "TVNorge",
                            type: "Channel"
                        }, {
                            id: 2,
                            name: "Game Show",
                            type: "Genre"
                        }
                    ]
                
            }
        }
    }

    let wrapper;

/*    it('calls the render function', () => {
        sinon.spy(ProductCardContainer.prototype, 'render');
        wrapper = enzymeShallow(ProductCardContainer, props);
        expect(ProductCardContainer.prototype.render.calledOnce)
            .to
            .equal(true);
    });*/

})
