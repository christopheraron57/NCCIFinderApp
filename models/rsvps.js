
const {v4: uuidv4} = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rsvpSchema = new Schema({
    value: {type: String, required:[true, 'value is required']},
    userID:  {type: Schema.Types.ObjectId, ref: 'User'},
    connectionID:  {type: Schema.Types.ObjectId, ref: 'Connection'}
})

//collection name is connections in the database
module.exports =  mongoose.model('Rsvp', rsvpSchema);