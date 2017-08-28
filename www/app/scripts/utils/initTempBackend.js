import axios from 'axios';

import Series from '../classes/series';
import Video from '../classes/video';
import Tag from '../classes/tag';
import { fetchVideoSuccess, fetchSeriesSuccess, fetchTagsSuccess } from '../actions/fetchData';


const config = {
    url: 'http://ec2-35-158-87-9.eu-central-1.compute.amazonaws.com/',
};

const getData = param => axios({
    method: 'get',
    url: `${config.url + param}`,
    headers: {
        Authorization: 'Basic mcAPI2o17-H35t-password',
    },
});

const initTempBackend = (store) => {
    getData('videos').then((response) => {
        const Videos = [];
        for (let i = 0; i < response.data.length; i++) {
            Videos.push(new Video(response.data[i]));
        }
        store.dispatch(fetchVideoSuccess(Videos));
    });

    getData('series').then((response) => {
        const AllSeries = [];
        for (let i = 0; i < response.data.length; i++) {
            AllSeries.push(new Series(response.data[i]));
        }

        store.dispatch(fetchSeriesSuccess(AllSeries));
    });

    getData('tags').then((response) => {
        const AllTags = [];
        for (let i = 0; i < response.data.length; i++) {
            AllTags.push(new Tag(response.data[i]));
        }
        store.dispatch(fetchTagsSuccess(AllTags));
    });


/*
getData("seasons").then(function(response){
    console.log("seasons", response.data);
    //Save to store
    //seasonsFetched(response.data);
});

getData("channels").then(function(response){
    console.log("channels", response.data);
    //Save to store
    //channelsFetched(response.data);
});

getData("tags").then(function(response){
    console.log("tags", response.data);
    //tagsFetched(response.data);
    //Save to store
}); */
};


export default initTempBackend;
