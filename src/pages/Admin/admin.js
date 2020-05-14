import React, { Component } from "react";
import { connect } from "react-redux";
import { UserCard } from "../../components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@material-ui/core";
import "./admin.css";
import {
  getUserList,
  getBatchData,
  updateUserPayment
} from "../../redux/actions";
import { arrayReformat, getLogs } from "../../utils";

class Admin extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getUserList());
    dispatch(getBatchData());
  }

  componentDidUpdate() {
    const { loginDetails, history } = this.props;

    if (loginDetails.role === "user") {
      history.push("/");
      sessionStorage.clear();
    }
  }

  updatePayment = (phone, batchId, paymentStatus) => {
    const { userList, dispatch } = this.props;
    const currentUser = userList.filter(user => user.phone === phone);
    const batchDetails = [];
    currentUser[0].batchDetails.map(data => {
      if (data.batchId === batchId) {
        paymentStatus === "Pending"
          ? batchDetails.push({ ...data, paymentStatus: "Success" })
          : batchDetails.push({ ...data, paymentStatus: "Pending" });
      } else {
        batchDetails.push({ ...data });
      }
    });
    dispatch(updateUserPayment(phone, true, batchDetails));
  };

  render() {
    const {
      loading,
      userList,
      listError,
      batchData,
      loginDetails
    } = this.props;
    const userBatch = arrayReformat(userList, batchData);

   
    // getLogs(userList)
    const lastPlayed = userList.filter(user=> user.lastPlayed)
    console.log(lastPlayed)
    
    return (
      <div
        className="admin-container"
        style={{
          opacity: loading ? 0.5 : 1,
          pointerEvents: loading ? "none" : "all"
        }}
      >
        <h2 className="course-header">List of Users</h2>
        <TableContainer component={Paper}>
          <Table className="admin-table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Sl.No</strong>
                </TableCell>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Place</strong>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <strong>Number</strong>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <strong>Gpay ref</strong>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <strong>Batch Name</strong>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <strong>Payment Status</strong>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <strong>Approve Payment</strong>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <strong>To be played</strong>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <strong>Renewals</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userBatch.map((row, index) => {
                const {
                  name,
                  phone,
                  place,
                  gpayRefId,
                  paymentStatus,
                  batchName,
                  batchId,
                  videos,
                  lastPlayed,

                } = row;
                return (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="left">{place}</TableCell>
                    <TableCell align="left">{phone}</TableCell>
                    <TableCell align="left">{gpayRefId || "----"}</TableCell>
                    <TableCell align="left">{batchName || "----"}</TableCell>
                    <TableCell align="left">
                      {paymentStatus || "----"}
                    </TableCell>
                    <TableCell align="left">
                      {paymentStatus && (
                        <Button
                          className="login-button"
                          onClick={() =>
                            this.updatePayment(phone, batchId, paymentStatus)
                          }
                        >
                          {paymentStatus === "Pending"
                            ? "Approve"
                            : "Disapprove"}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="left">
                          {paymentStatus==="Success" ? lastPlayed ? `Day ${18 - videos.length+2}` : `Day ${18 - videos.length+1}` : null}
                    </TableCell>
                    <TableCell align="left">
                          {paymentStatus==="Success" && videos.length===0 && (
                            <Button
                            className="login-button"
                            onClick={() =>
                              this.updatePayment(phone, batchId, "true")
                            }>
                            Renew
                             </Button> 
                          )
                            }
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.promiseReducer.loading,
    userList: state.adminReducer.userList,
    listError: state.adminReducer.listError,
    batchData: state.courseReducer.batchData,
    loginDetails: state.authReducer.loginDetails
  };
};

export default connect(mapStateToProps)(Admin);
