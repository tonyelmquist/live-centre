import React, { Component } from 'react'
import ReactPlayer from 'react-player'
 
export default class Player extends React.Component {
  render () {
    return <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing />
  }
}