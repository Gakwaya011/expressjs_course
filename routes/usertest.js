const express = require('express');
const router = express.Router();
const { usertable, accounts } = require('../models'); // Import models

// Route to create user and accounts
router.get('/test-create-user', async (req, res) => {
  try {
    const newUser = await usertable.create({
      name: 'Christophe Gakwaya',
      email: 'christophe@gmail.com',
      username: 'Brillant',
      password: 'Password@123',
      country: 'Rwanda',
      province: 'Kigali',
      accounts: [
        {
          account_type: 'Checking',
          account_number: '1234567890',
          balance: 1500.00,
          currency: 'USD'
        },
        {
          account_type: 'Savings',
          account_number: '0987654321',
          balance: 3000.00,
          currency: 'USD'
        }
      ]
    }, {
      include: [accounts]
    });

    res.json({ message: 'User and accounts created', data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
