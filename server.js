require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const htmling = require('htmling');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('html', htmling.express(__dirname + '/views/', {watch:true}));
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/screen', (req, res) => {
  res.render('screen');
});
app.get('/auto', (req, res) => {
  res.render('auto');
});

app.listen(process.env.PORT || 3000);

