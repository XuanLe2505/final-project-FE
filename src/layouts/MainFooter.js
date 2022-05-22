import { Link, Typography } from "@mui/material";
import React from "react";

function MainFooter() {
  return (
    <Typography
      variant="body2"
      align="center"
      p={1}
      sx={{ bgcolor: "#064a09", color: "#fff", fontSize: 16 }}
    >
      Copyright © <Link href="https://www.innisfree.vn">Innisfree</Link>{" "}
      {new Date().getFullYear()} .
    </Typography>
  );
}

export default MainFooter;
