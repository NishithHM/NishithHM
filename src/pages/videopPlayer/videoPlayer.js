import React, { Component } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import Fullscreen from "react-full-screen";
import "./videoplayer.css";
import { updatePlayDateAndTime, deleteVideo } from "../../redux/actions";
import { get } from "lodash";
import { Button, LinearProgress } from "@material-ui/core";
import Vimeo from '@u-wave/react-vimeo';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.player = "";
    this.seek= parseInt(sessionStorage.getItem('seek'))
    this.state = {
      isFull: false,
      loading: true
    };
  }

  goFull = () => {
    this.setState({ isFull: true });
  };

  componentDidMount() {
    const { location, history } = this.props;
    const seek =  parseInt(sessionStorage.getItem('seek'));
    const video = get(location, "state.video", sessionStorage.getItem("video"));
    if (!(video || sessionStorage.getItem("video"))) {
      history.push("/");
      sessionStorage.clear();
    }
    if ( !seek ) {
      history.push("/courses");
    }
  }

  onStart = () => {
    this.setState({
      loading: false,
    });
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    // const time = today.getHours() + ":" + today.getMinutes();
    const phone = sessionStorage.getItem("phone");
    this.props.dispatch(updatePlayDateAndTime(today, phone));
  };

  onEnd = () => {
    const { dispatch, location, history } = this.props;
    const video = get(location, "state.video", sessionStorage.getItem("video"));
    // dispatch(deleteVideo(video, true, history));
    // history.push('/courses')
  };

  onSeek = ({seconds}) => {
    if (seconds - this.seek > 3 * 60) {
      this.seek = seconds;
      sessionStorage.setItem("seek", this.seek);
    }
  };

  render() {
    const { location } = this.props;
    const { loading } = this.state;
    const video = get(location, "state.video", sessionStorage.getItem("video"));
    const seek = parseInt(sessionStorage.getItem("seek"));  
    return (
      <div>
        <Button className="fullscreen-button" onClick={() => this.goFull()}>
          Go Full Screen
        </Button>
        <div style={{ pointerEvents: "none" }}>
          <Fullscreen
            enabled={this.state.isFull}
            onChange={(isFull) => this.setState({ isFull })}
          >
            {loading && (
              <div>
              <br/>
                <LinearProgress />
              <br/>
              <h3>Loading...</h3>
              </div>
            )}
            {video && <Vimeo
              video={
                video.trim()
              }
              autoplay
              start={seek}
              onPlay={() => this.onStart()}
              onEnd={() => this.onEnd()}
              onTimeUpdate={(e) => this.onSeek(e)}
              height={window.outerHeight}
              width={window.outerWidth}
              controls={false}
            />}
          </Fullscreen>
        </div>
      </div>
    );
  }
}

export default connect()(VideoPlayer);
