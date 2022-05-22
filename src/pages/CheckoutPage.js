import {
  Breadcrumbs,
  Container,
  Link,
  Typography,
  Box,
  Stack,
  Stepper,
  Step,
//   StepLabel,
  StepButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useState } from "react";
// import useCartContext from "../hooks/useCartContext";
import CartProductsList from "../components/CartProductsList";
import CheckoutDelivery from "../components/CheckoutDelivery";
import CheckoutSummary from "../components/CheckoutSummary";

const STEPS = ["Cart", "Delivery", "Summary"];

function CheckoutPage() {
//   const { cartProducts, dispatch } = useCartContext();
  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (step) => {
    setActiveStep(step);
  };

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Innisfree
        </Link>
        <Typography color="text.primary">Checkout</Typography>
      </Breadcrumbs>

      <Stack spacing={2}>
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {STEPS.map((label, index) => (
              <Step key={label}>
                <StepButton onClick={() => handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>

        {activeStep === 0 && <CartProductsList setActiveStep={setActiveStep} />}
        {activeStep === 1 && <CheckoutDelivery setActiveStep={setActiveStep} />}
        {activeStep === 2 && <CheckoutSummary />}
      </Stack>
    </Container>
  );
}

export default CheckoutPage;
