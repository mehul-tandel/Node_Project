const path = require('path');

const express = require('express');

const router = express.Router();

// __dirname gives path to folder where THIS file exists
// .. goes up one level in folder hierarchy
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','shop.html')); 
});

module.exports = router;