import React, { Component } from "react";
import { connect } from "react-redux";
import "./courses.css";
import { CourseCard } from "../../components";
import { getBatchData, updateUserBatch, deleteVideo } from "../../redux/actions";
import { get } from "lodash";
class Courses extends Component {
  componentDidMount() {
    this.props.dispatch(getBatchData());
  }

  sendGPay = (batchId, gpayRefId) => {
    const { loginDetails, dispatch } = this.props;
    const currentBatchDetails = get(loginDetails, "batchDetails", []);
    const batchDetails = [...currentBatchDetails, { batchId, gpayRefId }];
    dispatch(updateUserBatch(batchDetails));
  };

  videoDelete=(video)=>{
    this.props.dispatch(deleteVideo(video, true, this.props.history))
  }
  render() {
    const { loading, batchData, loginDetails } = this.props;
    const userBatch = get(loginDetails, "batchDetails", []);

    return (
      <div
        className="course-container"
        style={{
          opacity: loading ? 0.5 : 1,
          pointerEvents: loading ? "none" : "all"
        }}
      >
        <h2 className="course-header">List of Courses</h2>
        {batchData.map(batch => {
          const userBatchInfo = userBatch.filter(
            data => data.batchId === batch._id
          );
          return (
            <CourseCard
              {...this.props}
              batch={batch}
              userDetails={userBatchInfo[0]}
              sendGPay={this.sendGPay}
              videos={loginDetails.videos}
              lastPlayed = {loginDetails.lastPlayed}
              videoDelete={this.videoDelete}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.promiseReducer.loading,
    batchData: state.courseReducer.batchData,
    loginDetails: state.authReducer.loginDetails
  };
};

export default connect(mapStateToProps)(Courses);
