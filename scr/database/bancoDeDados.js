/**
 * @typedef {Object} Materia
 * @property {Number} id
 * @property {String} nome 
 */

/**
 * @typedef {Object} Tarefa
 * @property {Number} id
 * @property {String} titulo
 * @property {String} status
 * @property {String} dataEntrega
 * @property {Number} materiaId
 *
 */


/** @type {Materia[]} */
const materias = []

/** @type {Tarefa[]} */
const tarefas = []

let materiaIdSequencia = 1
let tarefaIdSequencia = 1

module.exports = {
    materias,
    tarefas,
    materiaIdSequencia,
    tarefaIdSequencia
}
