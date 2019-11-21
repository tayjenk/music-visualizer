'use strict'

const db = require('../server/db')
const {Song} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const songs = [
    {
      name: 'Praise The Lord',
      artist: 'A$AP Rocky',
      audioUrl:
        './songs/A$AP Rocky - Praise The Lord (Da Shine) (Official Video) ft. Skepta.mp3',
      artworkUrl:
        'https://d2tml28x3t0b85.cloudfront.net/tracks/artworks/000/966/290/original/32bb70.jpeg?1547326343'
    },
    {
      name: 'Ocean Eyes',
      artist: 'Billie Eilish',
      audioUrl: './songs/Billie Eilish - Ocean Eyes (Official Music Video).mp3',
      artworkUrl:
        'https://d2tml28x3t0b85.cloudfront.net/tracks/artworks/000/891/317/original/1a253b.jpeg?1537358188'
    },
    {
      name: 'Adore ft Ariana Grande',
      artist: 'Cashmere Cat',
      audioUrl:
        './songs/Cashmere_Cat_-_Adore_Audio_ft_Ariana_Grande[Mp3Converter.net].mp3',
      artworkUrl:
        'https://c-sf.smule.com/sf/s39/arr/73/63/bbe9a686-2148-48b4-9c28-6570432e678c_512.jpg'
    },
    {
      name: 'Level Up',
      artist: 'Ciara',
      audioUrl: './songs/Ciara - Level Up.mp3',
      artworkUrl:
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Ciara_-_Level_Up_single_cover.png/220px-Ciara_-_Level_Up_single_cover.png'
    },
    {
      name: 'Woke Up Late',
      artist: 'Drax Project',
      audioUrl: './songs/Drax Project - Woke Up Late [Official Audio].mp3',
      artworkUrl:
        'https://upload.wikimedia.org/wikipedia/en/f/ff/Drax_Project_featuring_Hailee_Steinfeld_-_Woke_Up_Late.png'
    }
  ]

  await Promise.all(
    songs.map(song =>
      Song.create({
        name: song.name,
        artist: song.artist,
        audioUrl: song.audioUrl,
        artworkUrl: song.artworkUrl
      })
    )
  )

  console.log(`seeded ${songs.length} songs`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
