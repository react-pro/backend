const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SkillsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    links: [String]
});

module.exports = mongoose.model('Skill', SkillsSchema);
