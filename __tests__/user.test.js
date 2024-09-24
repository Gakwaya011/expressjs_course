// In user.test.js

const request = require('supertest');
const app = require('../server'); // Correct path to your app
const { sequelize } = require('../models'); // Adjust the path to your models

beforeAll(async () => {
  await sequelize.sync({ force: true }); // This will drop existing tables and recreate them
});

describe('User API', () => {
    it('should create a new user', async () => {
        const newUser = {
            username: 'SGA',
            password: 'Password@123',
            name: 'Shai Alexander',
            email: 'shai.alexander@example.com',
            country: 'USA',
            province: 'california'
        };

        const response = await request(app)
            .post('/api/add_user') // Adjust the route if necessary
            .send(newUser);

        expect(response.status).toBe(201); // Check if the response status is 201
        expect(response.body).toHaveProperty('message', 'User created');
        expect(response.body.user).toHaveProperty('username', 'SGA');
    });
});
