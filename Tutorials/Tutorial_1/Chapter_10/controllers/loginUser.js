const bcrypt = require('bcrypt') //We import the bcrypt package
const User = require('../models/User') //We import the User model
module.exports = (req, res) => {
    const { username, password } = req.body; //extract the username and password from the user login form with req.body.
    
    User.findOne({ username: username }, (error, user) => { //find just one user with the inputted username
        if (user) {  // if user exists proceed on to compare passwords
            bcrypt.compare(password, user.password, (error, same) => { // bcrypt.compare to compare the entered password with the hashed user
                if (same) { // If the passwords match, we redirect to the home page where you can see the list of blog posts
                    res.redirect('/')
                }
                else {
                    res.redirect('/auth/login')
                }// if passwords don’t match, we redirect back to the login page.
            })
        }
        else {
            res.redirect('/auth/login')
        }
    })
}