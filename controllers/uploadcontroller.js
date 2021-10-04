const express = require('express');
const router = express.Router();
const {Upload} = require('../models');
const validateJWT = require('../middleware/ValidateSession');

const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');

const path = require('path');


const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    bucket: process.env.BUCKET_NAME
});


const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'mrbearnewbucket',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            console.log(req.body);
            cb(null, { fieldName: file.fieldname });
          },
        key: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    }),
});

//CREATE Upload -  
router.post('/create', validateJWT, upload.single('book'), async (req, res) => {
    try {
        const { title, author, published, bookUrl } = req.body;
        let newUpload = await Upload.create({ title, author, published, bookUrl: req.file.location, userId: req.user.id, bookId: req.user.id});
        res.status(200).json({
            upload: newUpload,
            message: 'Book uploaded!',
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Upload not complete!'
        })
    }
});

// GET ALL ENTRIES (http://localhost:4000/upload/)
router.get('/', (req, res) => {
    Upload.findAll ()
    .then(upload => res.status(200).json(upload))
    .catch(err => res.status(500).json({ error: err}))
});

//GET UPLOADS BY USER (http://localhost:4000/upload/mine (plus the token id))
router.get("/mine", validateJWT, (req, res) => {
    let userId = req.user.id
    Upload.findAll ({
        where: { userId: userId }
    })
        .then(upload => res.status(200).json(upload))
        .catch(err => res.status(500).json({ error: err }))
});


//UPLOADS UPDATE (http://localhost:4000/upload/update/2 

router.post("/update/:id", validateJWT, (req, res) => {
    const query = req.params.id;
    Upload.update(req.body,
        {where: {id: query}})
        .then((uploadUpdate) => {
            Upload.findOne({
                where: {
                    id: query
                }
            })
            .then((locatedUpdatedUpload) => {
                res.status(200).json({
                    book: locatedUpdatedUpload,
                    message: 'Upload updated successful',
                    uploadChanged: uploadUpdate
                })
            })
            .catch((err) => res.json(err))
        })
});

//UPLOAD DELETE (http://localhost:4000/delete/9 (put entry number to delete!))

router.delete('/delete/:id', validateJWT, function (req, res) {
    const query = { where: {id: req.params.id, userId: req.user.id }};
    
    Upload.destroy(query)
    .then(() => res.status(200).json({ message: 'Book Removed'}))
    .catch((err) => res.status(500).json ({ error: err }));
});


module.exports = router;