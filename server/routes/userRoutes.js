const router = require("express").Router()
const {authenticateUser} = require("../middlewares/auth")
const {registerUser, loginUser, profile} = require("../controllers/userController")


//test route
// router.get("/", (req, res) => {
//     res.json("user route reached")
// })

//register route
router.post('/register', registerUser)

//login route
router.post('/login', loginUser)


router.get('/profile', authenticateUser, profile)

module.exports = router