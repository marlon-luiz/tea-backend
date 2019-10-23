import { Request, Response } from 'express'
import _ from 'lodash'
import { Op } from 'sequelize'

import Autist from '../schemas/Autist'
import User from '../schemas/User'

class AustistController {
  public async index (req: Request, res: Response): Promise<Response> {
    const { user } = req.headers

    const autists = await Autist.findAll({
      where: {
        [Op.or]: [
          { createdBy: String(user) },
          { responsibleId: String(user) }
        ]
      },
      attributes: ['id', 'name', 'responsibleId'],
      include: [
        {
          model: User,
          foreignKey: 'responsibleId',
          as: 'responsible',
          attributes: ['name', 'email']
        }
      ]
    })

    return res.json(autists)
  }

  public async find (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const autist = await Autist.findByPk(id, {
      attributes: ['id', 'name', 'responsibleId'],
      include: [
        {
          model: User,
          foreignKey: 'responsibleId',
          as: 'responsible',
          attributes: ['name', 'email']
        }
      ]
    })

    return res.json(autist)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const { name, responsibleId } = req.body
    const { user } = req.headers

    const autist = await Autist.create({
      name,
      responsibleId,
      createdBy: user,
      updatedBy: user
    })

    return res.json(_.pick(autist, ['id', 'name', 'responsibleId']))
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, responsibleId } = req.body
    const { user } = req.headers
    const errors = []

    let autist = await Autist.findByPk(id, {
      attributes: ['id', 'name', 'responsibleId']
    })

    if (autist === null) {
      errors.push('Não foi possível encontrar o autista.')
    }

    if (errors.length) {
      throw new Error(errors.join('\n'))
    }

    if (autist !== null) {
      autist = await autist.update({
        name,
        responsibleId,
        updatedBy: user
      })
    }

    return res.json(_.pick(autist, ['id', 'name', 'responsibleId']))
  }

  public async remove (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const errors = []

    const autist = await Autist.findByPk(id, {
      attributes: ['id', 'name', 'responsibleId']
    })

    if (autist === null) {
      errors.push('Não foi possível encontrar o autista.')
    }

    if (errors.length) {
      throw new Error(errors.join('\n'))
    }

    if (autist !== null) {
      await autist.destroy()
    }

    return res.json(autist)
  }
}

export default new AustistController()
