const express = require('express');
const router = express.Router();
const { usertable, accounts } = require('../models'); 
const { where } = require('sequelize');

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
// updating user info without account
router.put('/update-user/:id',async(req,res)=>{
  const{id}=req.params;
  const {name,email,username,password,country,province}=req.body;

  try{
    const user = await usertable.findByPk(id);
    if (!user){
      return res.status(404).json({message:'user not found'});
    }
    await user.update({
      name,
      email,
      username,
      password,
      country,
      province
    });
    res.status(200).json({message:'user updated successfully',user});

  } catch(error){
    console.error('error updating user',error);
    res.status(500).json({error:'error occured while updating user'});
  }

});
router.put('/update-user-with-account/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, username, password, country, province, accounts: accountsData } = req.body;

  try {
    
    const user = await usertable.findByPk(id, {
      include: [accounts]  
    });

    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    await user.update({
      name,
      email,
      username,
      password,
      country,
      province
    });

    // If accounts data is provided, update or create accounts
    if (accountsData && accountsData.length > 0) {
      for (let accountData of accountsData) {
        if (accountData.id) {
          let existingAccount = await accounts.findOne({ where: { id: accountData.id, usertableId: user.id } });

          if (existingAccount) {
            
            await existingAccount.update(accountData);
          } else {
            return res.status(404).json({ message: `Account with ID ${accountData.id} not found for user` });
          }
        } else {
          // Create a new account if no `id` is provided 
          await accounts.create({ ...accountData, usertableId: user.id });
        }
      }
    }

    res.status(200).json({ message: 'User and accounts updated successfully', user });
  } catch (error) {
    console.error('Error updating user and accounts:', error);
    res.status(500).json({ error: 'Error occurred while updating user and accounts' });
  }
});




router.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  
  try {
      
      const user = await usertable.findOne({
          where: { id: userId },
          include: [accounts] 
      });

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.json({ message: 'User found', user });
  } catch (error) {
      console.error('Error fetching user with accounts:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the user' });
  }
});

router.delete('/delete_user/:id', async (req, res) => {
  const userId = req.params.id;
  

  try {
    
    const user = await usertable.findByPk(userId);
    if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
});



 
module.exports = router;
