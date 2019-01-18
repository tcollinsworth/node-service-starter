import express from 'express'
import wrap from 'express-async-wrap'

const router = new express.Router()
export default router

async function bitBucket(req, resp) {
  resp.status(200).send()
  // resp.status(409).send()
  // resp.status(500).send()
}

router.post('/bit-bucket/*', wrap(bitBucket))
router.get('/bit-bucket/*', wrap(bitBucket))
router.put('/bit-bucket/*', wrap(bitBucket))
router.patch('/bit-bucket/*', wrap(bitBucket))
router.delete('/bit-bucket/*', wrap(bitBucket))
