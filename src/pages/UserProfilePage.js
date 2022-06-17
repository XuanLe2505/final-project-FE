import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import { default as React, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { FormProvider, FTextField } from "../components/form";
import FUploadAvatar from "../components/form/FUploadAvatar";
import {
  getCurrentUserProfile, updateUserProfile,
} from "../features/userSlice";
// import useAuth from "../hooks/useAuth";
import { fData } from "../utils/numberFormat";

const UpdateUserSchema = yup.object().shape({
  username: yup.string().required("Name is required"),
});

function UserProfilePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  const {userProfile, isLoading} = useSelector((state) => state.user);
  console.log({userProfile});

  const defaultValues = {
    username: userProfile?.username || "",
    email: userProfile?.email || "",
    avatarUrl: userProfile?.avatarUrl || "",
    phone: userProfile?.phone || "",
    address: userProfile?.address || "",
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "avatarUrl",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = (data) => {
    dispatch(updateUserProfile({ ...data }));
    toast.success("Update user's information successfully!");
  };

  return (
    <Container sx={{ mt: 5 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
              <FUploadAvatar
                name="avatarUrl"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  },
                }}
              >
                <FTextField name="username" label="Name" />
                <FTextField name="email" label="Email" disabled />
                <FTextField name="phone" label="Phone Number" />
                <FTextField name="address" label="Address" />
              </Box>

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting || isLoading}
                >
                  Save Changes
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

export default UserProfilePage;
