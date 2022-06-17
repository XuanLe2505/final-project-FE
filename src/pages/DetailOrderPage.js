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
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fCurrency from "../utils/numberFormat";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrder } from "../features/orderSlice";
import { format, parseISO } from "date-fns";

function DetailOrderPage() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shipping, products, createdAt, paymentMethod, total } = useSelector(
    (state) => state.order.order
  );

  // console.log(
  //   typeof format(parseISO(createdAt ? createdAt : null), "dd/MM/yyyy")
  // );

  useEffect(() => {
    if (orderId) {
      dispatch(getSingleOrder(orderId));
    }
  }, [orderId, dispatch]);

  const handleGoBack = () => {
    navigate("/orders", { replace: true });
  };

  return (
    <Container sx={{ maxWidth: 1024 }}>
      <Typography variant="h4" sx={{ textAlign: "center", my: 3 }}>
        Ordered
      </Typography>
      <Divider />
      <Stack
        direction="column"
        spacing={3}
        justifyContent="flex-start"
        alignItems="flex-start"
        my={2}
        nowrap="true"
      >
        <Box>
          {createdAt ? (
            <Typography>
              Order Date: {format(parseISO(createdAt), "dd/MM/yyyy")}
            </Typography>
          ) : null}
        </Box>
        <Box>
          <Typography>Address: {shipping?.address}</Typography>
          <Typography></Typography>
        </Box>
        <Box>
          <Typography>City: {shipping?.city}</Typography>
        </Box>
        <Box>
          <Typography>Country: {shipping?.country}</Typography>
        </Box>
        <Box>
          {paymentMethod ? (
            <Typography>Payment Method: {paymentMethod}</Typography>
          ) : null}
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
            {products?.map(({ product, quantity }) => (
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
                <Typography>{fCurrency(total)}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button variant="contained" onClick={handleGoBack}>
          Orders List
        </Button>
      </Box>
    </Container>
  );
}

export default DetailOrderPage;
