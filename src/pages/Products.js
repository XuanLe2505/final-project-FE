import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import SearchForm from "../components/SearchForm";
// import { FormProvider } from "../form";
// import { useForm } from "react-hook-form";
import {
  Container,
  Alert,
  Box,
  Card,
  Stack,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/productSlice";
import LoadingScreen from "../components/LoadingScreen";
import PaginationBar from "../components/PaginationBar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import fCurrency from "../utils/numberFormat";
import { makeStyles } from "@mui/styles";
import { addToCart } from "../features/cartSlice";
import useAuth from "../hooks/useAuth";
import ProductsSort from "../components/ProductsSort";
import ProductsSearch from "../components/ProductsSearch";
const useStyles = makeStyles({
  button: {
    color: "#fff",
    background: "#08660D",
    "&:hover": {
      background: "#042d06",
    },
  },
});

const Products = () => {
  const { isAuthenticated } = useAuth();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");
  const limit = 12;
  const params = useParams();
  const categoryName = params.category;

  const dispatch = useDispatch();
  const { products, totalPage, loading, errorMessage } = useSelector(
    (state) => state.products
  );

  const handleSearch = (value) => {
    console.log({ value });
    setSearch(value);
  };
  const handleSort = (value) => {
    setSortBy(value);
  };
  useEffect(() => {
    if (categoryName)
      dispatch(getProducts({ page, limit, categoryName, sortBy, search }));
  }, [page, limit, categoryName, sortBy, search, dispatch]);

  const navigate = useNavigate();
  const handleClickProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  const classes = useStyles();

  return (
    <>
      <Stack>
        <Box
          sx={{
            bgcolor: "#074439",
            color: "#fff",
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", m: 4, textTransform: "capitalize" }}
          >
            {categoryName}
          </Typography>
        </Box>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Stack>
      <Container sx={{ sm: {mx: "3rem"} }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={{ xs: "center", sm: "right" }}
          alignItems="center"
          spacing={2}
          sx={{
            my: "30px",
          }}
        >
          <ProductsSearch handleSearch={handleSearch} />
          <ProductsSort handleSort={handleSort} />
        </Stack>
      </Container>
      <Container sx={{ mb: "3rem" }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <Grid container>
              {products.map((product) => (
                <Grid
                  key={product._id}
                  item={true}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                  md={3}
                  sm={6}
                  xs={12}
                >
                  <Card
                    key={product._id}
                    sx={{
                      width: "15rem",
                      height: "24rem",
                      marginBottom: "3rem",
                    }}
                  >
                    <CardActionArea
                      onClick={() => handleClickProduct(product._id)}
                      sx={{
                        width: "15rem",
                        height: "20rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <FavoriteBorderIcon
                        sx={{
                          position: "absolute",
                          right: "10px",
                          top: "10px",
                        }}
                      />
                      <CardMedia
                        component="img"
                        image={`${product.image}`}
                        alt={`${product.name}`}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          component="div"
                          sx={{ fontSize: "14px" }}
                        >
                          {`${product.name}`}
                        </Typography>
                        <Typography
                          gutterBottom
                          component="div"
                          sx={{ fontSize: "14px", textAlign: "center", mb: 2 }}
                        >
                          {`${fCurrency(product.price)}`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <Box
                      sx={{ display: "flex", justifyContent: "right", mr: 2 }}
                    >
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
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            p: 2,
          }}
        >
          <PaginationBar
            pageNum={page}
            setPageNum={setPage}
            totalPageNum={Number(totalPage)}
          />
        </Box>
      </Container>
    </>
  );
};

export default Products;
