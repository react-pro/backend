const User = require('./schemas/user.schema');
const ServerError = require('../errors/ServerError');

class UserModel {
    async createUser({name, email, password}) {
        try {
            await User.create({name, email, password});
            return await User.find({email}).select('-password');
        } catch (err) {
            throw new ServerError(err.message);
        }
    }
    async isEmailExists(email) {
        try {
            return await User.findOne({email: email});
        } catch (err) {
            throw new ServerError(err.message);
        }
    }

    async findByEmail(email) {
        try {
            return User.findOne({email});
        } catch (err) {
            throw new ServerError(err.message);
        }
    }

    async findById(id) {
        try {
            return await User.findById(id).select('-password');
        } catch (err) {
            throw new ServerError(err.message);
        }
    }

    async getSkillList(id, completed) {
        try {
            const user = await User.findOne({_id: id}).select('skills');
            const userObject = user.toObject();
            return userObject.skills.filter(skill => skill.level >= completed);
        } catch (err) {
            throw new ServerError(err.message);
        }
    }

    async addSkill(id, {name, level}) {
        try {
            const update = {$push: {skills: {name, level}}}
            return await User.findOneAndUpdate({_id: id}, update,{new: true});
        } catch (err) {
            throw new ServerError(err.message);
        }
    }

    async addSkillsArray(id, skills) {
        try {
            const update = {$set: {skills: skills}}
            return await User.findOneAndUpdate({_id: id}, update);
        } catch (err) {
            throw new ServerError(err.message);
        }
    }
}

module.exports = new UserModel();
