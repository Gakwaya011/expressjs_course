const express = require('express');
const router = express.Router();
const { usertable, accounts } = require('../models'); 

// route to create a default user with multiple accounts for testing
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

// route to add a user without accounts
router.post('/add_user', async (req, res) => {
    const { name, email, username, password, country, province } = req.body;
    try {
        const newUser = await usertable.create({
            name,
            email,
            username,
            password,
            country,
            province
        });
        res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error occurred while creating user' });
    }
});

// Route to add a user with multiple accounts
router.post('/add-user-with-accounts', async (req, res) => {
    const { name, email, username, password, country, province, accountsData } = req.body;

    try {
        const newUser = await usertable.create({
            name,
            email,
            username,
            password,
            country,
            province,
            accounts: accountsData 
        }, {
            include: [accounts]
        });

        res.status(201).json({ message: 'User and accounts created successfully', user: newUser });

    } catch (error) {
        console.error('Error creating user with accounts:', error);
        res.status(500).json({ error: 'Error occurred while creating user with accounts' });
    }
});

module.exports = router;
