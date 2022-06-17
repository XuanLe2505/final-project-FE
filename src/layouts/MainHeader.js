import React, { useState } from "react";
import logoImage from "../images/header_logo.svg";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Link,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Container,
  Button,
  Avatar,
} from "@mui/material";
import DrawerUser from "../components/DrawerUser";
import CartWidget from "../components/CartWidget";
import HeaderMenu from "../components/HeaderMenu";
import { useDispatch } from "react-redux";
import { getCurrentUserProfile } from "../features/userSlice";

function MainHeader() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ bgcolor: "white", color: "#074439", fontWeight: 500 }}
      >
        <Box
          sx={{
            height: 40,
            bgcolor: "green",
            color: "white",
            fontWeight: 500,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography>Free shipping on orders over $50</Typography>
        </Box>
        <Container>
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
              to="/"
              component={RouterLink}
            >
              <img src={logoImage} alt="logo" width="50%" />
            </Box>

            {isMatch ? (
              <>
                <DrawerUser />
              </>
            ) : (
              <>
                <HeaderMenu />
              </>
            )}

            <Box sx={{ display: "flex" }}>
              {isAuthenticated ? (
                <>
                  <Box
                    id="basic-button"
                    aria-controls={openMenu ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                    onClick={handleClick}
                    sx={{
                      marginRight: "20px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      alt="avatar"
                      src={user?.avatarUrl}
                    />
                  </Box>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {user?.username}
                    </Typography>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        dispatch(getCurrentUserProfile());
                      }}
                      to="/me"
                      component={RouterLink}
                    >
                      My Profile
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      to="/orders"
                      component={RouterLink}
                    >
                      My Orders
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                  <FavoriteBorderIcon
                    sx={{
                      marginRight: "10px",
                      color: "red",
                      cursor: "pointer",
                    }}
                  />
                  <CartWidget />
                </>
              ) : (
                <>
                  <Button
                    sx={{ marginLeft: "auto", fontSize: 15, fontWeight: 600 }}
                    variant="secondary"
                  >
                    <Link
                      to="/login"
                      component={RouterLink}
                      sx={{ color: "green", textDecoration: "none" }}
                    >
                      Login
                    </Link>
                  </Button>
                  <Button
                    sx={{ fontSize: 15, fontWeight: 600 }}
                    variant="secondary"
                  >
                    <Link
                      to="/register"
                      component={RouterLink}
                      sx={{ color: "green", textDecoration: "none" }}
                    >
                      SignUp
                    </Link>
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
        {/* <ProductsSearch/> */}
      </AppBar>
    </Box>
  );
}

export default MainHeader;
