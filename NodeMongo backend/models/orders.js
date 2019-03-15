const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    itmes: { type:Array, default:[]},
    lab: { type: Schema.Types.ObjectId, required: true },
    createdDate: { type: Date, default: Date.now },
   
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Order', schema);