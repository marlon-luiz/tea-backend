import { Router } from 'express'

import wrapAsync from '../wrapAsync'
import CaregiverController from '../controllers/CaregiverController'

const router = Router()

router.get('/', wrapAsync(CaregiverController.find))

export default router
