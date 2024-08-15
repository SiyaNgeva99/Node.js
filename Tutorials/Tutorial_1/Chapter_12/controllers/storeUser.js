const User = require('../models/User.js')
const path = require('path')
module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            const validationErrors = Object.keys(error.errors).map(key => //map through the error.errors array keys
                error.errors[key].message) // access the key’s error message property
            req.flash('validationErrors', validationErrors)
            req.flash('data',req.body)
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}