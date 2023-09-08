const express = require('express');
const {handleGenerateNewURL,
    handleGetAnalytics, } = require('../controllers/url')
const router = express.Router();

router.post('/',handleGenerateNewURL);

router.get('/analytics/:shortId')

module.exports = router;