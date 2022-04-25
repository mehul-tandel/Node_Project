const Sequelize = require('sequelize');

// Setting up connection to database
const sequelize = new Sequelize('node-complete','root','mySQL@r00t',
    {dialect: 'mysql',host: 'localhost'});

module.exports = sequelize;