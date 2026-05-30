const API_URL = 'http://localhost:3000/api/funcionarios';

async function listarFuncionarios() {
    const response = await fetch(API_URL);
    const funcionarios = await response.json();

    const tabela = document.getElementById('tabela-funcionarios');
    tabela.innerHTML = '';

    funcionarios.forEach(funcionario => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${funcionario.id}</td>
            <td>${funcionario.nome}</td>
            <td>${funcionario.cargo}</td>
            <td>${parseFloat(funcionario.salario).toFixed(2)}</td>
            <td>
                <button onclick="editarFuncionario(
                    ${funcionario.id},
                    '${funcionario.nome}',
                    '${funcionario.cargo}',
                    ${parseFloat(funcionario.salario).toFixed(2)}
                )">
                    Editar
                </button>

                <button onclick="excluirFuncionario(${funcionario.id})">
                    Excluir
                </button>
            </td>
        `;

        tabela.appendChild(tr);
    });
}

document.getElementById('form-funcionario').addEventListener('submit', async (e) => {

    e.preventDefault();

    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const cargo = document.getElementById('cargo').value;
    const salario = document.getElementById('salario').value;

    const funcionario = { nome, cargo, salario };

    if (id) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(funcionario)
        });

    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(funcionario)
        });
    }   

e.target.reset();
document.getElementById('id').value = '';
listarFuncionarios();
});
