import express from 'express'
import cors from 'cors'
import routesController from './routes/routes.js'


const app = express()
app.use(express.json())

app.use(cors())

app.use('/', routesController)

export default app
