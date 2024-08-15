const http = require('http')
const fs = require('fs')  //We import a file system module ‘fs’ which helps us interact with files on our server.
const homePage = fs.readFileSync('index.html')
const aboutPage = fs.readFileSync('about.html')
const contactPage = fs.readFileSync('contact.html')
const notFoundPage = fs.readFileSync('notfound.html')

const server = http.createServer((req, res) => {  //createServer method from http package
    // console.log(req.url)
    // res.end('Hello Node.js')
    if (req.url === '/about')
        res.end(aboutPage)
    else if (req.url === '/contact')
        res.end(contactPage)
    else if (req.url === '/')
        res.end(homePage)
    else {
        res.writeHead(404)
        rres.end(notFoundPage)
    }
}) //does not contain static text, now contains
server.listen(3000)