import axios from 'axios';
import { fetchVideosSuccess, fetchSeriesSuccess, fetchSeasonsSuccess, fetchTagsSuccess } from '../actions/fetchData';
// Classes:
import Video from '../classes/video';
import Tag from '../classes/tag';
import Series from '../classes/series';
import Season from '../classes/season';

const uncategorized = 'Uncategorized';

const createSeries = (seriesKey, seasonKey) => {
    const series = {
        key: seriesKey,
        title: seriesKey,
        seasonkey: seasonKey,
    };
    return new Series(series);
};

const createSeason = (seriesKey, seasonKey, seasonNumber, videoID) => {
    const season = {
        key: seasonKey,
        parentSeries: seriesKey,
        seasonNumber,
        episode: videoID,
    };
    return new Season(season);
};


const transformVideoData = (unfiltered, store) => {
    const allVideos = {};
    const allTags = {};
    const allSeries = {};
    const allChannels = {};
    const allSeasons = {};
    let seasonKey = '';

    let i = 0;

    const data = unfiltered.filter(asset => asset.metadata.MimeType === 'video');


  // If we want to limit the amount of data recieved, reduce the iterations in this for loop.
    for (const index in data) {
        if (i > 1000) { break; } // Stop after 1000 movies
        const video = {
            title: '',
            thumbnail: '',
            author: '',
            company: '',
            tag: '',
            email: '',
            id: 0,
            season: '',
            series: '',
            channel: '',
            rating: '',
        };

        const attr = data[index];
        video.id = Number(attr.assetid);
        video.author = attr.metadata.UploadUserFullName;
        video.channel = attr.metadata.Broadcaster;
        video.company = attr.metadata.UploadCompanyName;
        // video.email = attr.metadata.UploadUserEmail;
        video.rating = attr.metadata.Rating;
        video.season = attr.metadata.Season;
        video.series = attr.metadata.ProgramSeries;
        video.tags = attr.metadata.Category || uncategorized;
        video.title = attr.metadata.Title;
        video.thumbnail = attr.metadata.PosterURL;
        video.videoUrl = video.id; // asset id is for now used to get url.

        if (allChannels[video.channel]) {
            allChannels[video.channel].video = video.id;
        } else if (video.channel) {
            const channel = { key: video.channel, name: video.channel, videos: [video.id], type: 'channel' };
            allChannels[video.channel] = new Tag(channel);
            allChannels[video.channel].video = video.id;
        }

        // If tag exists push video to tag array.
        if (allTags[video.tags]) {
            allTags[video.tags].video = video.id;
        } else {
            const tag = { key: video.tags, name: video.tags, type: 'category' };
            allTags[video.tags] = new Tag(tag);
            allTags[video.tags].video = video.id;
        }

        // If the video have a series and season, add them to allSeasons and allSeries.
        if (video.series && video.season) {
            // Create a seasonkey since our backend doesent provide it yet.
            seasonKey = `${video.series}-${video.season}`;
            if (allSeasons[seasonKey]) {
                // Season & series exist, (the series must exist if the season does).
                // Therefore add the episode to the season.
                allSeasons[seasonKey].episode = video.id;
            } else if (allSeries[video.series]) {
                console.log("create season");
                // Series exist but not season.
                const season = createSeason(video.series, seasonKey, video.season, video.id);
                allSeries[video.season] = seasonKey;
                allSeasons[seasonKey] = season;
            } else {
                const season = createSeason(video.series, seasonKey, video.season, video.id);
                const series = createSeries(video.series, seasonKey);
                allSeasons[seasonKey] = season;
                allSeries[video.series] = series;
            }
        }
        allVideos[video.id] = new Video(video);
        i += 1;
    }
    // console.log("all channels", allChannels);
    // console.log("All tags:",allTags);
    // console.log("All videos",allVideos);
    // console.log("all series", allSeries);
    // console.log('all seasons', allSeasons);
    store.dispatch(fetchVideosSuccess(allVideos, i));
    store.dispatch(fetchTagsSuccess(allTags));
    store.dispatch(fetchTagsSuccess(allChannels));
    store.dispatch(fetchSeriesSuccess(allSeries));
    store.dispatch(fetchSeasonsSuccess(allSeasons));

    return true;
};

const initVideoList = (store) => {
    const config = {
        searchTerm: '',
        url: 'https://api-eu1.mediabank.me/mediabank/asset/',
    };

    // store.dispatch(fetchMetadataSent());
    const promise = axios({
        method: 'get',
        url: `${config.url}{"query_string":"${config.searchTerm}"}`,
        headers: {
            'Mediabank-API-Token': 'EqLlE0nhEr2oLQ8E64c7oNy5bchS3Nu1I0pJVsBhjEDxI2pJVsBLNED4YQ',
        },
        auth: {
            username: 'api',
            password: 'tv$&?QkD=8GBpvKD',
        },
    }).then((result) => {
        transformVideoData(result.data.assets, store);
    });
    return promise;
};

export default initVideoList;
