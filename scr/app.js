const express = require('express')
const app = express()

app.use(express.json())

app.use('/materias', require('./routers/materiasRoutes'))
app.use('/tarefas', require('./routers/tarefasRoutes'))
module.exports = app
