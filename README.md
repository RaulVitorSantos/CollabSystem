# FuncRegistro

Sistema web para cadastro, listagem, edição e exclusão de funcionários. Desenvolvido com Node.js no back-end e HTML/CSS/JavaScript puro no front-end.

---

# Tecnologias e Bibliotecas Utilizadas

## Back-end

- **Node.js** — Ambiente de execução JavaScript no servidor.
- **Express 5** — Framework para criação de rotas e servidor HTTP.
- **mysql2** — Driver para conexão e execução de consultas no banco de dados MySQL.
- **dotenv** — Carregamento de variáveis de ambiente através do arquivo `.env`.

## Front-end

- **HTML, CSS e JavaScript puro** (sem frameworks).
- **Google Fonts** (Nunito e Inter) — Tipografia da interface.
- **Tabler Icons** — Biblioteca de ícones via CDN.

---

# Pré-requisitos

Antes de executar o projeto, certifique-se de possuir:

- Node.js (versão 18 ou superior);
- MySQL instalado e em execução;
- Banco de dados `empresa_db` acessível pelo usuário `root`.

---

# Configuração das Variáveis de Ambiente

Na pasta `src/`, crie um arquivo chamado `.env` com o seguinte conteúdo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=290306Neymar
DB_NAME=empresa_db
PORT=3000
```

---

# Como Executar o Projeto

## 1. Extrair o Projeto

Extraia os arquivos do projeto para uma pasta de sua preferência.

## 2. Acessar a Pasta do Projeto

Abra o terminal e execute:

```bash
cd FuncRegistroJS/FuncRegistro/src
```

## 3. Instalar as Dependências

Execute o comando:

```bash
npm install
```

## 4. Iniciar o Servidor

Execute:

```bash
node server.js
```

## 5. Acessar a Aplicação

Abra o navegador e acesse:

```text
http://localhost:3000
```

---

# Estrutura do Projeto

```text
src/
├── config/
│   └── db.js                    # Conexão com o banco de dados
├── controllers/
│   └── funcionarioController.js # Lógica das operações CRUD
├── routes/
│   └── funcionariRoutes.js      # Definição das rotas da API
├── public/
│   ├── index.html               # Interface do usuário
│   ├── script.js                # Lógica do front-end
│   └── style.css                # Estilização da aplicação
├── .env                         # Variáveis de ambiente (não versionado)
├── package.json                 # Dependências e scripts do projeto
└── server.js                    # Ponto de entrada da aplicação
```

---

# Rotas da API

| Método | Rota | Descrição |
|---------|---------|---------|
| GET | `/funcionarios` | Lista todos os funcionários |
| POST | `/funcionarios` | Cadastra um novo funcionário |
| PUT | `/funcionarios/:id` | Atualiza os dados de um funcionário |
| DELETE | `/funcionarios/:id` | Remove um funcionário |

---

# Funcionalidades

- Cadastro de funcionários;
- Listagem de funcionários cadastrados;
- Atualização de informações dos funcionários;
- Exclusão de funcionários;
- Integração com banco de dados MySQL;
- Interface web simples e responsiva.

---

# Autor

Projeto desenvolvido para fins acadêmicos e de aprendizado em desenvolvimento web utilizando Node.js, Express e MySQL.
