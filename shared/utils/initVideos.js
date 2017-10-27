import axios from 'axios';
import { fetchVideosSuccess, fetchVideoFailed, categoryUpdateSuccess } from '../actions';

const filterFields = asset => ({
    id: asset.assetid,
    title: asset.metadata.Title,
    author: asset.metadata.UploadUserFullName,
    channel: asset.metadata.Broadcaster,
    company: asset.metadata.UploadCompanyName,
    rating: asset.metadata.Rating,
    season: asset.metadata.Season,
    duration: asset.metadata.GeneralDuration,
    series: asset.metadata.ProgramSeries,
    tags: asset.metadata.Category || 'Uncategorized',
    thumbnail: asset.metadata.PosterURL,
    videoUrl: asset.assetid // asset id is now used to get the url.
});

const categorize = (video, index, propName, list) => {
    const categoryName = video[propName];
    if (categoryName && categoryName !== '-1') {
        list[categoryName] ? list[categoryName].push(index) : (list[categoryName] = [index]);
    }
};

const processVideos = (data) => {
    const tags = {};
    // const channels = {};
    let index = 0;

    const videos = [];

    for (const asset of data.assets) {
        const video = filterFields(asset);
        videos.push(video);
        categorize(video, index, 'tags', tags);
        // video.tags && tags.add(video.tags);
        // video.channel && channels.add(video.channel);
        index += 1;
    }
    // console.log(tags);
    return { videos, categories: tags };
};

const initVideoList = (dispatch, userConfig) => {
    const config = userConfig || {
        searchTerm: '',
        url: 'https://api-eu1.mediabank.me/mediabank/asset/'
    };

    const promise = axios({
        method: 'get',
        url: `${config.url}{"query_string":"${config.searchTerm}"}`,
        headers: {
            'Mediabank-API-Token': 'EqLlE0nhEr2oLQ8E64c7oNy5bchS3Nu1I0pJVsBhjEDxI2pJVsBLNED4YQ'
        },
        auth: {
            username: 'api',
            password: 'tv$&?QkD=8GBpvKD'
        }
    })
        .then((res) => {
            const data = processVideos(res.data);
            dispatch(fetchVideosSuccess(data.videos));
            dispatch(categoryUpdateSuccess(data.categories));
            // console.log(data);
            return data;
        })
        .catch((err) => {
            // console.warn(error);
            dispatch(fetchVideoFailed());
            return { error: err.message };
        });

    return promise;
};

export default initVideoList;
