//const http = require('http');
const fs = require('fs');

const url = require('url');
const querystring = require('querystring');

const express = require('express');
const app = express();

var pageHits = [];

app.all('*', function(req, res, next) {
    pageHits[req.url] = pageHits[req.url] + 1 || 1;
    console.log(pageHits);
    next();
})

app.get('/form', function(request, response){
    var data = fs.readFile('index.html', function(err, data)
    {
        console.log(data.toString());
        response.end(data);  
    });
})

app.post('/completed', function(request, response){
    request.on('data', function(chunk){
        var rep = querystring.parse(chunk.toString(), '&', '=');
        if(rep.login == 'root' && rep.mdp == 'root'){
            var data = fs.readFile('completed.html', function(err, data)
            {
                response.end(data);  
            });
        }
        else{
            var data = fs.readFile('notcompleted.html', function(err, data)
            {
                response.end(data);  
            });
        }
    });
});

app.listen(1337);

console.log('Le serveur est lancé !');
