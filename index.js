const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.use((err, req, res, next) => {
  res.status(422).send({error: err._message});
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port: ${process.env.PORT || 3000}`);
});
