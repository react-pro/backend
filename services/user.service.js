const UserModel = require('../models/user.model');
const CryptographyService = require('./cryptography.service');
const ServerError = require('../errors/ServerError');

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
}

module.exports = new UserService();
