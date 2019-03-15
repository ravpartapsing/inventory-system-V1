const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    name: { type: String, unique: true, required: true },
    code: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: String, required: true },
    company: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    photo:{ type: String, required: false }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Item', schema);