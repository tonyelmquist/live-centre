import axios from 'axios';
import {fetchMetadataSent, fetchMetadataFailed, fetchMetadataSuccess} from '../actions/video';

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
        'Mediabank-API-Token': 'EqLlE0nhEr2oLQ8E64c7oNy5bchS3Nu1I0pJVsBhjEDxI2pJVsBLNED4YQ',
      },
      auth: {
        username: 'api',
        password: 'tv$&?QkD=8GBpvKD'
      }
    })
    .then( (result) => {
        const filteredAssets = result.data.assets.filter( (asset)=> {
          return asset.metadata.MimeType === 'video';
        });

        console.log(filteredAssets);


        store.dispatch(fetchMetadataSuccess(filteredAssets));
    });
    return promise;
};

//
export default initVideoList;
