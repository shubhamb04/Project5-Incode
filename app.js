const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const homeRouter = require("./routes/home")
const {  checkUser } = require('./middleware/authMiddleware');

const bodyParser  = require('body-parser'); 
require('dotenv').config();


//init app
const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set template engine
app.set('view engine', 'ejs')

//set the path of the jquery file to be used from the node_module jquery package
app.use('/jquery', express.static(path.join(__dirname + '/node_modules/jquery/dist/')));

app.get('*', checkUser); // Check which user is logged in
app.use(authRoutes);
app.use("/", homeRouter)

PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})