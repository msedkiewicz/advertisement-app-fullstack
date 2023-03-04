const Adverts = require('../models/advert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Adverts.find().populate('User'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const ad = await Adverts.findById(req.params.id).populate('User');
    if (!ad) res.status(404).json({ message: 'Not found' });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { title, description, date, image, price, localization, user } =
      req.body;
    const newAd = new Adverts({
      title,
      description,
      date,
      image,
      price,
      localization,
      user,
    });
    await newAd.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const ad = await Adverts.findById(req.params.id);
    if (ad) {
      await Adverts.deleteOne({ _id: req.params.id });
      res.json(ad);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const dep = await Employees.findById(req.params.id);
    if (dep) {
      await Employees.updateOne(
        { _id: req.params.id },
        { $set: { firstName: firstName, lastName: lastName } }
      );
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = async (req, res) => {
  const { title, description, date, image, price, localization, user } =
    req.body;
  try {
    const ad = await Adverts.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    else {
      ad.title = title;
      ad.description = description;
      ad.price = price;
      ad.date = date;
      ad.localization = localization;
      ad.user = user;
      ad.image = image;
      const updatedAdvert = await ad.save();
      res.json({ message: 'OK' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
