const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');

router.use(validateToken);

router.route('/').post((req, res) => {
  res.json({ msg: 'Validated..., ', id: req.user });
});

module.exports = router;
