const mongoose = require('mongoose');

const connectToDB = () => {
  // connect to DB
  const NODE_ENV = process.env.NODE_ENV;
  let dbURI = '';
  if (NODE_ENV === 'production') {
    dbURI = `mongodb+srv://m9KEMMlW5XB:${process.env.DB_PASS}@cluster0.cpy2a7a.mongodb.net/NoticeBoard?retryWrites=true&w=majority`;
    } else if (NODE_ENV === 'test') {
      dbURI = 'mongodb://localhost:27017/NoticeBoardtest';
    } else {
      dbURI = 'mongodb://localhost:27017/NoticeBoard';
  }

  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;

  // on success
  db.once('open', () => {
    console.log('Connected to the database');
  });

  // on error
  db.on('error', (err) => console.log(`Error: ${err}`));
};

module.exports = connectToDB;
