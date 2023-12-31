const User = require("../models/User")
const Recipe = require("../models/Recipe")

const allRecipes = async(req, res) => {
    try {
        const recipes = await Recipe.find({})
        return res.status(200).json({recipes})
    } catch (error) {
        console.log(error)
    }
}

const singleRecipe = async(req, res) => {
    try {
        const recipeId = req.params.id
        const recipe = await Recipe.findById(recipeId)
        return res.status(200).json({recipe})
    } catch (error) {
        console.log(error)
    }
}

const updateRecipe = async(req, res) => {
    try {
        const recipeId = req.params.recipeId
        const recipe = await Recipe.findById(recipeId)
        const user = recipe.user.toString()
        // console.log(user===req.user.id)
        if(user !== req.user.id) {
            return res.status(400).json({err: "You are not authorized!"})
        }
        const newRecipe = {...req.body, user}
        await Recipe.findByIdAndUpdate(recipeId, newRecipe)
        return res.json({msg: "Recipe updated"})
    } catch (error) {
        console.log(error)
    }
}

const addRecipe = async(req, res) => {
    try {
        const user = await User.findById(req.user.id)
        // console.log(userId)
        // console.log(req.body)
        const details = {...req.body, user: req.user.id}
        const recipe = await Recipe.create(details)
        user.recipes = user.recipes.concat(recipe._id)
        await user.save()
        return res.status(200).json({recipe})
    } catch (error) {
        console.log(error)
    }
}

const deleteRecipe = async(req, res) => {
    try {
        const recipeId = req.params.recipeId
        const recipe = await Recipe.findById(recipeId)
        const user = recipe.user.toString()
        // console.log(user===req.user.id)
        if(user !== req.user.id) {
            return res.status(400).json({err: "You are not authorized!"})
        }
        await Recipe.findByIdAndDelete(recipeId)
        return res.json({msg: "Recipe Deleted"})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    allRecipes,
    singleRecipe,
    updateRecipe,
    addRecipe,
    deleteRecipe
}