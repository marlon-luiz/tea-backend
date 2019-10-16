import { Request, Response } from 'express'
import _ from 'lodash'
import md5 from 'md5'

import User from '../schemas/User'

class UserController {
  /**
   * Retorna a lista de usuários
   *
   * @returns
   * ```js
   *  {
   *    users: [
   *      {
   *        id: 1,
   *        email: "marlon.custodio@outlook.com",
   *        name: "Marlon Luiz Custódio",
   *        type: "A"
   *      },
   *      ...
   *    ]
   *  }
   * ```
   */
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await User.findAll({
      attributes: ['id', 'email', 'name', 'type']
    })

    return res.json({ users })
  }

  /**
   * Retorna o usuário pelo id enviado ou null caso não seja encontrado.
   *
   * @param id integer
   *
   * @returns
   * ```js
   *  {
   *    user: {
   *      id: 1,
   *      email: "marlon.custodiooutlook.com",
   *      name: "Marlon Luiz Custódio",
   *      type: "A"
   *    }
   *  }
   * ```
   */
  public async find (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const user = await User.findOne({
      attributes: ['id', 'email', 'name', 'type'],
      where: {
        id
      }
    })

    return res.json(user)
  }

  /**
   * Insere o usuário no banco de dados.
   *
   * @param email string
   * @param password string
   * @param name string
   * @param type string
   *
   * @returns
   * ```js
   *  {
   *    user: {
   *      id: 1,
   *      email: "marlon.custodiooutlook.com",
   *      name: "Marlon Luiz Custódio",
   *      type: "A"
   *    }
   *  }
   * ```
   */
  public async store (req: Request, res: Response): Promise<Response> {
    const { email, password, passwordConfirmation, name, type } = req.body

    if (password !== passwordConfirmation) {
      throw new Error('As senhas não coincidem!')
    }

    const user = await User.create({
      email,
      password: md5(password),
      name,
      type
    })

    return res.json({ user: _.pick(user, ['id', 'email', 'name', 'type']) })
  }

  /**
   * Atualiza o usuário no banco de dados.
   *
   * @param id number
   * @param password string
   * @param name string
   *
   * @returns
   * ```js
   *  {
   *    user: {
   *      id: 1,
   *      email: "marlon.custodiooutlook.com",
   *      name: "Marlon Luiz Custódio",
   *      type: "A"
   *    }
   *  }
   * ```
   */
  public async update (req: Request, res: Response): Promise<Response> {
    const { password, name } = req.body
    const { id } = req.params

    let user = await User.findByPk(id)

    if (user === null) {
      throw new Error('Não foi possível encontrar o usuário.')
    }

    user = await user.update({
      password: md5(password),
      name
    })

    return res.json({ user: _.pick(user, ['id', 'email', 'name', 'type']) })
  }

  /**
   * Exclui o usuário pelo id enviado ou null caso não seja encontrado.
   *
   * @param id Id do usuário
   *
   * @returns
   * ```js
   *  {
   *    user: {
   *      id: 1,
   *      email: "marlon.custodiooutlook.com",
   *      name: "Marlon Luiz Custódio",
   *      type: "A"
   *    }
   *  }
   * ```
   */
  public async remove (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const user = await User.findByPk(id, {
      attributes: ['id', 'email', 'name', 'type']
    })

    if (user === null) {
      throw new Error('Não foi possível encontrar o usuário.')
    }

    user.destroy()

    return res.json({ user })
  }
}

export default new UserController()
