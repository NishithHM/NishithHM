import React, { Component } from "react";
import { TextField, Button, Link } from "@material-ui/core";
import "./auth.css";

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
      validateForm: false
    };
  }

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
      confirmPassword
    } = this.state;

    const {history} = this.props

    if (isSignIn) {
      console.log(phoneNumber, password);
    } else {
      console.log(phoneNumber, place, password, confirmPassword);
    }

    this.setState({
      validateForm: true
    });

    // history.push('/courses')
    
  };

  render() {
    const {
      isSignIn,
      name,
      place,
      phoneNumber,
      password,
      confirmPassword,
      validateForm
    } = this.state;
    const phoneRegex = /^[2-9]{2}[0-9]{8}$/;
    const phoneNumberHelper =
      phoneNumber && !phoneRegex.test(phoneNumber)
        ? "Number Not Valid "
        : "Mandatory";
    return (
      <div className="auth-background">
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
                error={validateForm && (!phoneNumber || !phoneRegex.test(phoneNumber))}
                helperText={(validateForm && (!phoneNumber && !phoneRegex.test(phoneNumber)) ) ? phoneNumberHelper : ''}
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
            </form>
            {isSignIn ? (
              <p className="auth-switch">
                Don't Have an Account?{" "}
                <span>
                  <Link
                    className='link-style'
                    onClick={() =>
                      this.setState({
                        isSignIn: false,
                        password: "",
                        validateForm: false
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
                    className='link-style'
                    onClick={() =>
                      this.setState({
                        isSignIn: true,
                        password: "",
                        confirmPassword: "",
                        place: "",
                        name: "",
                        validateForm: false
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

export default Auth;
