const express = require('express');
const router = express.Router();
const UserService = require('../../services/user.service');



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

router.post(
    '/login',
    async (req, res) => {
        const userInfo = {
            email: req.body.email,
            password: req.body.password,
        };

        try {
            const {token, user} = await UserService.login(userInfo);
            return res.status(200).json({user: user, token: token});
        } catch (err) {
            if (err.name === 'ServerError') {
                return res.status(500).json({error: err.message});
            }
            return res.status(400).json({error: err.message});
        }
    },
);


module.exports = router;
