const jwt = require("jsonwebtoken")

const authenticateUser = (req, res, next) => {
    // console.log(req.headers.authorization.split(" "))
    const token = req?.headers?.authorization?.split(" ")[1]
    const user = jwt.verify(token, process.env.SECRET)
    if(!user) { 
        return res.status(400).json({err: "Invalid token!"})
    }
    req.user = user
    next()
}

module.exports = {
    authenticateUser
}