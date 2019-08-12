const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();


router.get('/api', (req, res) => {
    db;
    res.status().json(db)
});

router.get('/', (req,res) => {
    const 
})
