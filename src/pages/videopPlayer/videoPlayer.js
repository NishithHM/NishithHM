import React, { Component } from "react";
import ReactPlayer from "react-player";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.player = "";
  }

  seekTo=()=>{
    this.player.seekTo(3600, "seconds")
    
  }

  render() {
    this.player && this.player.seekTo(3600, "seconds");
    return (
      <ReactPlayer
        ref={ref => (this.player = ref)}
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
        playing
        controls
        onReady={()=>this.seekTo()}
      />
    );
  }
}

export default VideoPlayer;
