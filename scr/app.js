const express = require('express')
const app = express()

app.use(express.json())

const materiasRoutes = require('./routers/materiasRoutes')
const tarefasRoutes = require('./routers/tarefasRoutes')

app.use('/materias', materiasRoutes)
app.use('/tarefas', tarefasRoutes)

app.get('/', (req, res) => {
  res.json({ status: 'API rodando' })
})

module.exports = app
