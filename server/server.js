const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const authApiRoutes = require("./assets/js/routes/api-auth-router.js")
const storeApiRoutes = require("./assets/js/routes/api-store-router.js")
const basketApiRoutes = require("./assets/js/routes/api-basket-router.js")

const app = express()

app.set("view engine", 'ejs')

const port = 5000

const db = 'mongodb+srv://29147:kazakhstan001@burger.muoance.mongodb.net/?retryWrites=true&w=majority'

mongoose
    .connect(db)
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error))

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Listening port ${port}`)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(express.static('assets/js'))

app.use(authApiRoutes)
app.use(storeApiRoutes)
app.use(basketApiRoutes)

//https://cloud.mongodb.com/v2/646a5ae233ca892da0ca3ec1#/metrics/replicaSet/646a5b1ee0e76952b4133cb0/explorer/test/users/find
//http://localhost:5500/
//29147@iitu.edu.kz
//kazakhstan001

//cd '.\r_burger 2\'
//cd .\server\
//cd .\client\
//npm run dev