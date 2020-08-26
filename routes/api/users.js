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

    try {
      if(completed) {
        const skills = await UserService.getSkills(id, +completed);
        return res.status(200).json(skills);
      } else {
        const skills = await UserService.getSkills(id, 0);
        return res.status(200).json(skills);
      }
    } catch (err) {
      if (err.name === 'ServerError') {
        return res.status(500).json({error: err.message});
      }
      return res.status(400).json({error: err.message});
    }
})

router.patch('/:id/skills', async(req, res) => {
  const id = req.params.id;
  const skill = {
    name: req.body.name,
    level: req.body.level
  }
  try {
    await UserService.addOneSkill(id, skill);
    return res.status(200).json('Skill was added.');
  } catch (err) {
    if (err.name === 'ServerError') {
      return res.status(500).json({error: err.message});
    }
    return res.status(400).json({error: err.message});
  }
})

router.post('/:id/skillset', async(req, res) => {
  const id = req.params.id;
  if(!id) {
    return res.status(404).json("No ID provided");
  }
  const skills = req.body;

  try {
    const user = await UserService.addArrayOfSkills(id, skills);
    if(!user) {
      return res.status(404).json("No such user");
    }
    return res.status(200).json('Skills were added.');
  } catch (err) {
    if (err.name === 'ServerError') {
      return res.status(500).json({error: err.message});
    }
    return res.status(400).json({error: err.message});
  }

})

module.exports = router;
