import axios from 'axios';
import {fetchMetadataSent, fetchMetadataFailed, fetchMetadataSuccess, fetchCategoriesSuccess} from '../actions/video';
import fp from 'lodash/fp';

const uncategorized = 'Uncategorized';

const transformVideoData = (data) => {

  let filteredAssets = [];

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
      video.category = attr.metadata.Category || uncategorized;
      video.email = attr.metadata.UploadUserEmail;
      video.assetid = attr.assetid;
      filteredAssets.push(video);
    }
  }

  // filteredAssets = groupBy(filteredAssets, (video) => video.category);
  filteredAssets = groupByCategories(filteredAssets, (video) => video.category);
  // console.log(filteredAssets);
  return filteredAssets;

};

const groupByCategories = (list, keyGetter) => {
    const collection = {};
    let key;
    //Categorize videos based on the category key
    list.forEach((item) => {
        key = keyGetter(item);
        if (collection.hasOwnProperty(key)) {
            collection[key].push(item);
        }else{
            collection[key] = [item];
        }
    });

    return collection;
};

// const groupBy = (list, keyGetter) => {
//     const map = new Map();
//
//     list.forEach((item) => {
//         const key = keyGetter(item);
//
//
//         const collection = map.get(key);
//
//         if (!collection) {
//             map.set(key, [item]);
//         } else {
//             collection.push(item);
//         }
//     });
//
//     return map;
// };

//Iterate through the fetched data, get all categories and return them.
const extractCategories = (videos) => {
  const categories = [];
  videos.forEach((value, key, map) => {
    categories.push(key);
  });
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
    const videos = transformVideoData(result.data.assets);
    // console.log(videos);
    // const categories = extractCategories(videos);
    const categories = Object.keys(videos);
    //store.dispatch(fetchMetadataSuccess(videos));
    store.dispatch(fetchCategoriesSuccess(categories));
  });
  return promise;
};

//
export default initVideoList;
