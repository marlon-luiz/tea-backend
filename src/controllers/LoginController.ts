import { Request, Response } from 'express'
import md5 from 'md5'

import User from '../schemas/User'

class LoginController {
  /**
   * Retorna se o usuário logou no sistema com sucesso.
   *
   * @header email string
   * @header password string
   *
   * @returns
   * ```js
   *  {
   *    authenticated: true|false
   *  }
   * ```
   */
  public async index (req: Request, res: Response): Promise<Response> {
    const { email = '', password = '' } = req.headers

    const countUsers = await User.count({
      where: {
        email,
        password: md5(String(password))
      }
    })

    return res.json({
      authenticated: countUsers === 1
    })
  }
}

export default new LoginController()
