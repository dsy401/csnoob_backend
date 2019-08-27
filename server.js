
// const server = http.createServer(app);
//
// server.listen(port)

// const fs = require('fs')
// const https = require('https')
const http = require('http')
const app =require('./app')

// //ssl
// const privateKey = fs.readFileSync('./path/to/private.pem','utf8')
// const certificate = fs.readFileSync('./path/to/file.crt','utf8')
// const credentials = {key:privateKey,cert:certificate}
// //

// //https
// const https_port = process.env.PORT || 3001;
// const https_server = https.createServer(credentials,app);

//http
const http_port = process.env.PORT || 3000;
const http_server = http.createServer(app);

//listen the ports
// https_server.listen(https_port)

http_server.listen(http_port)
