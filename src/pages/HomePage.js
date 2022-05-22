import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import BannerCarousel from "../components/BannerCarousel";

function Homepage() {
  return (
    <>
      <BannerCarousel />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <Card sx={{ maxWidth: 300, width: 300, m: 3 }}>
          <CardMedia
            component="img"
            height="300px"
            width="100%"
            image="https://res.cloudinary.com/damqtaeip/image/upload/v1652532248/hair_care_homepage_xuqwoz.png"
            alt="hair care"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
            >
              Hair Care
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Refresh your haircare routine with a selection of shampoos,
              conditioners and treatments to suit your hair's needs!
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Shop Now</Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 300, width: 300, m: 3 }}>
          <CardMedia
            component="img"
            height="300px"
            width="100%"
            image="https://res.cloudinary.com/damqtaeip/image/upload/v1652532223/PinkGlow_jjhlkl.png"
            alt="Pink Glow"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
            >
              #Pink Glow
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Incredibly lightweight and highly effective toning cream to
              instantly brighten and even out the skin tone.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Shop Now</Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 300, width: 300, m: 3 }}>
          <CardMedia
            component="img"
            height="300px"
            width="100%"
            image="https://res.cloudinary.com/damqtaeip/image/upload/v1652532234/volcanic_clay_masks_wqoqbi.png"
            alt="Volcanic Clay Masks"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
            >
              Volcanic Clay Masks
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Our secret when it comes to fighting enlarged pores, oiliness,
              uneven texture, and dead skin cells!!!!!!!!!!!!!!!!!!
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Shop Now</Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}

export default Homepage;
