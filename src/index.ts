import 'dotenv/config'

import app from './app'

app.listen(process.env.PORT)

console.log('Listening to the port', process.env.PORT)
