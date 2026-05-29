const API_URL = 'http://localhost:3000/api/funcionarios';

async function listarFuncionarios() {

    const response = await fetch(API_URL);
    const funcionarios = await response.json();

    const tabela = document.getElementById('tabela-funcionarios');