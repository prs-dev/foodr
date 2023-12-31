const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    prep: {
        type: Number,
        required: true
    },
    cook: {
        type: Number,
        required: true
    },
    ingredients: [
        {
            type: String,
            required: true
        }
    ],
    method: [
        {
            type: String,
            required: true
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

module.exports = mongoose.model("Recipe", recipeSchema)