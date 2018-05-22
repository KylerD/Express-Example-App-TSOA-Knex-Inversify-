import * as methodOverride from 'method-override'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import {RegisterRoutes} from './routes'
import * as swaggerUi from 'swagger-ui-express'

// controllers need to be referenced in order to get crawled by the generator
import './controllers/usersController'

const app = express()

app.use('/swagger.json', (req, res) => {
  console.log(__dirname + '/swagger.json')
  res.sendFile(__dirname + '/swagger.json')
})

let options = {
  swaggerUrl: 'http://localhost:3001/swagger.json'
}

app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, options))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())

RegisterRoutes(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new NotFoundError()
  next(err)
})

// error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  })
})

app.listen(process.env.PORT || 3001)
