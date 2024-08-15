// Importing required modules
const express = require('express'); // Express framework for creating web applications
const path = require('path'); // Path module for working with file and directory paths
const bodyParser = require('body-parser'); // Body parser middleware for parsing incoming request bodies
const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling
const BlogPost = require('./models/BlogPost'); // Importing the BlogPost model
const fileUpload = require('express-fileupload'); //adds the files property to the req object so that we can access the uploaded files using req.files.


// Creating an Express application instance
const app = new express();


//We then register the package in Express with app.use
app.use(fileUpload())

// Setting the view engine to EJS
app.set('view engine', 'ejs');

// Serving static files from the 'public' directory
app.use(express.static('public'));

// Parsing JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connecting to MongoDB database named 'my_database'
mongoose.connect('mongodb://localhost/my_database', { useUnifiedTopology: true, useNewUrlParser: true });

// Starting the server and listening on port 4000
app.listen(4000, () => {
    console.log('App listening on port 4000');
});

// Route for rendering the home page and fetching all blog posts
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts: blogposts
    });
});

// Route for rendering the about page
app.get('/about', (req, res) => {
    res.render('about');
});

// Route for rendering the contact page
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Route for rendering the blog post creation form
app.get('/create', (req, res) => {
    res.render('create');
});

// Route for rendering a sample blog post
app.get('/samplepost', (req, res) => {
    res.render('samplepost');
});

// Route for rendering the blog post creation form
app.get('/posts/new', (req, res) => {
    res.render('create')
});

// Route for rendering a specific blog post by its ID
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost: blogpost
    });
});

// Route for storing a new blog post
app.post('/posts/store', async (req, res) => {
    try {
        let image = req.files.image;// creates shortcut to req.files.image with image
        await image.mv(path.resolve(__dirname, 'public/img', image.name)); //image.mv moves the uploaded file to public/img directory with the name from image.name.
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// const customMiddleWare = (req,res,next)=>{
//     console.log('Custom middle ware called')
//     next()
//     }
//     app.use(customMiddleWare)


    const validateMiddleWare = (req, res, next) => {
        if (req.files == null || req.body.title == null) {
            return res.redirect('/posts/new')
        }
        next()
    };
    
    app.use('/posts/store', validateMiddleWare)