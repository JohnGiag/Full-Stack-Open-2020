/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  jest.useFakeTimers()
  await User.deleteMany({})
  await helper.generateUser()
})

describe('Login tests', () => {
  test('valid login', async () => {
    await api.post('/api/login').send({ username: 'root', password: 'sekret' }).expect(200)
  })

  test('invalid login wrong username', async () => {
    const loginAttempt = await api
      .post('/api/login')
      .send({ username: 'r00t', password: 'sekret' })
      .expect(401)
    expect(loginAttempt.body.error).toContain('invalid username or password')
  })

  test('invalid login wrong password', async () => {
    const loginAttempt = await api
      .post('/api/login')
      .send({ username: 'root', password: 'hjghjghj' })
      .expect(401)
    expect(loginAttempt.body.error).toContain('invalid username or password')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
