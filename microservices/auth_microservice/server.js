const express = require('express');
const { initDb } = require('./models/index');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3322;

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);

initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
