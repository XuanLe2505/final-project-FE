import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import fCurrency from "../utils/numberFormat";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  confirm,
  decrementToCart,
  deleteFromCart,
  incrementToCart,
} from "../features/cartSlice";

function CartProductList({ setActiveStep }) {
  const dispatch = useDispatch();

  const { cartProducts } = useSelector((state) => state.cart);

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts.map(({ index, product, quantity }) => (
              <TableRow key={index}>
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
                        width="50%"
                        height="50%"
                      />
                    </Box>
                    <Typography variant="body2" nowrap>
                      {product.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{fCurrency(product.price)}</TableCell>
                <TableCell>
                  <QuantityCounter
                    dispatch={dispatch}
                    quantity={quantity}
                    productId={product._id}
                  />
                </TableCell>
                <TableCell>{fCurrency(quantity * product.price)}</TableCell>
                <TableCell>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => dispatch(deleteFromCart(product._id))}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", m: 3 }}>
        <Button variant="contained" onClick={() => dispatch(clearCart())}>
          Clear
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(confirm({ cartProducts }));
            setActiveStep((step) => step + 1);
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

function QuantityCounter({ dispatch, quantity, productId }) {
  return (
    <Box sx={{ width: 96 }}>
      <IconButton onClick={() => dispatch(decrementToCart({ productId }))}>
        <IndeterminateCheckBoxIcon />
      </IconButton>
      {quantity}
      <IconButton
        sx={{ color: "#2ecc71" }}
        onClick={() => dispatch(incrementToCart({ productId }))}
      >
        <AddBoxIcon />
      </IconButton>
    </Box>
  );
}

export default CartProductList;
