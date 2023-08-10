
const {v4: uuidv4} = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const connectionSchema = new Schema({
    title:  {type: String, required:[true, 'title is required']},
    topic:  {type: String, required:[true, 'topic is required'],
                minLength: [5, 'the topic should have at least 5 characters']},
    details:  {type: String, required:[true, 'details is required'],
                minLength: [10, 'the details should have at least 10 characters']},
    date:  {type: String, required:[true, 'date is required']},
    startTime:  {type: String, required:[true, 'start time is required']},
    endTime:  {type: String, required:[true, 'end time is required']},
    hostName:  {type: Schema.Types.ObjectId, ref: 'User'},
    venue:  {type: String, required:[true, 'venue is required'],
                minLength: [5, 'the venue should have at least 10 characters']},
    imageUrl:  {type: String, required:[true, 'image url is required']},
})

//collection name is connections in the database
module.exports =  mongoose.model('Connection', connectionSchema);
