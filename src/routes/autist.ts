import { Router } from 'express'

import AutistController from '../controllers/AutistController'
import ActivityController from '../controllers/ActivityController'
import wrapAsync from '../wrapAsync'

const router = Router()

router.get('/', wrapAsync(AutistController.index))
router.get('/:autistId(\\d+)/activities', wrapAsync(ActivityController.findByAutist))
router.post('/', wrapAsync(AutistController.store))
router.put('/:id(\\d+)', wrapAsync(AutistController.update))
router.delete('/:id(\\d+)', wrapAsync(AutistController.remove))

export default router
