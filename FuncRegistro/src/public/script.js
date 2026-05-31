const API = 'http://localhost:3000/funcionarios';

const avatarColors = [
    ['#1a56db','#3b82f6'],
    ['#0ea5c8','#06b6d4'],
    ['#7c3aed','#8b5cf6'],
    ['#059669','#10b981'],
    ['#d97706','#f59e0b'],
    ['#db2777','#ec4899']
];

function initials(nome) {
    return nome.trim().split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function avColor(nome) {
    return avatarColors[nome.charCodeAt(0) % avatarColors.length];
}

async function listar() {
    try {
        const r = await fetch(API);
        const d = await r.json();
        renderStats(d);
        renderTable(d);
    } catch {
        toast('Erro ao conectar com a API.', 'er');
    }
}

function renderStats(d) {
    document.getElementById('s-total').textContent = d.length;

    const media = d.length
        ? d.reduce((a, f) => a + parseFloat(f.salario), 0) / d.length
        : 0;
    document.getElementById('s-media').textContent =
        'R$' + media.toLocaleString('pt-BR', { maximumFractionDigits: 0 });

    const cargos = new Set(d.map(f => f.cargo.toLowerCase())).size;
    document.getElementById('s-cargos').textContent = cargos;
}

function renderTable(d) {
    const tb = document.getElementById('tbody');
    [...tb.querySelectorAll('tr:not(#empty-row)')].forEach(x => x.remove());
    document.getElementById('empty-row').style.display = d.length ? 'none' : '';

    d.forEach(f => {
        const [c1, c2] = avColor(f.nome);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="id-cell">${f.id}</td>
            <td>
                <div class="av-cell">
                    <div class="av" style="background:linear-gradient(135deg,${c1},${c2})">
                        ${initials(f.nome)}
                    </div>
                    ${f.nome}
                </div>
            </td>
            <td>
                <span class="badge">
                    <i class="ti ti-briefcase" style="font-size:11px"></i>
                    ${f.cargo}
                </span>
            </td>
            <td class="sal">
                R$ ${parseFloat(f.salario).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td>
                <div class="ab">
                    <button class="be" onclick="editar(${f.id},'${f.nome.replace(/'/g,"\\'")}','${f.cargo.replace(/'/g,"\\'")}',${parseFloat(f.salario)})">
                        <i class="ti ti-edit"></i> Editar
                    </button>
                    <button class="bd" onclick="excluir(${f.id})">
                        <i class="ti ti-trash"></i> Excluir
                    </button>
                </div>
            </td>`;
        tb.appendChild(tr);
    });
}

function editar(id, nome, cargo, sal) {
    document.getElementById('fid').value    = id;
    document.getElementById('fnome').value  = nome;
    document.getElementById('fcargo').value = cargo;
    document.getElementById('fsal').value   = sal;

    document.getElementById('form-title').textContent = 'Editar funcionário';
    document.getElementById('btn-sub').innerHTML = '<i class="ti ti-check"></i> Salvar';
    document.getElementById('btn-can').style.display = '';
    document.getElementById('form-card').classList.add('editing');
    document.querySelector('.fc').scrollIntoView({ behavior: 'smooth' });
}

function cancelar() {
    document.getElementById('form-func').reset();
    document.getElementById('fid').value = '';
    document.getElementById('form-title').textContent = 'Novo funcionário';
    document.getElementById('btn-sub').innerHTML = '<i class="ti ti-plus"></i> Cadastrar';
    document.getElementById('btn-can').style.display = 'none';
    document.getElementById('form-card').classList.remove('editing');
}

async function excluir(id) {
    if (!confirm('Excluir este funcionário?')) return;
    try {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
        toast('Funcionário excluído.', 'ok');
        listar();
    } catch {
        toast('Erro ao excluir.', 'er');
    }
}

document.getElementById('form-func').addEventListener('submit', async e => {
    e.preventDefault();

    const id    = document.getElementById('fid').value;
    const body  = JSON.stringify({
        nome:    document.getElementById('fnome').value.trim(),
        cargo:   document.getElementById('fcargo').value.trim(),
        salario: document.getElementById('fsal').value
    });
    const headers = { 'Content-Type': 'application/json' };

    try {
        if (id) await fetch(`${API}/${id}`, { method: 'PUT', headers, body });
        else    await fetch(API, { method: 'POST', headers, body });

        toast(id ? 'Atualizado com sucesso!' : 'Cadastrado com sucesso!', 'ok');
        cancelar();
        listar();
    } catch {
        toast('Erro ao salvar.', 'er');
    }
});

function toast(msg, tipo) {
    const t = document.getElementById('toast');
    t.innerHTML = `<i class="ti ti-${tipo === 'ok' ? 'circle-check' : 'alert-circle'}"></i>${msg}`;
    t.className = 'toast ' + tipo;
    setTimeout(() => t.className = 'toast', 3500);
}

listar();