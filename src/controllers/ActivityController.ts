import { Request, Response } from 'express'
import _ from 'lodash'

import Activity from '../schemas/Activity'

class ActivityController {
  public async index (req: Request, res: Response): Promise<Response> {
    const { autistId } = req.params

    const activities = await Activity.findAll({
      where: { autistId },
      attributes: [
        'id',
        'title',
        'description',
        'start',
        'end',
        'repeat',
        'repeatEvery',
        'repeatOn',
        'autistId'
      ]
    })

    return res.json(activities)
  }

  public async find (req: Request, res: Response): Promise<Response> {
    const activity = await Activity.findByPk(req.params.id)

    return res.json(activity)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const { title, description, start, end, repeat, repeatEvery, repeatOn, autistId } = req.body
    const { user } = req.headers

    const activity = await Activity.create({
      title,
      description,
      start,
      end,
      repeat,
      repeatEvery,
      repeatOn,
      autistId,
      createdBy: user,
      updatedBy: user
    })

    return res.json(_.pick(activity, [
      'title',
      'description',
      'start',
      'end',
      'repeat',
      'repeatEvery',
      'repeatOn',
      'autistId'
    ]))
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { title, description, start, end, repeat, repeatEvery, repeatOn } = req.body
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
        'autistId'
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
        title,
        description,
        start,
        end,
        repeat,
        repeatEvery,
        repeatOn,
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
      'autistId'
    ]))
  }

  public async remove (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const errors = []

    const activity = await Activity.findByPk(id, {
      attributes: [
        'id',
        'title',
        'description',
        'start',
        'end',
        'repeat',
        'repeatEvery',
        'repeatOn',
        'autistId'
      ]
    })

    if (activity === null) {
      errors.push('Não foi possível encontrar a atividade.')
    }

    if (errors.length) {
      throw new Error(errors.join('\n'))
    }

    if (activity !== null) {
      await activity.destroy()
    }

    return res.json(activity)
  }
}

export default new ActivityController()
