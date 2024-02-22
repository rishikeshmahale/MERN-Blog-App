const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    postId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true
    }
},{timestamps:true})

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;