import React, { Component } from 'react'
import ReactPlayer from 'react-player'
 



// https://download.mediabankweb.com/online/72ad0542c6144c978dbb9154fc606291/58f9ef3a/THEFUTUREG/201703/954844/954844_proxy.mov

export default class Player extends React.Component {

  constructor(props) {
    super(props);
    this.state = {url: ''};
  }

  render () {
    return <ReactPlayer playing='false' controls='true' url='https://download.mediabankweb.com/online/72ad0542c6144c978dbb9154fc606291/58f9ef3a/THEFUTUREG/201703/954844/954844_proxy.mov' playing />
  }
}