const express = require("express")
require("dotenv").config()
const cors = require("cors")
const userRouter = require("./routes/userRoutes")
const recipeRouter = require("./routes/recipeRoutes")

const {dbConnect} = require("./utils/db")

const app = express()

app.use(express.static("dist"))
app.use(express.json())
app.use(cors())
app.use("/users", userRouter)
app.use("/recipes", recipeRouter)

const PORT = process.env.PORT || 5000 

dbConnect()
.then(() => {
    console.log("Database connected!")
    app.listen(PORT, () => {
        console.log("server listening to PORT " + PORT)
    })
})
.catch((err) => console.log(err))



