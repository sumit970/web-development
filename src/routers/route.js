//imported modules in express
const { Console } = require('console');
const { ADDRGETNETWORKPARAMS } = require('dns');
const { urlencoded } = require('express');
const express = require('express');
const { appendFile } = require('fs');
const route = express.Router();
const path = require('path');
const { findOne } = require('../model/loginform');
require('../dbs/connectdbs')
const modelsignup = require('../model/signup');
const jwt=require('jsonwebtoken');



//to include the static file in expressjs
route.use(express.static(path.join(__dirname, '../../static')));
// route.json()
//x.json () to convert javascript object and mongodb document into readable format
route.use(express.json());
// to add post document into mongodb document;
route.use(express.urlencoded({ extended: true }));
// to handle the get request for  signup  page using "/".
route.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../static/html/signup.html'));
});
//to handle the get request for the login page using "/login".
route.get('/login', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../static/html/login.html'));
});

//to handle post request for signup form
route.post('/', async (req, res) => {
    //to store user detail from the post method byt he user.
    const fname = req.body.firstname;
    const lname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    //To store data in model of mongodb
    const signup = new modelsignup({
        firstname: fname,
        lastname: lname,
        email: email,
        password: password
    })
    const token =await signup.generateAuthToken();
     

    //to save the data in mongodb
    const savesignup = await signup.save();
    console.log(savesignup);
    res.status(200).sendFile(path.join(__dirname,'../../static/html/home.html'));
    // const findall = modelsignup.find();
    // Console.log(findall);
    // res.status(200).send(findall);

})

//to handle post  request for login i.e (/login).

route.post('/login', async (req, res) => {
    console.log("Hello world! this is message from post request of /login");
    const username = req.body.userid;
    const password = req.body.password;
    const userfind = modelsignup.findOne({ email: username }, function (err, data) {
        try {

            const checkpassword = bcrypt.compare(password, data.password, function (err, result) {
                if (checkpassword) {
                    console.log(result + "\npassword match successfuly");
                }
                else if (err) {
                    console.log(err + "\n password match failure");
                }
                // result == true
            }
            );
        }
        catch (err) {
            console.log('Invalid user or maybe some error has occured');
        }
    });
})



// const createtoken= async()=>{
//     const token =await jwt.sign({id__:"94369824798237489749287346598437"},"ksdjfbaskdfjbsdmnckjsdbfshfdbjsdsdkfbdsbKDSFkdsbfk")
//     // Console.log(token)
//     expiresIn:"2 minutes"
//     console.log(token);

//     const uerverifytoken =await jwt.verify(token,"ksdjfbaskdfjbsdmnckjsdbfshfdbjsdsdkfbdsbKDSFkdsbfk")
//     console.log(uerverifytoken);

// }
// createtoken();


module.exports = route;