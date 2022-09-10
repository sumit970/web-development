//imported modules in express
const { ADDRGETNETWORKPARAMS } = require('dns');
const { urlencoded } = require('express');
const express= require('express');
const { appendFile } = require('fs');
const route =express.Router();
const path =require('path');
require('../dbs/connectdbs')
const modelsignup =require('../model/signup')


//to include the static file in expressjs
route.use(express.static(path.join(__dirname,'../../static')));


// to handle the get request for  signup  page using "/".
route.get('/',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'../../static/html/signup.html'));
});

//to handle the get request for the login page using "/login".

route.get('/login',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'../../static/html/login.html'));
});


//to handle post request
route.post('/',async(req,res)=>{

//to store user detail from the post method byt he user.

    const fname=req.body.firstname;
    const lname=req.body.lastname;
    const email=req.body.email;
    const password=req.body.password;


//To store data in model of mongodb
      const signup =new modelsignup({

         firstname:fname,
         lastname:lname,
         email:email,
         password:password

      })
//to save the data in mongodb
      const savesignup= await signup.save();
      console.log(savesignup);
      res.status(200).send(savesignup);


    
    // console.log(fname)
    // console.log(lname)
    // console.log(email)
    // console.log(password)

})





module.exports =route;