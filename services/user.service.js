const UserModel = require('../models/user.model');
const CryptographyService = require('./cryptography.service');
const ServerError = require('../errors/ServerError');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || require('config').JWT_SECRET;

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
}

module.exports = new UserService();
