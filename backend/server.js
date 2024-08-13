const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const tweetRoutes = require('./routes/tweets');

const app = express();
const port = 5002;

// Explicitly set the configuration here
const sequelize = new Sequelize('twitter_clone', 'twitter_user', 'newpassword123', {
    host: '127.0.0.1',
    dialect: 'postgres',
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', tweetRoutes);

// Start server and connect to DB
sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(err => console.log('Error: ' + err));


