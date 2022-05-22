import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const pagesAdmin = ["DASHBOARD", "PRODUCTS", "ADD PRODUCT", "ORDERS", "USERS"];

const DrawerAdmin = () => {
  const [openDrawerAdmin, setOpenDrawerAdmin] = useState(false);

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawerAdmin}
        onClose={() => setOpenDrawerAdmin(false)}
      >
        <List>
          {pagesAdmin.map((page, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                <ListItemText>{page}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "#000", marginRight: "auto" }}
        onClick={() => setOpenDrawerAdmin(!openDrawerAdmin)}
      >
        <MenuIcon color="#000" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerAdmin;
