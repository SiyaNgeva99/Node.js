const express = require('express');
const path = require('path');

const app = new express();
const ejs = require('ejs');
app.set('view engine','ejs'); //we tell Express to use EJS as our templating engine

app.use(express.static('public')); //Express will expect all static assets to be in the public directory

app.listen(4000, () => {
    console.log('App listening on port 4000');
});

app.get('/',(req,res)=>{
    res.render('index');
    })

app.get('/about',(req,res)=>{
    //res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('about');
    })
    app.get('/contact',(req,res)=>{
    //res.sendFile(path.resolve(__dirname,'pages/contact.html'))
    res.render('contact');
    })
    app.get('/post',(req,res)=>{
    //res.sendFile(path.resolve(__dirname,'pages/post.html'))
    res.render('post')
    })