const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        todos: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Todo",
            },
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        collaborators: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
        ],
    },
    { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;