const express = require('express');
const path = require('path')


const app = express();

// engine
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));
app.set('view engine', 'ejs')








PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})