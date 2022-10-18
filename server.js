const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Voilà la réponse du serveur !');
});

server.listen(process.env.PORT || 8000);