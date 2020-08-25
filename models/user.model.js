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
}

module.exports = new UserModel();