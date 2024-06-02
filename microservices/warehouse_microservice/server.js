const express = require('express');
const { initDb } = require('./models/index');
const productRoutes = require('./routes/productRoutes');
const packageRoutes = require('./routes/packageRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3321;

app.use(express.json());
app.use(cors());

app.use('/products', productRoutes);
app.use('/packages', packageRoutes);

initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
