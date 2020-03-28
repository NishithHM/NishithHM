import React, { useState } from "react";
import { TextField, Button, Link } from "@material-ui/core";
import "./courseCard.css";
import Modal from "../Modal";

const CourseCard = ({history}) => {
  const [modal, setModal] = useState(false);

  const isRegistered = true
  const paymentStatus = "success"

  const handleClose = () => {
    setModal(false);
  };

  const handleOpen = () => {
    if (!modal) setModal(true);

    if(isRegistered && paymentStatus==="success"){
      history.push('/videos')
    }
  };


  return (
    <div className="card-layout" onClick={() => handleOpen()}>
      <div className="course-head">
        <img
          src="https://i.udemycdn.com/course/240x135/625204_436a_2.jpg"
          className="course-image"
          alt="lathashekhar"
        />
      </div>
      <div className="course-body">
        <div className="course-details">
          <h3>The Web Developer Bootcamp</h3>
          <div className="sub-details">
            <span>
              {" "}
              &#x2022; 16 Lectures.&emsp;&#x2022; Morning 7:00AM to 8:00AM Mon-Thu
            </span>
          </div>
          <div className="sub-details">
            <span>
              The only course you need to learn web development - HTML, CSS, JS,
              Node, and More!
            </span>
          </div>
        </div>
      </div>
      <div className="course-footer">
        <h3>₹710</h3>
        {!isRegistered && <p>Register Now</p> }
        {isRegistered && paymentStatus==='pending' && <p>Registration Processing</p>}
        {isRegistered && paymentStatus==="success" && <p>Payment Verified</p>}
      </div>
      <Modal open={modal} handleClose={handleClose}>
        <div>
          <div className="course-modal-title">
            <h2>The Web Developer Bootcamp</h2>
          </div>
          <div className="course-modal-body">
          {!isRegistered && 
            <>
            <p>
              This Course is Open for Registration, Please process Payment of
              ₹500 through Google Pay to this number 9448983383 and click on
              Register filling the Gpay reference id
            </p>
            <TextField
              className="form-element"
              id="gpayReferenceId"
              label="Gpay Reference id"
              // onChange={this.onInputChange}
              type="text"
              // value={confirmPassword}
              // error={validateForm && !confirmPassword}
              // helperText={validateForm && !confirmPassword && "Mandatory"}
            />
            <Button
              className="login-button"
              // onClick={() => this.authUser()}
            >
              Register
            </Button>
          </>
          }
          {isRegistered && paymentStatus==='pending' &&
            <>
            <p>
              Your Payment is being verified, please contact 9448983383 for more details
            </p>
            
          </>
          }
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CourseCard;
