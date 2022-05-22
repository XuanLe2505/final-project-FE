import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../features/productSlice";
import fCurrency from "../utils/fCurrency";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import LoadingScreen from "../components/LoadingScreen";
import { makeStyles } from "@mui/styles";
import { addToCart } from "../features/cartSlice";
import useAuth from "../hooks/useAuth";

const useStyles = makeStyles({
  button: {
    color: "#fff",
    background: "#08660D",
    "&:hover": {
      background: "#042d06",
    },
  },
});

function DetailProduct() {
  const { isAuthenticated } = useAuth();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, errorMessage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (productId) {
      dispatch(getSingleProduct({ productId }));
    }
  }, [productId, dispatch]);

  const classes = useStyles();

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Innisfree
        </Link>
        <Typography color="inherit">{product?.name}</Typography>
      </Breadcrumbs>
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {errorMessage ? (
              <Alert severity="error">{errorMessage}</Alert>
            ) : (
              <>
                {product ? (
                  <Box>
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        <Box p={2}>
                          <Box
                            sx={{
                              borderRadius: 2,
                              overflow: "hidden",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={product.image}
                              width="80%"
                              height="80%"
                              alt="product"
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h5" paragraph>
                          {product.name}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            mb: 3,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              color: "text.disabled",
                              textDecoration: "line-through",
                            }}
                          >
                            {product.discount !== 0 &&
                              fCurrency(
                                (product.price * product.discount) / 100
                              )}
                          </Box>
                          {product.discount !== 0 ? (
                            <Typography variant="h5">{`${fCurrency(
                              (product.price * product.discount) / 100
                            )}`}</Typography>
                          ) : (
                            <Typography variant="h5">{`${fCurrency(
                              product.price
                            )}`}</Typography>
                          )}

                          {product.countInStock !== 0 ? (
                            <Typography
                              variant="h6"
                              sx={{
                                color:
                                  product.countInStock === 0 ? "red" : "green",
                              }}
                            >
                              In Stock
                            </Typography>
                          ) : (
                            <Typography
                              variant="h6"
                              sx={{
                                color:
                                  product.countInStock === 0 ? "red" : "green",
                              }}
                            >
                              Quick Shop
                            </Typography>
                          )}
                        </Typography>

                        <Divider sx={{ borderStyle: "solid", mb: 2 }} />
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mb: 2 }}
                        >
                          <Rating
                            value={product.averageRating}
                            precision={0.1}
                            readOnly
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            ({product.numberReviews} reviews)
                          </Typography>
                        </Stack>

                        <Box>
                          <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            children={product.description}
                          />
                        </Box>
                        <Box sx={{ mt: 5 }}>
                          {isAuthenticated ? (
                            <Button
                              className={classes.button}
                              variant="secondary"
                              onClick={() => {
                                dispatch(addToCart(product));
                              }}
                            >
                              Add to Cart
                            </Button>
                          ) : (
                            <Button
                              className={classes.button}
                              variant="secondary"
                              onClick={() => {
                                navigate("/login");
                              }}
                            >
                              Add to Cart
                            </Button>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                ) : (
                  <Typography variant="h6">Product not found!</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
      <Box>
        <Typography sx={{ textAlign: "center", mb: 2 }}>Reviews</Typography>
        <Container>
          <Card sx={{ width: "100%", height: 500 }}></Card>
        </Container>
      </Box>
    </Container>
  );
}

export default DetailProduct;
