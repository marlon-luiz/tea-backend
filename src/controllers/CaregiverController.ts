import { Request, Response } from 'express'

import User from '../schemas/User'

class CaregiverController {
  async find (req: Request, res: Response): Promise<Response> {
    const { email } = req.query
    const user = await User.findOne({
      where: {
        email,
        type: 'C'
      }
    })

    return res.json(user)
  }
}

export default new CaregiverController()
