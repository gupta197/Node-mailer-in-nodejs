const express = require('express'),
app = express(),
dbConnection = require('./mongoConnection'),
userController = require('./controller/userController'),
 path = require('path'),
PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/users", userController);
app.get('/',(req,res)=>{
    res.send("Welcome to Page!")
 })
app.get('**',(req,res)=>{
    res.send("Page Not Found!")
})

// app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

const start = async () => {
  try {
    await dbConnection.connection();
    // Listening to the port
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();