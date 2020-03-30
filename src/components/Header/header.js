import React from "react";
import Logo from "../../assets/logo.png";
import "./header.css";
import { Button } from "@material-ui/core";

const Header = props => (
  <div className="header-background">
    <div className="image-holder">
      <img src={Logo} width="150" height="100" />
    </div>
    <h4>
      Nithya Sanjeevini Yoga Prathishtana No 63, Lic Housing Layout,
      Rajarajeshwari Nagar, Bengaluru – 560098
    </h4>
    {props.location.pathname !== "/" ? (
      <div style={{margin: "10px 10px 0 auto", width:"100px"}}>
        <Button className="login-button" onClick={()=> props.history.push('/')}>Log Out</Button>
      </div>
    ) : null}
  </div>
);

export default Header;
