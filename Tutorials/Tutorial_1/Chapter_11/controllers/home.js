const BlogPost = require('../models/BlogPost.js')
module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({})
    console.log(req.session)// when you log in and go to home page it displays cookie data with usedID info
    res.render('index', {
        blogposts
    });
}