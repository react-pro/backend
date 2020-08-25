const express = require('express');
const router = express.Router();
const UserService = require('../../services/user.service');

/* GET home page. */
router.post('/register', async (req, res, next) =>  {
   const {name, email, password} = req.body;

    try {
        const user = await UserService.createUser({name, email, password});
        return res.status(201).json({user: user});
    } catch (err) {
        if (err.name === 'ServerError') {
            return res.status(500).json({error: err.message});
        }
        return res.status(400).json({error: err.message});
    }
});

module.exports = router;
