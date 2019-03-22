const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    labname: { type: String, unique: true, required: true },
    instructor: { type: Schema.Types.ObjectId, required: true },
    logo: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
   
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Lab', schema);