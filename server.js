const express = require('express');


const app = express();
const PORT = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var apiRoute = require('./routes/api');
apiRoute(app);
var htmlRoute = require('./routes/html');
htmlRoute(app);







app.listen(PORT);