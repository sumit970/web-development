const express = require('express')
const app = express()
const port = 4000;
const path= require('path');
var modell=require("./src/model/loginform")
const route= require("./src/routers/route")
require("./src/dbs/connectdbs")
app.use(route)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
