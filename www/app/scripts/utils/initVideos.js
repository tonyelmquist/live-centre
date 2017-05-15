import axios from 'axios';
import {fetchMetadataSent, fetchMetadataFailed, fetchMetadataSuccess} from '../actions/video';
import fp from 'lodash/fp';

const transformVideoData = (data) => {

  var filteredAssets = [];

  var filteredData = 
      data.filter((asset) => {
        return asset.metadata.MimeType === 'video';
      });

      console.log(filteredData);

  for (var index in filteredData) {

    var video = {};

    if (data.hasOwnProperty(index)) {
      var attr = data[index];
      video.title = attr.metadata.Title
      video.thumbnail = attr.metadata.PosterURL
      video.author = attr.metadata.UploadUserFullName
      video.company = attr.metadata.UploadCompanyName
      video.category = attr.metadata.Category
      video.email = attr.metadata.UploadUserEmail
      video.assetid = attr.assetid
      filteredAssets.push(video);
    }
  }

  return filteredAssets;

}

const initVideoList = (store) => {
  const config = {
    searchTerm: 'Lost',
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

    console.log(result.data);

    console.log(transformVideoData(result.data.assets));
    store.dispatch(fetchMetadataSuccess(transformVideoData(result.data.assets)));
  });
  return promise;
};

//
export default initVideoList;
