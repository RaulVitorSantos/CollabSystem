import express from 'express';
import dotenv from 'dotenv';
import funcionarioRoutes from './routes/funcionariRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use('/funcionarios', funcionarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});