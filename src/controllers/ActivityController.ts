import { Request, Response } from 'express'
import _ from 'lodash'

// import Autist from '../schemas/Autist'
import User from '../schemas/User'
import Activity from '../schemas/Activity'

class ActivityController {
  public async index (req: Request, res: Response): Promise<Response> {
    const activities = await Activity.findAll()

    return res.json(activities)
  }

  public async find (req: Request, res: Response): Promise<Response> {
    const activity = await Activity.findByPk(req.params.id)

    return res.json(activity)
  }

  public async findByAutist (req: Request, res: Response): Promise<Response> {
    const activities = await Activity.findByPk(req.params.autistId)

    return res.json(activities)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const { title, description, start, end, repeat, repeatEvery, repeatOn, autistId, user } = req.body
    const errors = []

    const autist = await User.findByPk(autistId)
    if (autist === null) {
      errors.push('Não foi possível encontrar o autista.')
    }

    const creator = await User.findByPk(user)
    if (creator === null) {
      errors.push('Não foi possível encontrar o cridor.')
    }

    if (errors.length) {
      throw new Error(errors.join('\n'))
    }

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
    const { title, description, start, end, repeat, repeatEvery, repeatOn, user } = req.body
    const errors = []

    const updater = await User.findByPk(user)
    if (updater === null) {
      errors.push('Não foi possível encontrar o atualizador.')
    }

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
