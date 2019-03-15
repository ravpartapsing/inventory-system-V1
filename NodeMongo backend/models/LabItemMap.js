const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    itmes: { type:Schema.Types.ObjectId, required:true},
    lab: { type:  Schema.Types.ObjectId, required: true },
    itmcount:{type:Number,required:true},
    createdDate: { type: Date, default: Date.now },
   
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('LabItem', schema);