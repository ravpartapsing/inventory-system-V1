const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    settingKey: { type: String, unique: true, required: true },
    settingValue: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('settings', schema);