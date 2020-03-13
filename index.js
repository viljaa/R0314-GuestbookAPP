const express = require('express');
const app = express();
const port = 5000 || process.env.PORT;
const bodyParser = require('body-parser');
const fs = require('fs');

// Serve static files
app.use(express.static('public'));

// Implement bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// Variables
var id_count = getID();

// GET routes
// Routes for shown web pages
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

// Route to JSON api
app.get('/api/jsondata', (req,res)=>{
    let data = require('./data.json');
    res.json(data);
});

app.get('*', (req,res)=>{
    res.send('Error 404, page not found.', 404);
});

// POST routes
app.post('/submitdata', (req, res)=>{
    id_count += 1;
    // Save data from the recieved form
    let name = req.body.name;
    let country = req.body.country;
    let message = req.body.message;
    // Get date for guestbook entry and format it
    let date = new Date();
    date = date.getHours()+':'+date.getMinutes()+' '+date.getDate()+'.'+date.getMonth()+'.'+date.getFullYear();

    // Add data to json
    let data = require('./data.json');
    data.push({
        'id': id_count,
        'username': name,
        'country': country,
        'message': message,
        'date': date
    });
    fs.writeFileSync('./data.json', JSON.stringify(data, null, 4), (err)=>{
        if (err) return console.error(err);
        console.log('Data saved');
    });

    res.sendFile(__dirname + '/public/guestbook.html');

});

app.post('/ajaxsubmit', (req, res)=>{
    id_count += 1;
    // Save data from the recieved form
    let name = req.body.name;
    let country = req.body.country;
    let message = req.body.message;

    // Get date for guestbook entry and format it
    let date = new Date();
    date = date.getHours()+':'+date.getMinutes()+' '+date.getDate()+'.'+date.getMonth()+'.'+date.getFullYear();

    // Add data to json
    let data = require('./data.json');
    data.push({
        'id': id_count,
        'username': name,
        'country': country,
        'message': message,
        'date': date
    });
    fs.writeFileSync('./data.json', JSON.stringify(data,null,4), (err)=>{
        if (err) return console.error(err);
    });
    console.log('Data saved');
    
    res.send(JSON.stringify(data));

});

// Port configuration
app.listen(port, ()=>{
    console.log(`Listening port ${port}`);
});

// Functions

//Function for checking how many id's are already on the json file
function getID(){
    let json = require('./data.json');
    let id_count = json.length;

    return id_count;
}