const { ErrorHandler } = require('../exceptions/error');
const db = require('../models');
const {Storage} = require('@google-cloud/storage');

const bucketName = 'online-course-316014.appspot.com';
const storage = new Storage({keyFilename: 'online-course-key.json'});

exports.generateV4UploadSignedUrl = async function(fileName){
    const options = {
        version: 'v4',
        action: 'write',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    const [url] = await storage
        .bucket(bucketName)
        .file(fileName)
        .getSignedUrl(options);

    const fileUrl = `https://storage.googleapis.com/online-course-316014.appspot.com/${fileName}`;
    return {signedUrl: url, fileUrl: fileUrl};
}