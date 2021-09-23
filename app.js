const express = require('express');
const path = require('path')
const homeRouter = require("./routes/home")
const bodyParser  = require('body-parser'); 
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require("jquery")(window);
require('dotenv').config();


//init app
const app = express();


// app.set('views', path.join(__dirname, 'views'));

//fetch data from the request
app.use(bodyParser.urlencoded({extended:false}));

//set template engine
app.set('view engine', 'ejs')

//set the path of the jquery file to be used from the node_module jquery package
app.use('/jquery', express.static(path.join(__dirname + '/node_modules/jquery/dist/')));

//set static folder(public) path 
app.use(express.static(path.join(__dirname, 'public')))

app.use("/", homeRouter)

PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})