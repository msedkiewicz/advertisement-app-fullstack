const express = require('express');

const router = express.Router();

const adsController = require('../controllers/adverts.controller');

router.route('/ads').get(adsController.getAll);
router.route('/ads/:id').get(adsController.getById);
router.route('/ads').post(adsController.post);
router.route('/ads/:id').delete(adsController.delete);
router.route('/ads/:id').put(adsController.edit);
router.route('/ads/search/:searchPhrase').put(adsController.edit);

module.exports = router;
