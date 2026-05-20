import db from 'config/db.js';

export const listarFuncionarios = (req, res) => {

    db.query('SELECT * FROM funcionarios', (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao listar funcionários' });
        res.json(results); 
    });
};
