// banco de dados em memória para estudo
// os dados são perdidos ao reiniciar a aplicação

const materias = []
const tarefas = []

let materiaIdSequencia = 1
let tarefaIdSequencia = 1

module.exports = {
  materias,
  tarefas,
  materiaIdSequencia,
  tarefaIdSequencia
}
