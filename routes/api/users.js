const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route   POST api/questions
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Bonvolu plenumi ĉiujn kampojn.' });
  }

  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: 'Uzanto jam ekzistas.' });

      const newUser = new User({
        name,
        email,
        password
      });

      // create salt and hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              res.json({
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            });
        });
      });
    });
});

module.exports = router;