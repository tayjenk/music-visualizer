const Sequelize = require('sequelize')
const db = require('../db')

const Song = db.define('song', {
  name: Sequelize.STRING,
  artist: Sequelize.STRING,
  audioUrl: Sequelize.TEXT,
  artworkUrl: Sequelize.TEXT
})

module.exports = Song
