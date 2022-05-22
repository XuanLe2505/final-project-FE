import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

const WidgetStyle = styled(RouterLink)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "50%",
  color: theme.palette.text.primary,
  cursor: "pointer",
}));

function CartWidget() {
  const { cartProducts } = useSelector((state) => state.cart);

  const totalItems = cartProducts.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  return (
    <WidgetStyle to="/checkout">
      <Badge badgeContent={totalItems} color="primary">
        <ShoppingBagIcon />
      </Badge>
    </WidgetStyle>
  );
}

export default CartWidget;
