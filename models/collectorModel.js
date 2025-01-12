const mongoose = require('mongoose')
const collectorSchema = mongoose.Schema({
    context:{type:Object},
    message:{type:Object}
})
const collectorModel = mongoose.model('collectorRecon',collectorSchema);
module.exports = collectorModel;