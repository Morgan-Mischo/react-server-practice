require ('dotenv').config({path: __dirname + '/../.env'}); 
const express = require('express'); 
const massive = require('massive'); 
const session = require('express-session'); 
const path = require('path'); 
const ec = require('./controllers/entryController'); 
const wc = require('./controllers/writerController'); 
const initSession = require('./middleware/initSession');
const authCheck = require('./middleware/authCheck');

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env; 

const app = express(); 
app.use(express.json()); 

app.use(
    session({
        secret: SESSION_SECRET, 
        saveUninitialized: true, 
        resave: false
    })
); 

massive(CONNECTION_STRING).then(db => app.set('db', db)); 

app.use(initSession); 

//writer endpoints
app.post('/api/login', wc.login); 
app.post('/api/signup', wc.signup); 
app.get('/api/writer', authCheck, wc.getWriter); 
app.delete('/api/logout', wc.logout); 

//entry endpoints
app.get('/api/entries/:writerId', ec.getPosts); 
app.delete('/api/entries/:entryId', ec.deletePost); 
app.put('/api/entries/edit/:entryId', ec.editPost); 
app.post('/api/entries', ec.savePost); 

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`)); 