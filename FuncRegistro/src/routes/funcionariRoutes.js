import express from 'express';
import { 

    listarFuncionarios,
    inserirFuncionario,
    atualizarFuncionario,
    deletarFuncionario

} from '../controllers/funcionarioController.js';

const router = express.Router();

router.get('/', listarFuncionarios);
router.post('/', inserirFuncionario);
router.put('/:id', atualizarFuncionario);
router.delete('/:id', deletarFuncionario);

export default router;
