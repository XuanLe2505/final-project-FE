import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link as RouterLink } from "react-router-dom";
import { activationEmail } from "../features/userSlice";

function ActivationEmail() {
  const { activationToken } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (activationToken) {
      dispatch(activationEmail(activationToken));
    }
  }, [activationToken, dispatch]);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{mt: 4}}
    >
      <Typography sx={{fontSize: "30px"}}>Email verified successfully</Typography>
      <Button
        sx={{
          border: "none",
          outline: "none",
          padding: "12px 0",
          borderRadius: "24px",
          width: "180px",
          fontWeight: "bold",
          fontSize: "14px",
          cursor: "pointer",
          textDecoration: "none",
          color: "#fff",
          background: "#08660D",
          "&:hover": {
            background: "#042d06",
          },
        }}
        component={RouterLink}
        to={"/login"}
      >
        Login
      </Button>
    </Stack>
  );
}

export default ActivationEmail;
