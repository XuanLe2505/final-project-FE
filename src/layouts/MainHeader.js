import React, { useEffect, useState } from "react";
import logoImage from "../images/header_logo.svg";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import {
  Box,
  AppBar,
  Tab,
  Tabs,
  IconButton,
  Toolbar,
  Typography,
  Link,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  InputBase,
  Container,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DrawerUser from "../components/DrawerUser";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/headerSlice";
import CartWidget from "../components/CartWidget";

function MainHeader() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState();

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.header);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const parentCategories = categories
    ? categories.filter((category) => !category.parent)
    : [];

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
                <Tabs
                  // sx={{
                  //   marginLeft: -3,
                  // }}
                  indicatorColor="secondary"
                  textColor="inherit"
                  value={value}
                  onChange={(e, value) => setValue(value)}
                >
                  {parentCategories.map((parentCategory) => (
                    <Tab
                      key={parentCategory._id}
                      value={parentCategory.name}
                      label={parentCategory.name}
                      component={RouterLink}
                      to={`/${parentCategory.name}`}
                      sx={{
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Tabs>
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
                    <AccountCircleIcon
                      sx={{
                        marginRight: "10px",
                        color: "#000",
                        cursor: "pointer",
                      }}
                    />
                    <Typography>{user?.username}</Typography>
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
                    <MenuItem
                      onClick={handleClose}
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
        <Box
          sx={{
            height: 70,
            bgcolor: "white",
            color: "white",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              width: 300,
              fontSize: "20px",
              borderBottom: 2,
              borderColor: "green",
            }}
            placeholder="     Search Anything You Want   "
            inputProps={{ "aria-label": "Anything You Want To Find" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
