const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const { sendResponseMiddleware } = require("./src/middlewares/helper.js")
const PORT = process.env.PORT || 3000
const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
}))
app.use(express.json())
app.use(sendResponseMiddleware)


mongoose.connect(process.env.MONGODB_URL)
mongoose.connection.on("error", (error) => {
    console.log(error)
    process.abort()
})

app.get("/", (_req, res) => {
    res.sendResponse({ message: "Welcome to Coffee Shop API!"})
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})