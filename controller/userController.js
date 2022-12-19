var express = require("express"),
  router = express.Router();
router.get("/", function (req, res) {});
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
router.get("/:id",(req,res)=>{

});
router.delete("/:id",(req,res)=>{

});
module.exports = router;