import React, { useState } from "react";
import {
  Stack,
  Alert,
  Container,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import apiService from "../app/apiService";

const ForgotSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const defaultValues = {
  email: "",
};

function ForgotPasswordPage() {
  const [success, setSuccess] = useState("")

  const methods = useForm({
    resolver: yupResolver(ForgotSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { email } = data;
    try {
      const response = await apiService.post("/user/forgot", { email });
      setSuccess(response.message);
      return response.data;
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography sx={{textAlign: "center", fontSize: "20px", fontWeight: 500, mb: 2}}>Forgot Your Password?</Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          {success && <Alert severity="success">{success}</Alert>}
          <FTextField name="email" label="Email address" />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Verify your email
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default ForgotPasswordPage;
