const User = require('../models/User')

module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user) => { //fetch the user from the database with User.findById(req.session.userId
        if (error || !user) //check if the user is retrieved successfully or if the user doesn’t exist
            return res.redirect('/') //direct back to the home page

        next() //If the user is a valid user, we permit the request and carry on with next().If the user is a valid user, we permit the request and carry on with next().
    })
}