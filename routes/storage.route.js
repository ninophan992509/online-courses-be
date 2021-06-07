const express = require('express');
const router = express.Router();
const storageService = require('../services/storage.service');
const Response = require('../response/response').Response;
const { v4 : uuidv4} = require('uuid');
uuidv4();

router.get('/upload-url', async function (req,res,next){
    try{
        const result = await storageService.generateV4UploadSignedUrl(uuidv4());
        res.status(200).json(new Response(null, true, result));
    }catch(error){
        next(error);
    }
})

module.exports = router;