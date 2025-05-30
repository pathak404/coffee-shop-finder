const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const { sendResponseMiddleware } = require("./src/middlewares/helpers")
const router = require("./src/routes")

const PORT = process.env.PORT || 8080
const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())
app.use(sendResponseMiddleware)
app.use(router)

mongoose.connect(process.env.MONGODB_URL)
mongoose.connection.on("error", (error) => {
    console.log(error)
    process.abort()
})
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB")
})

app.get("/", (_req, res) => {
    res.sendResponse({ message: "Welcome to Coffee Shop API!"})
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})