/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')

mongoose.set('useFindAndModify', false)
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { generateUser } = require('./test_helper')

beforeEach(async () => {
  jest.useFakeTimers()
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    // eslint-disable-next-line no-await-in-loop
    await blogObject.save()
  }
  await generateUser()
  const savedUsers = await helper.usersInDb()
  const userForAllBlogs = {
    username: savedUsers[0].username,
    id: savedUsers[0].id,
  }
})

describe('GET requests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs unique identifier is id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body.id).toBeDefined()
  })

  test('there are 6 blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('a non existing blog returns 404', async () => {
    await api.get(`/api/blogs/${helper.nonExistingId}`).expect(404)
  })
})

describe('POST requests', () => {
  test('fails with status 401 if unauthenticated', async () => {
    const user = await User.findOne({ username: 'root' })
    const newBlog = const newBlog = {
      title: 'async/await simplifies making async calls',
      url: 'www.somejs.com/async',
      userId: user._id,
    }

    await api.post('/api/blogs').send(newBlog).expect(401)
  })

  test('a valid blog can be added', async () => {
    const user = await User.findOne({ username: 'root' })

    const newBlog = {
      title: 'async/await simplifies making async calls',
      url: 'www.somejs.com/async',
      userId: user._id,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map((blog) => blog.title)
    expect(contents).toContain('async/await simplifies making async calls')
  })

  test('a blogs likes default to zero', async () => {
    const user = await User.findOne({ username: 'root' })
    const newBlog = {
      title: 'async/await simplifies making async calls',
      url: 'www.somejs.com/async',
      userId: user._id,
    }

    const savedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(savedBlog.body.likes).toEqual(0)
  })

  test('a blog without title returns 400', async () => {
    const user = await User.findOne({ username: 'root' })
    const newBlog = {
      title: 'async/await simplifies making async calls',
      userId: user._id,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('a blog without url returns 400', async () => {
    const user = await User.findOne({ username: 'root' })
    const newBlog = {
      url: 'www.somejs.com/async',
      userId: user._id,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

describe('DELETE requests', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const ids = blogsAtEnd.map((r) => r.id)

    expect(ids).not.toContain(blogToDelete.id)
  })

  test('a DELETE on non existing blog returns 404', async () => {
    await api.delete(`/api/blogs/${helper.nonExistingId}`).expect(404)
  })
})

describe('PUT requests', () => {
  test('a blog updates correctly', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      ...blogToUpdate,
      likes: 1,
    }

    const savedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(savedBlog.body.likes).toEqual(1)
  })

  test('a blog update without title responds 400', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      url: 'dasdas',
      likes: 1,
    }

    const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(400)
    expect(response.body.error).toEqual('Validation failed: title: Path `title` is required.')
  })

  test('a blog update without url responds 400', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      title: 'dasdas',
      likes: 1,
    }

    const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(400)
    expect(response.body.error).toEqual('Validation failed: url: Path `url` is required.')
  })

  test('an Update on non existing blog returns 404', async () => {
    const newBlog = {
      title: 'dasdas',
      url: 'sadasda',
    }
    await api.put(`/api/blogs/${helper.nonExistingId}`).send(newBlog).expect(404)
  })

  test('an Update on non malformed id returns 400', async () => {
    const newBlog = {
      title: 'dasdas',
      url: 'sadasda',
    }
    const response = await api.put(`/api/blogs/fghfghfghf`).send(newBlog).expect(400)

    expect(response.body.error).toEqual('malformatted id')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
