import express from 'express'

const router = express.Router()
export default router

/**
* @swagger
* securityDefinitions:
*   basicAuth:
*     type: basic
*
*'/foo':
*    get:
*      tags:
*        - Foo API
*      summary: "Returns { foo: 42 }"
*      description: "Return { foo: 42 }"
*      produces:
*        - application/json
*      security:
*        - basicAuth: []
*      parameters:
*
*      responses:
*        200:
*          description: "{ foo: 42 }"
*        401:
*          description: "Unauthorized"
*        500:
*          description: "Internal Server Error"
*/
router.get('/foo', (req, resp) => resp.json({ foo: 42 }))

/**
* @swagger
*'/bar':
*    get:
*      tags:
*        - Foo API
*      summary: "Returns { bar: 42 }"
*      description: "Return { bar: 42 }"
*      produces:
*        - application/json
*      security:
*        - basicAuth: []
*      parameters:
*
*      responses:
*        200:
*          description: "{ bar: 42 }"
*        401:
*          description: "Unauthorized"
*        500:
*          description: "Internal Server Error"
*/
router.get('/bar', (req, res) => {
  res.json({ bar: 43 })
})
