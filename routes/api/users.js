const express = require('express');
const router = express.Router();
const UserService = require('../../services/user.service');


router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await UserService.getUser(id);
    if(!user) {
      return res.status(404).json({error: 'User not found'});
    }
    return res.status(200).json({user: user});
  } catch (err) {
    if (err.name === 'ServerError') {
      return res.status(500).json({error: err.message});
    }
    return res.status(400).json({error: err.message});
  }
});

router.get('/:id/skills(:query)?', async(req, res) => {
  const {completed} = req.query;
  const id = req.params.id;
  if(completed) {
    try {
      const skills = await UserService.getSkills(id, +completed);
      return res.status(200).json(skills);
    } catch (err) {
      if (err.name === 'ServerError') {
        return res.status(500).json({error: err.message});
      }
      return res.status(400).json({error: err.message});
    }

  }
})

module.exports = router;
