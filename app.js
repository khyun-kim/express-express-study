// [LOAD PACKAGES]
const express = require('express');
const app = express();
const mongoDB = require('./src/utils/db');
const dotEnv = require('dotenv').config();

// [CONFIGURE APP TO USE body-parser]
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// [CONFIGURE SERVER PORT]
const PORT = process.env.PORT || 3000;

// [CONFIGURE MONGOOSE]
mongoDB.On();

// [CONFIGURE ROUTER]
var router = require('./src/routes')(app);

// [RUN SERVER]
app.listen(PORT, () => {
    console.log(`Server is starting... PORT : ${PORT}`);
});
