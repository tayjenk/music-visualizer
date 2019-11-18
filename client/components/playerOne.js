import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {allSongsThunk} from '../store/song'

//GOALS:
// 1.create an audio visualizer of several bars that change height and color based on audio frequency
//retrieve data from audio file and visualize with bars
// 2. implement in an mobile app or PWA that contains several visualizers playing to a playlist
// 3. next steps: connect to a music API, when user selects music visualizer is randomly selected to play

//Web Audio API provides functionailty to manipulate audio content
//creates analyserNodes which help get data from the audio stream
//assign freq data values to the height of bars

//create and set size of canvas obj
const canvas = document.getElementById('visualizer')
//inner height/width of browser's content area in px
// vs outer height = entire browser window
canvas.width = window.innerWidth
canvas.height = window.innerHeight
//.getContext method returns an obj w/ methods and props for drawing on canvas
//'2d' draws text, lines, boxes, circles on canvas
//ctx --> 'context'
const ctx = canvas.getContext('2d')

//find center of canvas
const centerX = canvas.width / 2
const centerY = canvas.height / 2
const radius = 150
//# of bars to create
const bars = 200
const audio = new Audio()
let audioCtx
let analyser
let source
let frequencyArray

class PlayerOne extends React.Component {
  constructor() {
    super()
    this.start = this.start.bind(this)
    this.visualizer = this.visualizer.bind(this)
  }

  playback() {
    return audio.play()
  }
  //Audio and analyser set-up, plays audio then runs vizualizer
  start() {
    //creates new Audio constructor returning an HTML audio element to manage and play audio
    //will be using a mix of audioNodes within the audio content
    audio.src = './songs/TEST.mp3' // the source path
    // audio.crossOrigin = 'anonymous'
    //creates a new AudioContext interface within the window
    //allows the execution of audio processing/decoding nodes- needed before doing anything else since it occurs within an audioContext
    audioCtx = new window.AudioContext()

    //returns an analyser node that exposes audio time and freq data and create data visualizations
    analyser = audioCtx.createAnalyser()

    //audioContext method, returns audio node allowing media to be played and manipulated from existing HTML audio element
    source = audioCtx.createMediaElementSource(audio)
    //connects 'source' audio node to 'destination'/analyzer node
    //analyzer node will deconstruct media played on audio HTML element
    source.connect(analyser)
    //connects 'analyser' to the destination of all audio in the context
    //(audio-rending device ex. speakers)
    analyser.connect(audioCtx.destination)

    //need to connect audio source freq shifts to visuailizer
    //creates instance array that can hold 8-bit unsigned integers
    frequencyArray = new Uint8Array(analyser.frequencyBinCount)
    //copies frequency data into the Unit8Array instance argument
    //analyzer is now an array of freq data
    // analyser.getByteFrequencyData(frequencyArray)
    //plays current audio --> since chrome50 .play on an audio or video el returns a promise
    //not supported in firefox
    // const playPromise = audio.play()
    // playPromise === undefined ? console.error(new Error('error')) : console.log('success')
    this.playback()
      .then(function() {
        console.log('pronmise fufilled')
      })
      .catch(function(error) {
        console.log(error)
      })
    //runs visualizer fn
    this.visualizer()
  }

  visualizer() {
    ctx.beginPath()
    //creates arc/curve arc(X-coord start, Y-coord start, radius from center, 0 angle start, finish @ 2*Math.PI)
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    //draws the circle
    ctx.stroke()

    analyser.getByteFrequencyData(frequencyArray)
    //loop goes through each bar
    for (let i = 0; i < bars; i++) {
      //divide circle into equal parts
      //end angle div by # of bars
      let rads = 2 * Math.PI / bars
      let barHeight = frequencyArray[i] * 0.7
      let barWidth = 2

      //create start and end of points of bars drawn
      let x = centerX + Math.cos(rads * i) * radius //351 + cosine angle of (bar * i) * radius
      let y = centerY + Math.sin(rads * i) * radius

      let xEnd = centerX + Math.cos(rads * i) * (radius + barHeight)
      let yEnd = centerY + Math.sin(rads * i) * (radius + barHeight)

      //draw bars w/ start and end points, bar width, and height based on frequency
      this.drawBar(x, y, xEnd, yEnd, barWidth, frequencyArray[i])
    }
    //tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint
    window.requestAnimationFrame(this.visualizer)
  }

  drawBar(x1, y1, x2, y2, width, frequency) {
    //creates color based on frequency
    const lineColor = `rgb(${frequency}, ${frequency}, 205)`
    ctx.strokeStyle = lineColor
    ctx.lineWidth = width
    ctx.beginPath()
    //moves to specificied point w/o creatine a line
    ctx.moveTo(x1, y1)
    //creates line between two points
    ctx.lineTo(x2, y2)
    //draws line btw established path
    ctx.stroke()
  }

  render() {
    return (
      <div>
        <button type="button" id="play" onClick={this.start}>
          START
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    songs: state.songs
  }
}

const mapDispatch = dispatch => {
  return {
    allSongs: () => dispatch(allSongsThunk())
  }
}

export default connect(mapState, mapDispatch)(PlayerOne)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
