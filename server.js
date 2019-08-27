// const http = require('http')
// const app = require('./app');
//
// const port = process.env.PORT || 3000;
//
// const server = http.createServer(app);
//
// server.listen(port)

const fs = require('fs')
const https = require('https')
const app =require('./app')

//ssl
const privateKey = fs.readFileSync('./path/to/private.pem','utf8')
const certificate = fs.readFileSync('./path/to/file.crt','utf8')
const credentials = {key:privateKey,cert:certificate}
//

const port = process.env.PORT || 3000;
const server = https.createServer(credentials,app);
server.listen(port)
