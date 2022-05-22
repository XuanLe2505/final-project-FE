import { styled } from "@mui/material/styles";
import { Card, Typography, CardHeader, Stack, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUserProfile } from "../features/userSlice";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

function ProfilePage() {
  const dispatch = useDispatch();
  const { username, email, role } = useSelector(
    (state) => state.user.userProfile
  );

  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  return (
    <Card sx={{ mt: 4 }}>
      <CardHeader
        title="User Profile"
        variant="h6"
        sx={{ textAlign: "center" }}
      />
      <Stack
        spacing={2}
        sx={{
          p: 3,
          ml: 5,
        }}
      >
        <Stack direction="row">
          <IconStyle>
            <AccountBoxIcon />
          </IconStyle>
          <Typography variant="body2">Name: {username}</Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle>
            <EmailIcon />
          </IconStyle>
          <Typography variant="body2">Email: {email}</Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle>
            <AdminPanelSettingsIcon />
          </IconStyle>
          <Typography variant="body2">Role: {role}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProfilePage;
