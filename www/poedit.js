// /* eslint-disable */
const path = require('path');
const fs = require('fs');
const request = require('request');
const Promise = require('es6-promise');

const PROJECT_ID = 104689;
const API_TOKEN = '0d36857d7f34f6c989047add811b141d';
const URL_UPLOAD = 'https://api.poeditor.com/v2/projects/upload';
const URL_EXPORT = 'https://api.poeditor.com/v2/projects/export';
const BASE_DIR = path.resolve(__dirname, 'app/locale/');


//UPLOAD FILE CONFIG OBJECT
const form_data_upload = {
    "api_token" : API_TOKEN,
    "id": PROJECT_ID,
    "language" : "en-us",
    "overwrite": 1,
    "fuzzy_trigger": 1,
    "updating" : "terms_translations" // terms | terms_translations | translations
    // "sync_terms": 1,
};


//EXPORT FILE CONFIG OBJECT
const form_data_export = {
    "api_token" : API_TOKEN,
    "id": PROJECT_ID,
    "language" : "nb",
    "type" : "po"
};


//Main function that uploads or downloads PO files based on the passed params
function poUpdate(task, overwrite, purge){

    if (overwrite){
        form_data_upload.overwrite = 0; // 1: overwrite translations
    }

    form_data_upload.sync_terms = (purge) ? 1 : 0; //Set it to 1 if you want to sync your terms (terms that are not found in the uploaded file will be deleted from project and the new ones added).

    switch (task.toLowerCase()[0]){
        case 'u':
            return uploadFile(path.resolve(BASE_DIR, 'en_us.po'), form_data_upload);
            // break;
        default:
            return exportFile(path.resolve(BASE_DIR, 'nb_no.po'), form_data_export);
    }
}

//Function that handls file upload to poeditor.com
function uploadFile(src, formData){

    return new Promise((resolve, reject) => {
        try{
            formData.file = fs.createReadStream(src);
        }
        catch(err){
            reject(err);
        }

        request.post({url:URL_UPLOAD, formData: formData}, (err, res, data) => {
            if (err) {
                reject(err);
            }

            resolve();
        });
    });

}


//Function that handls file download from poeditor.com using its export api
function exportFile(dest, formData){

    return new Promise((resolve, reject) => {
        request.post({url:URL_EXPORT, formData: formData}, (err, res, data) => {
            if (err) {
                reject(err);
            }

            const src = JSON.parse(data).result.url;
            //Copy file from remote server to local destination
            copyFile(src, dest).then(resolve).catch(reject);
        });
    });

    request.post({url:URL_EXPORT, formData: formData}, (err, res, data) => {
        if (err) {
            return console.error('Request Failed:', err);
        }

        const src = JSON.parse(data).result.url;
        //Copy file from remote server to local destination
        return copyFile(src, dest);
    });

}

//Function makes a local copy of a file at 'src' to path defined in 'dest'
function copyFile(src, dest){
    return new Promise( (resolve, reject) => {
        if (src) {
            const fstream = fs.createWriteStream(dest);
            request(src)
                .on('error', (e) => { reject(e); })
                .pipe(fstream)
                .on('error', (e) => { reject(e); })
                .on('close', () => { resolve(); });
        }
    });

}

module.exports = poUpdate;
