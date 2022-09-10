const mongoose=require('mongoose')
// const emitter=require('emitter')
// emitter.setMaxListeners(30);
const bcrypt = require('bcrypt');


const signupschemap= new mongoose.Schema({

    firstname:
    {
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:
    {
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true
    }
})

signupschemap.pre("save",async function(next){
    if(this.isModified("password")){
        console.log(`the current password is ${this.password}`);
        this.password= await bcrypt.hash(this.password,10);
        console.log(`the current password is ${this.password}`);
    }
    // this.confirmpassword=undefined;
    // next();.,,/,,̀,

});
const signupmodel=new mongoose.model('signupmodel',signupschemap);


module.exports=signupmodel;


