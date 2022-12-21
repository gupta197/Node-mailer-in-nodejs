const express = require("express");
const User = require("../model/user");
const {googleCred} = require('../config/default.json');
const nodemailer = require('nodemailer')
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if(users.length){
      res.send({status:200,response:users,messages:"User Found successfully"});
    }else{
      res.send({status:404,response:users,messages:"Users not found!"});
    }
  } catch (error) {
    res.send({status:404,response:[],messages:`Something went wrong!
    ${error.message}`})
  }
});

router.post("/", async (req, res) => {
    try {
        let { first_name,last_name,email,password} = req.body;
        if(first_name && email && password){
          const getUserDetail = await User.findOne({ email: email});
          if(getUserDetail){
            res.send({status:400,response:[],messages:`User already exist....`});
          }else{
            const users = new User({
              first_name: first_name,
              last_name: last_name,
              email: email,
              password: password
            });
            await users.save();
            res.send({status:201,response:users,messages:`User created Successfully....`});
          }
        }else{
          res.send({status:400,response:[],messages:`Missing Params....`});
        }
        
    } catch (error) {
      res.send({status:500,response:[],messages:`Something went wrong!
      ${error.message}`})
    }

});

router.get("/:id", async (req, res) => {
  try {
    if(!req.params.id){
      res.send({status:200,response:users,messages:"Missing Params ...."});
    }else{
    const users = await User.findOne({ _id: req.params.id });
    if(users){
      res.send({status:200,response:users,messages:"User Found successfully"});
    }else{
      res.send({status:404,response:users,messages:"User not found!"});
    }
   
    }

  } catch (error) {
    res.send({status:500,response:[],messages:`Something went wrong!
    ${error.message}`})
  }
});

router.patch("/:id", async (req, res) => {
  try {
    if(!req.params.id){
      res.send({status:400,response:[],messages:"Missing Params..."});
    }else{
        const userPayload = await User.findOne({ _id: req.params.id });
        userPayload.first_name =  req.body.first_name || userPayload.first_name;
        userPayload.last_name = req.body.last_name || userPayload.last_name;
        userPayload.password = req.body.password || userPayload.password;
        await userPayload.save();
        res.send({status:200,response:userPayload,messages:"User Update successfully"});
    }
  } catch (error){
    res.send({status:500,response:[],messages:`Something went wrong!
    ${error.message}`})
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if(!req.params.id){
      res.send({status:400,response:[],messages:"Missing Params..."});
    }else{
        await User.deleteOne({ _id: req.params.id });
        res.send({status:204,response:[],messages:"User Deleted successfully"});
    }
  } catch {
    res.send({status:500,response:[],messages:`Something went wrong!
    ${error.message}`})
  }
});
router.post("/sendemail",(req,res)=>{
  try {
    const {name,company,email,phone,message} = req.body;
    if(name && email && company && phone && message){
    const output = `
    <p>You Have New Contact Request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${name} </li>
        <li>Company: ${company} </li>
        <li>Email: ${email} </li>
        <li>Phone: ${phone} </li>
        <h3>Message</h3>
        <p>${message}</p>
    </ul>
    `;

    let transporter = nodemailer.createTransport(googleCred);
    let mailOptions = {
        from: ` "Nodemailer Contact" <v********@*****.***> `,
        to: email,
        subject: 'Node Contact Request',
        text: ' test user?',
        html: output
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err) {
            return console.log(err);
        } 
        res.send({
          status:200,message:"Mail send successfully", response:info
        })
    });
  }else{
 res.send({status:400,response:[],messages:"Missing Params..."});
  }
  } catch (error) {
    res.send({status:500,response:[],messages:`Something went wrong!
    ${error.message}`})
  }

});

module.exports = router;