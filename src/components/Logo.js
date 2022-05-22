import { Box } from "@mui/material";
import React from "react";
import logoImage from "../images/header_logo.svg";
import iconImage from "../images/icon_greentea.png";
import { Link } from "react-router-dom";

function Logo({ sx, disableLink = false }) {
  const logo = (
    <Box
      sx={{ backgroundColor: "green", borderRadius: "50%", ...sx }}
    >
      <img
        src={iconImage}
        alt="logo"
        width="70%"
        style={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
      <img
        src={logoImage}
        alt="logo"
        width="200%"
        style={{
          marginTop: 5,
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
    </Box>
  );

  if (disableLink) return <>{logo}</>;

  return <Link to="/">{logo}</Link>;
}

export default Logo;
