import swaggerJSDoc from 'swagger-jsdoc'
import express from 'express'

const router = new express.Router()
export default router

router.get('/swagger.json', swaggerHandler)

const options = {
  swaggerDefinition: {
    info: { // API information (required)
      title: 'REST Server',
      version: '1.0.0',
      description: 'Starter service',
    },
    // host: 'localhost:3000', // Host (optional)
    basePath: '/', // Base path (optional)
  },
  apis: [
    './app/routes/api.js',
  ],
}

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options)

function swaggerHandler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(swaggerSpec)
}
