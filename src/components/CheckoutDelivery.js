import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormProvider, FRadioGroup, FTextField } from "./form";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDelivery } from "../features/orderSlice";

const DeliverySchema = yup.object().shape({
  address: yup.string().required("Adress is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  phone: yup.string().required("Phone is required"),
});
const defaultValues = {
  address: "",
  city: "",
  country: "",
  phone: "",
  paymentMethod: "cash",
};

function CheckoutDelivery({ setActiveStep }) {
  const dispatch = useDispatch();
  const methods = useForm({
    // defaultValues: window.localStorage.getItem("defaultAddress")
    //   ? JSON.parse(window.localStorage.getItem("defaultAddress"))
    //   : defaultValues,
    defaultValues,
    resolver: yupResolver(DeliverySchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    let { address, city, country, phone, paymentMethod } = data;
    const delivery = { address, city, country, phone, paymentMethod };
    dispatch(setDelivery(delivery));
    console.log(delivery);

    setActiveStep((step) => step + 1);
    // window.localStorage.setItem("defaultAddress", JSON.stringify(data));
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ width: { md: "350px", xs: "200px" } }}>
          <Typography variant="h4" textAlign="center">
            Delivery Address
          </Typography>

          <FTextField name="address" label="Address" />
          <FTextField name="city" label="City" />
          <FTextField name="country" label="Country" />
          <FTextField name="phone" label="Phone" />
          <FRadioGroup name="paymentMethod" options={["cash", "credit card"]} />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default CheckoutDelivery;
