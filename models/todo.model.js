const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        scheduled: {
            type: Date,
        },
        priority: {
            type: String,
        },
        labels: [{type: String}],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;