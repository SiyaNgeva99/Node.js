// Importing required modules
const express = require('express'); // Express framework for creating web applications
const bodyParser = require('body-parser'); // Body parser middleware for parsing incoming request bodies
const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling
const fileUpload = require('express-fileupload'); //adds the files property to the req object so that we can access the uploaded files using req.files.
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
//const validateMiddleware = require('./middleware/validationMiddleware');




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

//the new controller functions
app.get('/', homeController)



// Route for rendering the blog post creation form
app.get('/create', (req, res) => {
    res.render('create');
});

// Route for rendering a sample blog post
app.get('/samplepost', (req, res) => {
    res.render('samplepost');
});

// Route for rendering the blog post creation form 
const newPostController = require('./controllers/newPost');
app.get('/posts/new', newPostController) // request handlers

//the new controller functions
app.get('/post/:id', getPostController)

//the new controller functions
app.post('/posts/store', storePostController)

// const validateMiddleWare = (req, res, next) => {
//     if (req.files == null || req.body.title == null) {
//         return res.redirect('/posts/new')
//     }
//     next()
// };


// app.use('/posts/store', validateMiddleWare)

app.get('/auth/register', newUserController)

app.post('/users/register', storeUserController)

app.get('/auth/login', loginController);

app.post('/users/login',loginUserController)