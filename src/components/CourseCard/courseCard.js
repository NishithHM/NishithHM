import React, { useState } from "react";
import { get } from "lodash";
import { TextField, Button, Link } from "@material-ui/core";
import { isTimeBlocked, deleteVideoCheck } from "../../utils";
import "./courseCard.css";
import Modal from "../Modal";

const CourseCard = ({
  history,
  batch,
  userDetails,
  sendGPay,
  videos,
  lastPlayed,
  videoDelete
}) => {
  const [modal, setModal] = useState(false);
  const [isBlockedByTime, setBlocking] = useState(false);
  const [gPay, setGPay] = useState("");

  const { _id, batchName, batchTiming, description, imageUrl, price } = batch;
  const modalTime = batchTiming.split(", ")[1];
  const isRegistered = Boolean(userDetails);
  const paymentStatus = get(userDetails, "paymentStatus", "Pending");
  const batchId = get(userDetails,"batchId","0")
  const handleClose = () => {
    setModal(false);
  };
  const handleOpen = () => {
    const [deleteVideo, seek] = deleteVideoCheck(lastPlayed, (batchTiming, _id === batchId && paymentStatus==='Success'));
    const timeBlock = !(seek>0 && seek <50*60);
    if (deleteVideo) {
      videoDelete(videos[0]);
    } else {
      setBlocking(timeBlock);
      if (!modal) setModal(true);
      if (
        isRegistered &&
        paymentStatus === "Success" &&
        !timeBlock &&
        !deleteVideo
      ) {
        if (videos[0] && seek<50*60) {
          sessionStorage.setItem("video", videos[0]);
          history.push({
            pathname: "/videos",
            state: { video: videos[0], seek }
          });
        }
      }
    }
  };

  const onInputChange = e => {
    setGPay(e.target.value);
  };

  return (
    <div className="card-layout" onClick={() => handleOpen()} key={_id}>
      <div className="course-head">
        <img src={imageUrl} className="course-image" alt="lathashekhar" />
      </div>
      <div className="course-body">
        <div className="course-details">
          <h3>{batchName}</h3>
          <div className="sub-details">
            <span>{batchTiming}</span>
          </div>
          <div className="sub-details">
            <span>{description}</span>
          </div>
        </div>
      </div>
      <div className="course-footer">
        <h3>₹{price}</h3>
        {!isRegistered && <p>Register Now</p>}
        {isRegistered && paymentStatus === "Pending" && (
          <p>Registration Processing</p>
        )}
        {isRegistered && paymentStatus === "Success" && <p>Payment Verified</p>}
      </div>
      <Modal open={modal} handleClose={handleClose}>
        <div>
          <div className="course-modal-title">
            <h2>{batchName}</h2>
          </div>
          <div className="course-modal-body">
            {!isRegistered && (
              <>
                <p>
                  This Course is Open for Registration, Please process Payment
                  of ₹{price} through Google Pay to this number 8147451256 and
                  click on Register filling the Gpay reference id
                </p>
                <TextField
                  className="form-element"
                  id="gpayReferenceId"
                  label="Gpay Reference id"
                  onChange={e => onInputChange(e)}
                  type="text"
                  value={gPay}
                  error={!gPay}
                  helperText={!gPay && "Mandatory"}
                />
                <Button
                  className="login-button"
                  onClick={() => sendGPay(_id, gPay)}
                  disabled={!gPay}
                >
                  Register
                </Button>
              </>
            )}
            {isRegistered && paymentStatus === "Pending" && (
              <>
                <p>
                  Your Payment is being verified, please contact 8147451256 for
                  more details
                </p>
              </>
            )}
            {isRegistered && paymentStatus === "Success" && isBlockedByTime && (
              <>
                <p>{`You have chosen batch timings which is ${modalTime}`}</p>
              </>
            )}
            {isRegistered &&
              paymentStatus === "Success" &&
              !isBlockedByTime &&
              videos[0] === undefined && (
                <>
                  <p>You have completed this course</p>
                </>
              )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CourseCard;
