const router = require('express').Router()
const {Song} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const songs = await Song.findAll()
    res.json(songs)
  } catch (err) {
    next(err)
  }
})
