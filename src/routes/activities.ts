import { Router } from 'express'

import ActivityController from '../controllers/ActivityController'
import wrapAsync from '../wrapAsync'
import StatusController from '../controllers/StatusController'

const router = Router()

router.get('/:id(\\d+)', wrapAsync(ActivityController.find))
router.post('/', wrapAsync(ActivityController.store))
router.put('/:id(\\d+)', wrapAsync(ActivityController.update))
router.delete('/:id(\\d+)', wrapAsync(ActivityController.remove))
router.put('/:id(\\d+)/status', wrapAsync(StatusController.update))

export default router
