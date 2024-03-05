const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require("cors")


const app = express();

const PORT = 5000;
app.use(cors({
    origin: "https://65e6d8fa8f1f1c6fa08d8637--benevolent-capybara-1b19cc.netlify.app",
    credentials: true
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
      
    }
}));





app.post('/register', (req, res) => {
   
    const { username, password } = req.body;

    req.session.user = username;

    res.status(201).send({ msg: req.session.user })

});


app.get('/session', (req, res) => {
     console.log(req.session)
    res.send(  req.session.user )

});


app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send('Error logging out');
        } else {
            res.send('Logout successful');
        }
    });
});


app.get('/checkLogin', (req, res) => {
    console.log(req.session)
    if (req.session.user) {
        res.send(req.session.user);
    } else {
        res.status(401).send('Not logged in');
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
