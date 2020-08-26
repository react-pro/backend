const express = require('express');
const router = express.Router();
const axios = require('axios');
const UserModel = require('../../models/user.model');
const pathToService = process.env.SKIllSET_URL || require('config').SKIllSET_URL;

const PREF = {
    backend: "BE",
    frameworks: "FE",
    frontend: "DESIGN"
}

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        return res.status(404).json("No id provided");
    }
    const user = await UserModel.findById(id);
    const direction = user.preference;
    const branch = PREF[direction] || 'ALL';

    try {
        const response = await axios.get(`${pathToService}/api/skill?branch=${branch}`);
        return res.status(200).json(response.data);
    } catch (err) {
        return res.status(400).json(err);
    }


});

module.exports = router;
