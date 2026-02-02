const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ status: 'API rodando' })
})

const tarefasRoutes = require('./routers/tarefasRoutes')
app.use('/tarefas', tarefasRoutes)

module.exports = app
