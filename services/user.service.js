const UserModel = require('../models/user.model');
const CryptographyService = require('./cryptography.service');
const ServerError = require('../errors/ServerError');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || require('config').JWT_SECRET;
const StorageS3 = require('../utils/awsStorage');

class UserService {
    async createUser(user) {
        const {email, password} = user;
        const isEmailExists = await UserModel.isEmailExists(email);
        if (isEmailExists) {
            throw new Error('This email is already exist in the system.');
        }

        try {
            user.password = await CryptographyService.hashPassword(password);
        } catch (err) {
            throw new ServerError('Error while hashing password.');
        }

        return await UserModel.createUser(user);
    }

    async login(userInfo) {
        const {email, password} = userInfo;
        const user = await UserModel.findByEmail(email);
        if (!user) {
            throw new Error('Wrong email');
        }
        const match = await CryptographyService.comparePasswords(
            password,
            user.password,
        );
        if (!match) {
            throw new Error('Wrong password');
        }
        const payload = {
            id: user._id,
            email: user.email,
            name: user.name
        };
        const jwtToken = jwt.sign(payload, secret);
        const userPasswordRemoved = user.toObject();
        delete userPasswordRemoved.password;
        return {token: jwtToken, user: userPasswordRemoved};
    }

    async getUser(id) {
        const user = await UserModel.findById(id);
        if (!user) return null;
        return user;
    }

    async getSkills(id, completed) {
        return await UserModel.getSkillList(id, completed);
    }

    async addOneSkill(id, skill) {
        return await UserModel.addSkill(id, skill);
    }

    async updateAvatar(id, image) {
        const user = await UserModel.findById(id);
        if (!user) {
            throw new Error('User not found!');
        }
        const imageData = await StorageS3.upload(image, id);
        const imageLocation = imageData.Location;
        await UserModel.updateAvatar(id, imageLocation);
        return imageLocation;
    }

    async updateUser(id, skills, direction) {
        return await UserModel.updateUser(id, skills, direction);
    }
}

module.exports = new UserService();
