import React, { Component } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import Fullscreen from "react-full-screen";
import "./videoplayer.css";
import { updatePlayDateAndTime, deleteVideo } from "../../redux/actions";
import { get } from "lodash";
import { Button } from "@material-ui/core";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.player = "";
    this.state = {
      isFull: false,
    };
  }

  goFull = () => {
    this.setState({ isFull: true });
  }

  seekTo = seek => {
    this.player.seekTo(seek, "seconds");
  };

  componentDidMount() {
    const { location, history } = this.props;
    const seek = get(location, "state.seek", 0);
    const video = get(location, "state.video", sessionStorage.getItem("video"));
    if (!(video || sessionStorage.getItem("video"))) {
      history.push("/");
      sessionStorage.clear();
    }
    if (seek === 0) {
      history.push("/courses");
    }
  }

  onStart = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time = today.getHours() + ":" + today.getMinutes();
    const phone = sessionStorage.getItem("phone");
    this.props.dispatch(updatePlayDateAndTime(today, phone));
  };

  onEnd = () => {
    const { dispatch, location, history } = this.props;
    const video = get(location, "state.video", sessionStorage.getItem("video"));
    dispatch(deleteVideo(video, true, history));
  };

  render() {
    const { location } = this.props;
    const video = get(location, "state.video", sessionStorage.getItem("video"));
    const seek = get(location, "state.seek", 0);
    return (
      <div>
      <Button
          className="fullscreen-button"
          onClick={() => this.goFull()}
        >
          Go Full Screen
        </Button>
      <div style={{ pointerEvents: "none" }}>
      <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({isFull})}
        >
        <ReactPlayer
          ref={ref => (this.player = ref)}
          url={video.trim()}
          playing
          onReady={() => this.seekTo(seek)}
          onStart={() => this.onStart()}
          onEnded={() => this.onEnd()}
          height={window.outerHeight}
          width={window.outerWidth}
        />
        </Fullscreen>
      </div>
      </div>
    );
  }
}

export default connect()(VideoPlayer);
