import { enzymeMount, expect } from '../tests.helper';
import ProductCardMobile from '../../scripts/components/homepage/ProductCardMobile';

describe('ProductCardMobile', () => {
    let wrapper;

    const props = {
        active: 0,
        video: {
            item: {
                data: {
                    id: 2,
                    title: 'Lost In Time: Timetravel',
                    length: 2630,
                    description: 'Lost in Time description here, episode with id 2.',
                    views: 12,
                    preview_url: '#',
                    thumbnail: 'lost-in-time.jpg',
                    video_url: '731665178.mp4',
                    season_id: 1,
                    episode_number: 2,
                    tags: [
                        {
                            id: 1,
                            name: 'TVNorge',
                            type: 'Channel',
                            pivot: {
                                video_id: 2,
                                tag_id: 1,
                            },
                        },
                        {
                            id: 1,
                            name: 'TVNorge',
                            type: 'Channel',
                            pivot: {
                                video_id: 2,
                                tag_id: 1,
                            },
                        },
                    ],
                },
                _id: 2,
                _title: 'Lost In Time: Timetravel',
                _description: 'Lost in Time description here, episode with id 2.',
                _video_url: '731665178.mp4',
                _thumbnail: 'lost-in-time.jpg',
                _views: 12,
                _tags: [
                    {
                        id: 1,
                        name: 'TVNorge',
                        type: 'Channel',
                        pivot: {
                            video_id: 2,
                            tag_id: 1,
                        },
                    },
                    {
                        id: 1,
                        name: 'TVNorge',
                        type: 'Channel',
                        pivot: {
                            video_id: 2,
                            tag_id: 1,
                        },
                    },
                ],
            },
        },
    };

    it('renders a ProductCardMobile', () => {
        wrapper = enzymeMount(ProductCardMobile, props);
        expect(wrapper.find('.product-card-mobile').exists()).to.be.true;
    });
});
