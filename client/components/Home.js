import React from 'react'
import {connect} from 'react-redux'
import {allSongsThunk} from '../store/song'

const canvas = document.getElementById('visualizer')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

const centerX = canvas.width / 2
const centerY = canvas.height / 2
const radius = 150

const bars = 200
const audio = new Audio()
let audioCtx, analyser, source, frequencyArray

class PlayerOne extends React.Component {
  constructor() {
    super()
    this.start = this.start.bind(this)
    this.visualizer = this.visualizer.bind(this)
  }

  playback() {
    return audio.play()
  }

  start() {}
}
