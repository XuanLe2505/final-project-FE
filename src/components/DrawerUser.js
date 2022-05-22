import React, { useEffect, useState } from "react";
import { Link as RouterLink} from "react-router-dom";
import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/headerSlice";

const DrawerUser = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  
   const dispatch = useDispatch();
   const { categories } = useSelector((state) => state.header);

   useEffect(() => {
     dispatch(getCategories());
   }, [dispatch]);

   const parentCategories = categories
     ? categories.filter((category) => !category.parent)
     : [];

  return (
    <React.Fragment>
      <Drawer
        anchor="top"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <Button
            onClick={() => setOpenDrawer(false)}
            sx={{ color: "#000", marginRight: "auto" }}
          >
            <ClearIcon />
          </Button>
          {parentCategories.map((parentCategory, index) => (
            <ListItemButton
              key={index}
              component={RouterLink}
              to={`/${parentCategory.name}`}
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemIcon>
                <ListItemText>{parentCategory.name.toUpperCase()}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "#000", marginRight: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="#000" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerUser;
