import React, { useState } from "react";
import logoImage from "../images/header_logo.svg";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import {
  Box,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Link,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DrawerAdmin from "../components/DrawerAdmin";




function AdminHeader() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = Boolean(anchorEl);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleLogout = async () => {
    try {
      handleClose();
      await logout(() => {
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.up("xs"));

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ bgcolor: "white", color: "green", fontWeight: 500 }}
      >
        <Box
          sx={{ height: 40, bgcolor: "green", color: "white", fontWeight: 500 }}
        ></Box>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <img src={logoImage} alt="logo" width="50%" />
          </Box>

          {isMatch ? (
            <>
              <DrawerAdmin />
            </>
          ) : null}

          <Box sx={{ display: "flex", justifyContent: "right" }}>
            {isAuthenticated ? (
              <>
                <Typography
                  id="basic-button"
                  aria-controls={openMenu ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ marginRight: "20px", cursor: "pointer" }}
                >
                  {user?.username}
                </Typography>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <IconButton
                  sx={{ marginLeft: "auto", fontSize: 18, fontWeight: 500 }}
                  variant="secondary"
                >
                  <Link
                    to="/login"
                    component={RouterLink}
                    sx={{ color: "green", textDecoration: "none" }}
                  >
                    Login
                  </Link>
                </IconButton>
                <IconButton
                  sx={{ marginLeft: "10px", fontSize: 18, fontWeight: 500 }}
                  variant="secondary"
                >
                  <Link
                    to="/register"
                    component={RouterLink}
                    sx={{ color: "green", textDecoration: "none" }}
                  >
                    SignUp
                  </Link>
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AdminHeader;
