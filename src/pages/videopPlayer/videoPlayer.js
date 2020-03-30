import React, { Component } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import "./videoplayer.css";
import { updatePlayDateAndTime, deleteVideo } from "../../redux/actions";
import {get} from 'lodash'

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.player = "";
  }

  seekTo = (seek) => {
    console.log(seek)
    this.player.seekTo(seek, "seconds");
  };

  componentDidMount() {
    const { location, history } = this.props;
    const seek = get(location,"state.seek",null)
    const video = get(location,"state.video",sessionStorage.getItem("video"))
    if (!(video || sessionStorage.getItem("video"))) {
      history.push("/");
      sessionStorage.clear();
    }
    if(seek===null){
      history.push('/courses')
    }


  }


  onStart = () => {
    const today = new Date();   
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes()
    const phone = sessionStorage.getItem('phone')
    this.props.dispatch(updatePlayDateAndTime(today, phone))
  };

  onEnd = () => {
   const {dispatch, location, history} =  this.props
   const video = get(location,"state.video",sessionStorage.getItem("video"))
   dispatch(deleteVideo(video, true, history))
  };

  render() {
    const { location } = this.props;
    const video = get(location,"state.video",sessionStorage.getItem("video"))
    const seek = get(location,"state.seek",0)
    return (
      <ReactPlayer
        ref={ref => (this.player = ref)}
        url={video}
        playing
        onReady={() => this.seekTo(seek)}
        onStart={() => this.onStart()}
        onEnded={() => this.onEnd()}
      />
    );
  }
}

export default connect()(VideoPlayer);
