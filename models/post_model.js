const mongoose = require("mongoose")

const post_schema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    creator_id: {
        type: String,
        required: true
    },
    post_title: {
        type: String,
        required: true
    },
    post_text: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model("Post", post_schema)