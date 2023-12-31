const { authenticateUser } = require("../middlewares/auth")
const {allRecipes, singleRecipe, updateRecipe, addRecipe, deleteRecipe} = require("../controllers/recipeController")
const router = require("express").Router()

//get all recipes
router.get('/all', allRecipes)

//single recipe
router.get('/:id', singleRecipe)

//update single recipe (auth route)
router.put('/edit/:recipeId',authenticateUser, updateRecipe)

//add recipe (auth route)
router.post("/add", authenticateUser, addRecipe)

//delete recipe
router.delete('/delete/:recipeId',authenticateUser, deleteRecipe)


module.exports = router