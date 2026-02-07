const express = require('express')
const materiasRoutes = require('./routes/materiasRoutes')
const tarefasRoutes = require('./routes/tarefasRoutes')

const app = express()

app.use(express.json())

app.use('/materias', materiasRoutes)
app.use('/tarefas', tarefasRoutes)

module.exports = app
