const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    Items: require('../models/item'),
    Labs: require('../models/Lab'),
    Users: require('../models/users'),
    LabItems: require('../models/LabItemMap'),
    Settings: require('../models/settings'),
    Orders: require('../models/orders')
};