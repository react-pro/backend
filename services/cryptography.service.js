const bcrypt = require('bcrypt');
const config = require('config');
const {saltRounds} = process.env.SALT_ROUNDS || config.SALT_ROUNDS;
const ServerError = require('../errors/ServerError');

class CryptographyService {
    async hashPassword(password) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            return await bcrypt.hash(password, salt);
        } catch (err) {
            throw new ServerError(err.message);
        }
    }

    async comparePasswords(password, userPassword) {
        return bcrypt.compare(password, userPassword).then((result) => {
            return result;
        });
    }
}

module.exports = new CryptographyService();
