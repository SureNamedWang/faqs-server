const express = require('express');

const emojis = require('./emojis');

const faqs = require('./faqs');

const router = express.Router();

// const pubUser = process.env.PUBLIC_USERNAME;
// const pubPass = process.env.PUBLIC_PASSWORD;

// router.use(function (req,res,next){
//   try {
//     const [username,password] = Buffer.from(
//       req.headers.authorization.split(" ")[1],
//       "base64"
//     ).toString("ascii")
//     .split(":");
    
//     if(username == pubUser && password == pubPass){
//       next();
//       return;
//     }

//     throw "Auth Rejected";
//   } catch (error) {
//     res.status(401).send("Invalid Credential");
//   }
// });

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);

router.use('/faqs', faqs);

module.exports = router;
