import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import fCurrency from "../utils/fCurrency";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "../features/orderSlice";
import { clearCart } from "../features/cartSlice";

function CheckoutSummary() {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state) => state.cart);
  const { delivery } = useSelector((state) => state.order);
  const totalPrice = cartProducts.reduce(
    (acc, product) => (acc += product.product.price * product.quantity),
    0
  );
  const navigate = useNavigate();

  const handleCheckout = () => {
    dispatch(createNewOrder(delivery));
    dispatch(clearCart());
    navigate("/checkout/completed", { replace: true });
  };

  return (
    <Container>
      <Typography variant="h3">Your Order</Typography>
      <Divider />
      <Stack direction="row" spacing={3} justifyContent="space-between" my={2}>
        <Box>
          <Typography>Order Date</Typography>
          <Typography>{new Date().toLocaleDateString("en-GB")}</Typography>
        </Box>
        <Box>
          <Typography>Address</Typography>
          <Typography>{delivery.address}</Typography>
        </Box>
        <Box>
          <Typography>City</Typography>
          <Typography>{delivery.city}</Typography>
        </Box>
        <Box>
          <Typography>Country</Typography>
          <Typography>{delivery.country}</Typography>
        </Box>
        <Box>
          <Typography>Payment Method</Typography>
          <Typography>{delivery.paymentMethod}</Typography>
        </Box>
      </Stack>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts.map(({ product, quantity }) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        display: "flex",
                        width: 64,
                        height: 64,
                        mr: "5px",
                      }}
                    >
                      <img
                        src={product.image}
                        alt="product"
                        width="100%"
                        height="100%"
                      />
                    </Box>
                    <Typography variant="body2" nowrap>
                      {product.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{fCurrency(product.price)}</TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>{fCurrency(quantity * product.price)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell>Total Price</TableCell>
              <TableCell>
                <Typography>{fCurrency(totalPrice)}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button variant="contained" onClick={handleCheckout}>
          Checkout
        </Button>
      </Box>
    </Container>
  );
}

export default CheckoutSummary;
