const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.register = async (req, res) => {
  try {
    const { login, password, phoneNumber } = req.body;
    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string' &&
      phoneNumber &&
      typeof phoneNumber === 'string'
    ) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        return res
          .status(409)
          .send({ message: 'User with this login already exists' });
      }
      const user = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        phoneNumber,
      });
      res.status(201).send({ message: `User created:  ${user.login}` });
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string'
    ) {
      const user = await User.findOne({ login });
      if (!user) {
        res.status(400).send({ message: 'Login or password are incorrect' });
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.login = user.login;
        res.status(200).send({ message: 'Login successful' });
      } else {
        res.status(400).send({ message: 'Login or password are incorrect' });
      }
    }
    // } else {
    //   res.status(400).send({ message: 'Bad request' });
    // }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  res.send(`"I'm logged!"`);
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.send('Bye Bye');
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
