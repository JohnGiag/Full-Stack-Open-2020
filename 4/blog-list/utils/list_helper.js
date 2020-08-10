const FastMap = require('collections/fast-map')

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const maxIndex = blogs.reduce(
    (iMax, blog, i, arr) => (blog.likes > arr[iMax].likes ? i : iMax),
    0
  )
  return {
    title: blogs[maxIndex].title,
    author: blogs[maxIndex].author,
    likes: blogs[maxIndex].likes,
  }
}

/* eslint-disable array-callback-return */
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  if (blogs.length === 1) return { author: blogs[0].author, blogs: 1 }
  const counts = new FastMap()
  let maxCount = -1
  let maxAuthor = ''
  blogs.map((blog) => {
    const key = blog.author
    if (counts.has(key)) {
      const value = counts.get(key)
      counts.set(key, value + 1)
      if (value + 1 > maxCount) {
        maxCount = value + 1
        maxAuthor = key
      }
    } else {
      counts.add(1, key)
    }
  })

  return { author: maxAuthor, blogs: maxCount }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}
  if (blogs.length === 1) return { author: blogs[0].author, likes: blogs[0].likes }
  const counts = new FastMap()
  let maxCount = -1
  let maxAuthor = ''
  blogs.map((blog) => {
    const key = blog.author
    if (counts.has(key)) {
      const value = counts.get(key)
      counts.set(key, value + blog.likes)
      if (value + blog.likes > maxCount) {
        maxCount = value + blog.likes
        maxAuthor = key
      }
    } else {
      counts.add(blog.likes, key)
    }
  })

  return { author: maxAuthor, likes: maxCount }
}

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes }
