const express = require('express');
const { initDb } = require('./models/index');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');

const app = express();
const port = 3320;

app.use(express.json());
app.use(cors());

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
