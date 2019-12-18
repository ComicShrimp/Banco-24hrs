// Arquivo para lidar com a API externa

const axios = require("axios") // Importação da biblioteca necessária

// Criação do componente passando o baseURL como padrão
// assim não será necessário quem digite a todo momento
const api = axios.create()

// Exportação do componente
module.exports = api
