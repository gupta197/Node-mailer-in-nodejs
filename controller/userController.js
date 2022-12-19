const express = require("express");
const User = require("../model/user");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
    try {
        let { first_name,last_name,email,password} = req.body;
        if(first_name && email && password){
            const users = new User({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password
              });
              await users.save();
              res.send(users);
        }else{
            res.status(400).send("Missing Params....")
        }
        
    } catch (error) {
      console.log(error)
        res.status(500).send("Server error")
    }

});

router.get("/:id", async (req, res) => {
  try {
    if(!req.params.id){
        res.status(400).send("Missing params")
    }else{
    const users = await User.findOne({ _id: req.params.id });
    res.send(users);
    }

  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    if(!req.params.id){
        res.status(400).send("Missing params")
    }else{
        const UserPayload = await User.findOne({ _id: req.params.id });

        if (req.body.title) {
        UserPayload.title = req.body.title;
        }

        if (req.body.content) {
        UserPayload.content = req.body.content;
        }

        await UserPayload.save();
        res.send(UserPayload);
    }
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if(!req.params.id){
        res.status(400).send("Missing params")
    }else{
        await User.deleteOne({ _id: req.params.id });
        res.status(204).send();
    }
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});
router.post("/sendemail",(req,res)=>{
    const output = `
    <p>You Have New Contact Request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name} </li>
        <li>Company: ${req.body.company} </li>
        <li>Email: ${req.body.email} </li>
        <li>Phone: ${req.body.phone} </li>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    </ul>
    `;

    let transporter = nodemailer.createTransport({
        host: 'smtp.googlemail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'sye*****0@gmail.com', //Gmail username
            pass: '**********' // Gmail password
        },
        tls:{
            rejectUnauthorized: false
        }
    });
    let mailOptions = {
        from: ' "Nodemailer Contact" <sy******0@gmail.com> ',
        to: 'ka********11@gmail.com',
        subject: 'Node Contact Request',
        text: 'Kahin Main Samay Toh Nahin?',
        html: output
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err) {
            return console.log(err);
        } 
        console.log("Message Sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.render('contact', {msg: 'Email has been Sent!'}, {layout: false});
        //res.render('contact', {layout: false});
    });
});

module.exports = router;