const express = require ('express');
const app = express ();
const mysql = require ('mysql2');
const cors = require('cors');
const dotenv = require ('dotenv');  

app.use(express.json());
app.use(cors());
dotenv.config();


const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
});


db.connect((err) => {
    if (err) return console.log("Error connecting to database");
    console.log("Connected to mysql successfully as id: ", db.threadId);

    // Question 1 goes here
    // Get database
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    app.get('/data', (req, res) => {
        db.query('SELECT * FROM patients', (err, results) => {
            if(err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            }else {
                res.render('data', {results: results});
            }
        });
    });

    // Question 2 goes here
    // Select Database from Providers
    app.get('/providers', (req, res) => {
        db.query('SELECT * FROM providers', (err, results) => {
            if(err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            }else {
                res.render('providers', {results: results});
            }
        });
    });

    // Question 3 goes here
    //Select Patient by First Name
    app.get('/search', (req, res) => {
        db.query('SELECT * FROM patients WHERE first_name = ?', [req.query.first_name], (err, results) => {
            if(err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            }else {
                res.render('data', {results: results});
            }
        });
    });
     // Question 4 goes here
    // Select Provider by Specialty
    app.get('/specialty', (req, res) => {
        db.query('SELECT * FROM providers WHERE provider_specialty = ?', [req.query.provider_specialty], (err, results) => {
            if(err){
                console.error(err);
                res.status(500).send('Error retrieving data');
            }else {
                res.render('providers', {results: results});
            }
        });
    });

        
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
        
        console.log('Sending message to the browser...');

        app.get('/', (req,res) => {
            res.send('Sever Started Successfully');
        });
    });
});
