import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, Button, Link } from "@material-ui/core";
import "./auth.css";
import { login, signUp } from "../../redux/actions";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: true,
      name: "",
      place: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      validateForm: false,
      errorMsg: ""
    };
  }

  componentDidMount(){
    sessionStorage.clear()
  }

  componentDidUpdate = prevprops => {
    const { loginError, signUp } = this.props;

    if (prevprops.loginError !== loginError) {
      loginError
        ? this.setState({
            errorMsg:
              "Check Username and password or logout from other devices and try again"
          })
        : this.setState({
            errorMsg: ""
          });
    }

    if (prevprops.signUp !== signUp) {
      signUp ? this.setState({
        isSignIn: true,
        password: "",
        confirmPassword: "",
        place: "",
        name: "",
        validateForm: false,
        errorMsg: "Sign up Successful Login now"
      }) : this.setState({
        errorMsg:"Sign in Failed, User may already Registered, contact admin 8147451256"
      })
    }
  };

  onInputChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value
    });
  };

  authUser = () => {
    const {
      isSignIn,
      phoneNumber,
      password,
      place,
      confirmPassword,
      name
    } = this.state;

    const { history } = this.props;

    if (isSignIn) {
      this.props.dispatch(login(phoneNumber, password, history));
    } else {
      if (phoneNumber.split("").length !== 10)
        this.setState({
          errorMsg: "Phone Number should be 10 Digits"
        });
      if (password !== confirmPassword)
        this.setState({
          errorMsg: "Password Mismatch"
        });
      if (name === "" || place === "" || password === "")
        this.setState({
          errorMsg: "Some Fields are Empty"
        });
      else {
        this.props.dispatch(signUp(phoneNumber, password, name, place));
        this.setState({
          errorMsg: ""
        });
      }
    }

    this.setState({
      validateForm: true
    });

  };

  render() {
    const {
      isSignIn,
      name,
      place,
      phoneNumber,
      password,
      confirmPassword,
      validateForm,
      errorMsg
    } = this.state;
    const { loading, isLoggedIn, loginError } = this.props;
    const phoneRegex = /^[2-9]{2}[0-9]{8}$/;
    const phoneNumberHelper =
      phoneNumber && !phoneRegex.test(phoneNumber)
        ? "Number Not Valid "
        : "Mandatory";
    return (
      <div
        className="auth-background"
        style={{
          opacity: loading ? 0.5 : 1,
          pointerEvents: loading ? "none" : "all"
        }}
      >
        <div className="auth-box">
          <div className="auth-header">
            <div className="login-holder">
              <span className="login-title">
                Dr. Lathashekhar's Yoga Classes
              </span>
              <br />
              <span className="login-text">
                {isSignIn ? "Login" : "Sign Up"}
              </span>
            </div>
          </div>
          <div className="auth-body">
            <form className="auth-form" noValidate autoComplete="off">
              {!isSignIn && (
                <TextField
                  className="form-element"
                  id="name"
                  label="Name"
                  onChange={this.onInputChange}
                  value={name}
                  error={validateForm && !name}
                  helperText={validateForm && !name && "Mandatory"}
                />
              )}

              {!isSignIn && (
                <TextField
                  className="form-element"
                  id="place"
                  label="Place"
                  onChange={this.onInputChange}
                  value={place}
                  error={validateForm && !place}
                  helperText={validateForm && !place && "Mandatory"}
                />
              )}
              <TextField
                className="form-element"
                id="phoneNumber"
                label="Phone Number"
                onChange={this.onInputChange}
                type="number"
                value={phoneNumber}
                error={
                  validateForm &&
                  (!phoneNumber || !phoneRegex.test(phoneNumber))
                }
                helperText={
                  validateForm && !phoneNumber && !phoneRegex.test(phoneNumber)
                    ? phoneNumberHelper
                    : ""
                }
              />
              <TextField
                className="form-element"
                id="password"
                label="Password"
                onChange={this.onInputChange}
                type="password"
                value={password}
                error={validateForm && !password}
                helperText={validateForm && !password && "Mandatory"}
              />
              {!isSignIn && (
                <TextField
                  className="form-element"
                  id="confirmPassword"
                  label="Confirm Password"
                  onChange={this.onInputChange}
                  type="password"
                  value={confirmPassword}
                  error={validateForm && !confirmPassword}
                  helperText={validateForm && !confirmPassword && "Mandatory"}
                />
              )}
              <div style={{ marginLeft: "10%" }}>
                <Button
                  className="login-button"
                  onClick={() => this.authUser()}
                >
                  {isSignIn ? "Login" : "Sign Up"}
                </Button>
              </div>
              <br />
              <span style={{ color: "red" }}>{errorMsg}</span>
            </form>
            {isSignIn ? (
              <p className="auth-switch">
                Don't Have an Account?{" "}
                <span>
                  <Link
                    className="link-style"
                    onClick={() =>
                      this.setState({
                        isSignIn: false,
                        password: "",
                        validateForm: false,
                        errorMsg: ""
                      })
                    }
                  >
                    Sign Up
                  </Link>
                </span>
              </p>
            ) : (
              <p>
                Already Have an Account?{" "}
                <span>
                  <Link
                    className="link-style"
                    onClick={() =>
                      this.setState({
                        isSignIn: true,
                        password: "",
                        confirmPassword: "",
                        place: "",
                        name: "",
                        validateForm: false,
                        errorMsg: ""
                      })
                    }
                  >
                    Login
                  </Link>
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.promiseReducer.loading,
    isLoggedIn: state.authReducer.isLoggedIn,
    loginError: state.authReducer.loginError,
    signUp: state.authReducer.signUp
  };
};

export default connect(mapStateToProps)(Auth);
