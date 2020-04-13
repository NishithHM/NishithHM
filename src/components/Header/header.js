import React from "react";
import Logo from "../../assets/logo.png";
import "./header.css";
import { Button } from "@material-ui/core";

const Header = props => (
  <div className="header-background">
    <div className="image-holder">
      <img src={Logo} width="150" height="100" />
    </div>
    <div style={{ flexDirection: "column" }}>
      <h2>Nithya Sanjeevini Yoga Prathishtana</h2>
      <h4>
        No 63, Lic Housing Layout, Rajarajeshwari Nagar, Bengaluru – 560098
      </h4>
    </div>
    {props.location.pathname !== "/" ? (
      <div style={{ margin: "10px 10px 0 auto", width: "100px" }}>
        <Button
          className="login-button"
          onClick={() => props.history.push("/")}
        >
          Log Out
        </Button>
        {/* <Button
          className="login-button" style={{marginTop:'10px', height:"60px"}}
          onClick={() => props.history.push("/videos")}
        >
          Go to videos
        </Button> */}
      </div>
    ) : null}
  </div>
);

export default Header;
