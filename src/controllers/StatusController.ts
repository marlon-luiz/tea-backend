import { Request, Response } from 'express'
import _ from 'lodash'

import Activity from '../schemas/Activity'

class StatusController {

  public async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { user } = req.headers
    const errors = []

    let activity = await Activity.findByPk(id, {
      attributes: [
        'id',
        'title',
        'description',
        'start',
        'end',
        'repeat',
        'repeatEvery',
        'repeatOn',
        'autistId',
        'isConcluded'
      ]
    })

    if (activity === null) {
      errors.push('Não foi possível encontrar a atividade.')
    }

    if (errors.length) {
      throw new Error(errors.join('\n'))
    }

    if (activity !== null) {
      activity = await activity.update({
        isConcluded: true,
        updatedBy: user
      })
    }

    return res.json(_.pick(activity, [
      'id',
      'title',
      'description',
      'start',
      'end',
      'repeat',
      'repeatEvery',
      'repeatOn',
      'autistId',
      'isConcluded'
    ]))
  }

}

export default new StatusController()
