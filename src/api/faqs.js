const express = require('express');

const router = express.Router();

const util = require('util');

const mysql = require('mysql');

const Joi = require('@hapi/joi');
// const { stringify } = require('querystring');

const dbHost = process.env.DB_HOST || 'localhost';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const _db = process.env.DB || '';

const connection=mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: _db,
});

const schema = Joi.object({
    question: Joi.string().trim().required(),
    answer: Joi.string().trim().required(),
    video: Joi.string().uri(),
});

//READ ALL
router.get('/', async (req,res,next) => {
    try{
        const query = util.promisify(connection.query).bind(connection);
        const rows = await query('SELECT * from faqs');
        
        res.json(rows);
    }
    catch(error){
        next(error);
    }
});

//READ ONE
router.get('/:id', async (req,res,next) => {
    try{
        const { id } = req.params;
        const query = util.promisify(connection.query).bind(connection);
        const rows = await query('SELECT * from faqs where id='+id);
        
        res.json(rows);
    }
    catch(error){
        next(error);
    }
});

//CREATE ONE
router.post('/', async (req,res,next) => {
    try{
        const value = await schema.validateAsync(req.body);
        
        const query = util.promisify(connection.query).bind(connection);
        if(value.video){
            const rows = await query("INSERT INTO `faqs`(`question`, `answer`, 'video') VALUES ('"+value.question+"','"+value.answer+"','"+value.video+"')");
        }
        else{
            const rows = await query("INSERT INTO `faqs`(`question`, `answer`) VALUES ('"+value.question+"','"+value.answer+"')");
        }
        
        res.json(value);
    }
    catch(error){
        next(error);
    }
});

//UPDATE ONE
router.put('/:id', async (req,res,next) => {
    try{
        const { id } = req.params;
        const value = await schema.validateAsync(req.body);
        const query = util.promisify(connection.query).bind(connection);
        if(value.video){
            const rows = await query("UPDATE `faqs` SET `question`='"+value.question+"',`answer`='"+value.answer+"',`video`='"+value.video+"' where id="+id);
        }
        else{
            const rows = await query("UPDATE `faqs` SET `question`='"+value.question+"',`answer`='"+value.answer+"' where id="+id);
        }
        res.json(value);
    }
    catch(error){
        next(error);
    }
});

//DELETE ONE
router.delete('/:id', async (req,res,next) => {
    try{
        const { id } = req.params;
        const query = util.promisify(connection.query).bind(connection);
        const rows = await query('DELETE FROM `faqs` WHERE id='+id);
        
        res.json({
            message: "DELETED SUCCESFULLY"
        });
    }

    catch(error){
        next(error);
    }

});


module.exports = router;