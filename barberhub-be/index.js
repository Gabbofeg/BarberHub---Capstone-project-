const express = require('express')
const { default: mongoose } = require('mongoose')
const PORT = 4040
const cors = require('cors')


require('dotenv').config()

const server = express()

const usersRoute = require('./routes/users')
const productsRoute = require('./routes/products')
const availabilityRoute = require('./routes/availability')

server.use(express.json())
server.use(cors());

server.use('/', usersRoute),
server.use('/Prodotti', productsRoute),
server.use('/availability', availabilityRoute),

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Db connection error'))
db.once('open', () => {
    console.log('Db connected successfully')
})


server.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))