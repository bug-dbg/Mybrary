const mongoose = require('mongoose')

// Creation of Schema or tables in a db
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema)