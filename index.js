const express = require('express');
const app = express();
const port = 5000;
const fs = require('fs');

// Serve static files
app.use(express.static('public'));

// GET routes
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/guestbook', (req,res)=>{
    res.sendFile(__dirname + '/public/guestbook.html');
});

app.get('/newmessage', (req,res)=>{
    res.sendFile(__dirname + '/public/newmsg.html');
});

app.get('/ajaxmessage', (req,res)=>{
    res.sendFile(__dirname + '/public/ajaxmsg.html');
});

app.get('*', (req,res)=>{
    res.send('Error 404, page not found.', 404);
});

// POST routes

// Port configuration
app.listen(port, ()=>{
    console.log(`Listening port ${port}`);
});