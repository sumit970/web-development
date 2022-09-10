
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/login_user_details",{

    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(()=>console.log('Connected to mongodb sucsessfully..... yo.'))
    .catch((err)=> console.log(err));

    