import { RequestHandler, Request, Response, NextFunction } from 'express'

export default (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next)
  }
}
