const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring');
const UserModel = require('../../models/user.model');
const pathToService = process.env.SKIllSET_URL || require('config').SKIllSET_URL;


router.get('/:id', async (req, res, next) => {
    const results = req.body.results;
    const id = req.params.id;
    if (!id) {
        return res.status(404).json("No id provided");
    }
    const user = await UserModel.findById(id);

    try {
        const response = await axios.get(pathToService, querystring.stringify({branch: user.preference}));
        return res.status(200).json(response);
    } catch (err) {
        return res.status(400).json(err);
    }


});

module.exports = router;
