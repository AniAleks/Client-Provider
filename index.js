const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/api/router');

const server = express();

// parse body params and attache them to req.body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
// ROUTES
server.use('/api', routes);


const  port  = process.env.PORT || 3003;
const uri = process.env.MONGO_URI || 'mongodb://localhost:27019/client-provider';

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('connected'));


server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`Server started on port ${port}`);
});