const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToDB = require('./db');

const adsRoutes = require('./routes/adverts.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToDB();

app.use('/api', adsRoutes);
app.use('/auth', authRoutes);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/client/build/index.html'));
//   });

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});
