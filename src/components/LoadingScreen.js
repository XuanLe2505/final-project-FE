import { Box, CircularProgress } from "@mui/material";
import React from "react";

function LoadingScreen() {
  return (
    <Box
      sx={{
        position: "absolute",
        // width: "100vw",
        // height: "100vh",
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingScreen;
