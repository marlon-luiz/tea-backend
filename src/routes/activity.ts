import { Router } from 'express'

import ActivityController from '../controllers/ActivityController'
import wrapAsync from '../wrapAsync'

const router = Router()

router.get('/', wrapAsync(ActivityController.index))
router.post('/', wrapAsync(ActivityController.store))
router.put('/:id(\\d+)', wrapAsync(ActivityController.update))
router.delete('/:id(\\d+)', wrapAsync(ActivityController.remove))

export default router
