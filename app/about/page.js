"use client";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Skeleton,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import Link from "next/link";
import { AboutService } from "../service/AboutService";
import { styled } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

const metadata = {
  title: "About | eShop",
  description: "Generated by create next app",
};
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const StyledBreadcrumb = styled(Chip)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800],
  height: theme.spacing(3),
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightRegular,
  "&:hover, &:focus": {
    backgroundColor: emphasize(
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[800],
      0.06
    ),
  },
  "&:active": {
    boxShadow: theme.shadows[1],
    backgroundColor: emphasize(
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[800],
      0.12
    ),
  },
}));

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  async function fetchData() {
    const result = await AboutService();
    console.log(result.abouts);
    setData(result.abouts);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Box sx={{ background: "hotpink" }}>
        <Container>
          <Box sx={{ pt: 5, pb: 5 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link href="/">
                <StyledBreadcrumb
                  component="a"
                  label="Home"
                  icon={<HomeIcon fontSize="large" />}
                />
              </Link>
              <StyledBreadcrumb
                component="a"
                href="/about"
                label="About Us"
                icon={<ExpandMoreIcon />}
              />
            </Breadcrumbs>
            <Typography variant="h4" sx={{ mt: 4 }}>
              About Us
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box sx={{ mt: "2rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img
              src="https://img.freepik.com/free-vector/online-shopping-concept-landing-page_52683-11240.jpg?size=626&ext=jpg&uid=R121733695&ga=GA1.1.248855276.1696004271&semt=ais"
              alt="Customer Support"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ alignItems: "center" ,justifyContent:'center'}}>
            {loading ? (
              <Box>
                <CardContent>
                  <Skeleton animation="wave" height={40} />
                </CardContent>
                <Card sx={{ maxWidth: 345 }}>
                  <Skeleton
                    variant="rectangular"
                    height={100}
                    width={800}
                    animation="wave"
                  />
                </Card>
                <br />
              </Box>
            ) : (
              data.map((response, index) => (
                <div key={index} >
                  <h1 >{response.title}</h1>
                  <Typography>{response.description}</Typography>
                </div>
              ))
            )}
            <Card sx={{ maxWidth: 345 }}>
              <CardActions disableSpacing>
                {" "}
                <Button>More
                   <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon label="more" />
                </ExpandMore>
                </Button>
              </CardActions>
               
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add
                    saffron and set aside for 10 minutes.
                  </Typography>
                  <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep
                    skillet over medium-high heat. Add chicken, shrimp and
                    chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate
                    and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and
                    fragrant, about 10 minutes. Add saffron broth and remaining
                    4 1/2 cups chicken broth; bring to a boil.
                  </Typography>
                  <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with
                    artichokes and peppers, and cook without stirring, until
                    most of the liquid is absorbed, 15 to 18 minutes. Reduce
                    heat to medium-low, add reserved shrimp and mussels, tucking
                    them down into the rice, and cook again without stirring,
                    until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don&apos;t open.)
                  </Typography>
                  <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and
                    then serve.
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Page;
