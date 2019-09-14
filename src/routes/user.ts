import { Router } from 'express'

import UserController from '../controllers/UserController'
import wrapAsync from '../wrapAsync'

const router = Router()

router.get('/', wrapAsync(UserController.index)) // Retorna a lista de usuários
router.get('/:id(\\d+)', wrapAsync(UserController.find)) // Retorna o usuário pelo id
router.get('/login', wrapAsync(UserController.login)) // Verificar o login do usuário
router.post('/', wrapAsync(UserController.store)) // Insere o usuário
router.put('/:id(\\d+)', wrapAsync(UserController.update)) // Atualiza o usuário
router.delete('/:id(\\d+)', wrapAsync(UserController.remove)) // Exclui o usuário

export default router
