import axios from 'axios';
import {fetchMetadataSent, fetchMetadataFailed, fetchMetadataSuccess, fetchCategoriesSuccess} from '../actions/video';
import fp from 'lodash/fp';

const transformVideoData = (data) => {

  const filteredAssets = [];

  data = data.filter((asset) => {
    return asset.metadata.MimeType === 'video';
  });

  for (const index in data) {

    const video = {
      title: '',
      thumbnail: '',
      author: '',
      company: '',
      category: '',
      email: '',
      assetid: ''
    }; 

    if (data.hasOwnProperty(index)) {
      const attr = data[index];
      video.title = attr.metadata.Title;
      video.thumbnail = attr.metadata.PosterURL;
      video.author = attr.metadata.UploadUserFullName;
      video.company = attr.metadata.UploadCompanyName;
      video.category = attr.metadata.Category || 'Uncategorized';
      video.email = attr.metadata.UploadUserEmail;
      video.assetid = attr.assetid;
      filteredAssets.push(video);
    }
  }

  return filteredAssets;

};

//Iterate through the fetched data, get all categories and return them.
const extractCategories = (data) => {
  const categories = [];

  for(let i = data.length; i>0; i--){
    let category = data[i-1].metadata.Category;

    if(!categories.includes(category) && category!=undefined){
      categories.push(category);
    }
  }

  return categories;
};

const initVideoList = (store) => {
  const config = {
    searchTerm: '',
    url: 'https://api-eu1.mediabank.me/mediabank/asset/'
  };

  store.dispatch(fetchMetadataSent());
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
  }).then((result) => {
    store.dispatch(fetchMetadataSuccess(transformVideoData(result.data.assets)));
    store.dispatch(fetchCategoriesSuccess(extractCategories(result.data.assets)));  
  });
  return promise;
};

//
export default initVideoList;
