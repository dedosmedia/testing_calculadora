const fs = require('fs');
document.body.innerHTML = fs.readFileSync('./calculadora.html');

const { limpiar, resetear, resolver, init } = require('../funcionalidad')

