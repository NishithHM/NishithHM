import React from "react";
import Logo from "../../assets/logo.png";
import "./header.css";

const Header = () => (
  <div className="header-background">
    <div className="image-holder">
      <img src={Logo} width="150" height="100" />
    </div>
    <h4>
        Nithya Sanjeevini Yoga Prathishtana No 63, Lic Housing Layout,
        Rajarajeshwari Nagar, Bengaluru – 560098
      </h4>
  </div>
);

export default Header;
