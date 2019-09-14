import { Router } from 'express'

import fs from 'fs'

const routes = Router()

fs.readdir(`${__dirname}/routes`, (err, files = []) => {
  files.forEach(async file => {
    const routeStr = file.substr(0, file.lastIndexOf('.'))

    const { default: route } = await import(`./routes/${file}`)

    routes.use(`/${routeStr}`, route)
  })

  err && console.log('Erro', err)
})

export default routes
