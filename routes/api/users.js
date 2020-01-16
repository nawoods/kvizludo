const express = require('express');
const router = express.Router();

const user = require('../../models/User');

// @route   POST api/questions
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Bonvolu plenumi ĉiujn kampojn.' });
  }

  user.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: 'Uzanto jam ekzistas.' });

      const newUser = new user({
        name,
        email,
        password
      });
    });
});

module.exports = router;