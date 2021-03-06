// We aren't using MasonryTiles component anywhere in code, so commented out.

// import sinon from 'sinon';
// import { enzymeMount, expect } from '../tests.helper';
// import MasonryTiles from '../../scripts/components/common/MasonryTiles';

// describe('MasonryVideos', () => {
//     const props = {
//         filter: ['Lost In Time'],
//         videos: [
//             {
//                 data: {
//                     id: 1,
//                     title: 'Lost In Time: Lost forever',
//                     length: 2659,
//                     description: 'Lost in Time description here, episode with id 1.',
//                     views: 12,
//                     preview_url: '#',
//                     thumbnail: 'lost-in-time.jpg',
//                     videoUrl: '731646302.mp4',
//                     season_id: 1,
//                     episode_number: 1,
//                     tags: [
//                         {
//                             id: 1,
//                             name: 'TVNorge',
//                             type: 'Channel',
//                             pivot: {
//                                 video_id: 1,
//                                 tag_id: 1,
//                             },
//                         }, {
//                             id: 2,
//                             name: 'Game Show',
//                             type: 'Genre',
//                             pivot: {
//                                 video_id: 1,
//                                 tag_id: 2,
//                             },
//                         },
//                     ],
//                 },
//                 _id: 1,
//                 _title: 'Lost In Time: Lost forever',
//                 _description: 'Lost in Time description here, episode with id 1.',
//                 _videoUrl: '731646302.mp4',
//                 _thumbnail: 'lost-in-time.jpg',
//                 _views: 12,
//                 _tags: [
//                     {
//                         id: 1,
//                         name: 'TVNorge',
//                         type: 'Channel',
//                         pivot: {
//                             video_id: 1,
//                             tag_id: 1,
//                         },
//                     }, {
//                         id: 2,
//                         name: 'Game Show',
//                         type: 'Genre',
//                         pivot: {
//                             video_id: 1,
//                             tag_id: 2,
//                         },
//                     },
//                 ],
//             }, {
//                 data: {
//                     id: 2,
//                     title: 'Lost In Time: Timetravel',
//                     length: 2630,
//                     description: 'Lost in Time description here, episode with id 2.',
//                     views: 12,
//                     preview_url: '#',
//                     thumbnail: 'lost-in-time.jpg',
//                     videoUrl: '731665178.mp4',
//                     season_id: 1,
//                     episode_number: 2,
//                     tags: [
//                         {
//                             id: 1,
//                             name: 'TVNorge',
//                             type: 'Channel',
//                             pivot: {
//                                 video_id: 2,
//                                 tag_id: 1,
//                             },
//                         }, {
//                             id: 1,
//                             name: 'TVNorge',
//                             type: 'Channel',
//                             pivot: {
//                                 video_id: 2,
//                                 tag_id: 1,
//                             },
//                         },
//                     ],
//                 },
//                 _id: 2,
//                 _title: 'Lost In Time: Timetravel',
//                 _description: 'Lost in Time description here, episode with id 2.',
//                 _videoUrl: '731665178.mp4',
//                 _thumbnail: 'lost-in-time.jpg',
//                 _views: 12,
//                 _tags: [
//                     {
//                         id: 1,
//                         name: 'TVNorge',
//                         type: 'Channel',
//                         pivot: {
//                             video_id: 2,
//                             tag_id: 1,
//                         },
//                     }, {
//                         id: 1,
//                         name: 'TVNorge',
//                         type: 'Channel',
//                         pivot: {
//                             video_id: 2,
//                             tag_id: 1,
//                         },
//                     },
//                 ],
//             }, {
//                 data: {
//                     id: 3,
//                     title: 'Lost In Time: Third episode',
//                     length: 2610,
//                     description: 'Lost in Time description here, episode with id 3',
//                     views: 12,
//                     preview_url: '#',
//                     thumbnail: 'lost-in-time.jpg',
//                     videoUrl: '739140174.mp4',
//                     season_id: 1,
//                     episode_number: 3,
//                     tags: [],
//                 },
//                 _id: 3,
//                 _title: 'Lost In Time: Third episode',
//                 _description: 'Lost in Time description here, episode with id 3',
//                 _videoUrl: '739140174.mp4',
//                 _thumbnail: 'lost-in-time.jpg',
//                 _views: 12,
//                 _tags: [],
//             }, {
//                 data: {
//                     id: 4,
//                     title: 'Lost In Time: Fourth episode',
//                     length: 2699,
//                     description: 'Lorem ipsum lost in time amet. id: 4.',
//                     views: 12,
//                     preview_url: '#',
//                     thumbnail: 'lost-in-time.jpg',
//                     videoUrl: '739140172453.mp4',
//                     season_id: 1,
//                     episode_number: 4,
//                     tags: [],
//                 },
//                 _id: 4,
//                 _title: 'Lost In Time: Fourth episode',
//                 _description: 'Lorem ipsum lost in time amet. id: 4.',
//                 _videoUrl: '739140172453.mp4',
//                 _thumbnail: 'lost-in-time.jpg',
//                 _views: 12,
//                 _tags: [],
//             }, {
//                 data: {
//                     id: 5,
//                     title: 'Lost In Time: Episode five',
//                     length: 2711,
//                     description: 'Lost in Time description here. id;5',
//                     views: 12,
//                     preview_url: '#',
//                     thumbnail: 'lost-in-time.jpg',
//                     videoUrl: '204173947.mp4',
//                     season_id: 1,
//                     episode_number: 5,
//                     tags: [
//                         {
//                             id: 3,
//                             name: 'Comedy',
//                             type: 'Genre',
//                             pivot: {
//                                 video_id: 5,
//                                 tag_id: 3,
//                             },
//                         }, {
//                             id: 3,
//                             name: 'Comedy',
//                             type: 'Genre',
//                             pivot: {
//                                 video_id: 5,
//                                 tag_id: 3,
//                             },
//                         },
//                     ],
//                 },
//                 _id: 5,
//                 _title: 'Lost In Time: Episode five',
//                 _description: 'Lost in Time description here. id;5',
//                 _videoUrl: '204173947.mp4',
//                 _thumbnail: 'lost-in-time.jpg',
//                 _views: 12,
//                 _tags: [
//                     {
//                         id: 3,
//                         name: 'Comedy',
//                         type: 'Genre',
//                         pivot: {
//                             video_id: 5,
//                             tag_id: 3,
//                         },
//                     }, {
//                         id: 3,
//                         name: 'Comedy',
//                         type: 'Genre',
//                         pivot: {
//                             video_id: 5,
//                             tag_id: 3,
//                         },
//                     },
//                 ],
//             },
//         ],
//     };

//     let wrapper;

//     it('calls the render function', () => {
//         sinon.spy(MasonryTiles.prototype, 'render');
//         wrapper = enzymeMount(MasonryTiles, props);
//         expect(MasonryTiles.prototype.render.calledOnce)
//             .to
//             .equal(true);
//     });

//     it('calls the videoFilter function', () => {
//         sinon.spy(MasonryTiles.prototype, 'videoFilter');
//         wrapper = enzymeMount(MasonryTiles, props);
//         expect(MasonryTiles.prototype.videoFilter.called)
//             .to
//             .equal(true);
//     });

//     it('calls the compare function', () => {
//         sinon.spy(MasonryTiles.prototype, 'compare');
//         wrapper = enzymeMount(MasonryTiles, props);
//         expect(MasonryTiles.prototype.compare.called)
//             .to
//             .equal(true);
//     });

//     it('renders a MasonryTile', () => {
//         wrapper = enzymeMount(MasonryTiles, props);
//         expect(wrapper.find('.masonry_tiles').exists()).to.be.true;
//     });
// });
