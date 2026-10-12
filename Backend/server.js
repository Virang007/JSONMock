const express = require('express')
const cors = require('cors')
const path = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync(path.join(__dirname, 'data.json'))
const db = low(adapter)

const app = express()
const PORT = 3000

// Middleware
app.use(cors())
app.use(express.json())

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../Frontend')))

// Helper: parse int or return null
const parseId = (id) => {
  const n = parseInt(id, 10)
  return isNaN(n) ? null : n
}

// ─── Generic resource factory ───────────────────────────────────────────────
const resources = ['posts', 'comments', 'albums', 'photos', 'todos', 'users']

resources.forEach((resource) => {
  // GET all (with optional query filter)
  app.get(`/${resource}`, (req, res) => {
    db.read()
    let data = db.get(resource).value()
    const query = req.query
    if (Object.keys(query).length > 0) {
      data = data.filter((item) => {
        return Object.entries(query).every(([key, val]) => {
          return String(item[key]) === String(val)
        })
      })
    }
    res.json(data)
  })

  // GET single
  app.get(`/${resource}/:id`, (req, res) => {
    db.read()
    const id = parseId(req.params.id)
    if (id === null) return res.status(400).json({ error: 'Invalid id' })
    const item = db.get(resource).find({ id }).value()
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  })

  // POST create (fake — not persisted)
  app.post(`/${resource}`, (req, res) => {
    db.read()
    const all = db.get(resource).value()
    const maxId = all.reduce((m, i) => Math.max(m, i.id || 0), 0)
    const newItem = { ...req.body, id: maxId + 1 }
    res.status(201).json(newItem)
  })

  // PUT full update (fake)
  app.put(`/${resource}/:id`, (req, res) => {
    db.read()
    const id = parseId(req.params.id)
    if (id === null) return res.status(400).json({ error: 'Invalid id' })
    const exists = db.get(resource).find({ id }).value()
    if (!exists) return res.status(404).json({ error: 'Not found' })
    const updated = { ...req.body, id }
    res.json(updated)
  })

  // PATCH partial update (fake)
  app.patch(`/${resource}/:id`, (req, res) => {
    db.read()
    const id = parseId(req.params.id)
    if (id === null) return res.status(400).json({ error: 'Invalid id' })
    const existing = db.get(resource).find({ id }).value()
    if (!existing) return res.status(404).json({ error: 'Not found' })
    const patched = { ...existing, ...req.body, id }
    res.json(patched)
  })

  // DELETE (fake)
  app.delete(`/${resource}/:id`, (req, res) => {
    db.read()
    const id = parseId(req.params.id)
    if (id === null) return res.status(400).json({ error: 'Invalid id' })
    const exists = db.get(resource).find({ id }).value()
    if (!exists) return res.status(404).json({ error: 'Not found' })
    res.json({})
  })
})

// ─── Nested routes ───────────────────────────────────────────────────────────
// GET /posts/:id/comments
app.get('/posts/:id/comments', (req, res) => {
  db.read()
  const postId = parseId(req.params.id)
  if (postId === null) return res.status(400).json({ error: 'Invalid id' })
  const comments = db.get('comments').filter({ postId }).value()
  res.json(comments)
})

// GET /albums/:id/photos
app.get('/albums/:id/photos', (req, res) => {
  db.read()
  const albumId = parseId(req.params.id)
  if (albumId === null) return res.status(400).json({ error: 'Invalid id' })
  const photos = db.get('photos').filter({ albumId }).value()
  res.json(photos)
})

// GET /users/:id/posts
app.get('/users/:id/posts', (req, res) => {
  const userId = parseId(req.params.id)
  if (userId === null) return res.status(400).json({ error: 'Invalid id' })
  const posts = db.get('posts').filter({ userId }).value()
  res.json(posts)
})

// GET /users/:id/albums
app.get('/users/:id/albums', (req, res) => {
  const userId = parseId(req.params.id)
  if (userId === null) return res.status(400).json({ error: 'Invalid id' })
  const albums = db.get('albums').filter({ userId }).value()
  res.json(albums)
})

// GET /users/:id/todos
app.get('/users/:id/todos', (req, res) => {
  const userId = parseId(req.params.id)
  if (userId === null) return res.status(400).json({ error: 'Invalid id' })
  const todos = db.get('todos').filter({ userId }).value()
  res.json(todos)
})

// ─── Catch-all: serve index.html for any other route ─────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'))
})

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 JSONPlaceholder Clone running at http://localhost:${PORT}\n`)
  console.log('  Resources:')
  resources.forEach((r) => console.log(`    http://localhost:${PORT}/${r}`))
  console.log('')
})
