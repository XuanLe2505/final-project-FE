import React, { useEffect } from "react";
import { Button, Menu, MenuItem, Stack } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/categorySlice";
import NestedMenuItem from "material-ui-nested-menu-item";
import { Box } from "@mui/system";

function HeaderMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.header);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const parentCategories = categories
    ? categories.filter((category) => category.parent === null)
    : [];
  const subCategories = categories
    ? categories.filter((category) => category.parent)
    : [];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justiyContent: "space-between",
          alignItem: "center",
        }}
      >
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleOpen}
          sx={{
            fontSize: "14px",
            color: "#000",
            ":hover": { color: "#074439", bgcolor: "#fff" },
          }}
        >
          Products
        </Button>
        <Button
          sx={{
            fontSize: "14px",
            color: "#000",
            ":hover": { color: "#074439", bgcolor: "#fff" },
          }}
        >
          OFFERS & EVENT
        </Button>
        <Button
          sx={{
            fontSize: "14px",
            color: "#000",
            ":hover": { color: "#074439", bgcolor: "#fff" },
          }}
        >
          STORES
        </Button>
        <Button
          sx={{
            fontSize: "14px",
            color: "#000",
            ":hover": { color: "#074439", bgcolor: "#fff" },
          }}
        >
          ABOUT US
        </Button>
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        disableScrollLock={true}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {parentCategories.map((parentCategory) => (
          <NestedMenuItem
            key={parentCategory._id}
            label={parentCategory.name}
            parentMenuOpen={true}
            onClick={() => {
              setAnchorEl(null);
              navigate(`/${parentCategory.name}`);
            }}
            sx={{
              fontSize: "14px",
              color: "#000",
              ":hover": { color: "#074439", bgcolor: "#fff" },
              textTransform: "capitalize",
            }}
          >
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{
                px: 2,
              }}
            >
              {subCategories
                .filter(
                  (subCategory) => subCategory.parent === parentCategory._id
                )
                .map((subCategory) => (
                  <MenuItem
                    key={subCategory._id}
                    component={RouterLink}
                    to={`/${subCategory.name}`}
                    onClick={handleClose}
                    sx={{
                      color: "#000",
                      ":hover": { color: "#074439", bgcolor: "#fff" },
                      textTransform: "capitalize",
                    }}
                  >
                    {subCategory.name}
                  </MenuItem>
                ))}
            </Stack>
          </NestedMenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default HeaderMenu;
