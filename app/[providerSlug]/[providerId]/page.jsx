"use client";
import React, { useEffect, useState } from "react";
import { ProviderService } from "../../service/ProviderService";
import { useParams, useRouter } from "next/navigation";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { addToCartItem, addToFavouriteItem, bookmarkitem, incrementTotalCard, incrementTotalfav } from "@/app/action/action";
import 'react-toastify/dist/ReactToastify.css'
import { FavioriteService } from "@/app/service/get-faviourite";
import { bookmarkServices } from "@/app/service/bookmark";
import Toast from "@/app/components/Toast";
import { toast } from "react-toastify";
import ProviderHeader from "@/app/components/ProviderHeader.jsx";

const page = () => {
  const dispatch = useDispatch();
  const { providerSlug } = useParams();
  const router = useRouter();
  const [desc, setdesc] = useState([]);
  const [loading, setLoading] = useState(true);
  const favourites = useSelector((state) => state.likes.favouriteItems);
  const bookmarks = useSelector((state) => state.bookmark.bookmarkItems);
  const token = useSelector((state) => state.auth.authUser);
  async function Desc() {
    try {
      const response = await ProviderService(providerSlug);
      setdesc(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  function fav(item) {
    if (!token || !token.data) {
      toast.warning("please log in to add to favorites.")
      return;
    }
    const isItemInFav = favourites.some(
      (favouriteItems) => favouriteItems.id === item.id
    );
    if (isItemInFav) {
      toast.warning("Your Items is already in your WishList");
    } else {
      // Item is not in the cart, proceed to add it
      dispatch(addToFavouriteItem(item));
      dispatch(incrementTotalfav());
      FavioriteService(token.data.token, item)
      toast.success("Added to wishlist  successfully");
    }
  }
  function bookmark(item) {
    if (!token || !token.data) {
      toast.warning("please log in to bookmark this item")
      return;
    }
    const isItemInBook = bookmarks.some((bookmarkItems) => bookmarkItems.id === item.id)

    if (isItemInBook) {
      toast.warning("item is already in your bookmark")
    }
    else {
      dispatch(bookmarkitem(item))
      bookmarkServices(token.data.token, item)
      toast.success("Bookmark Successfully")
    }
  }

  useEffect(() => {
    Desc();
    document.title = "provider | eRequirements"
  }, []);
  return (
    <div >
      <Toast />
      <ProviderHeader />
      <Box sx={{ display: "flex", mt: 10, justifyContent: "center" }}>
        <Container>
          <Grid container spacing={2}>
            {loading
              ? Array.from({ length: 3 }).map((index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <Box>
                    <Card sx={{ maxWidth: 345 }}>
                      <Skeleton
                        variant="rectangular"
                        height={194}
                        animation="wave"
                      />
                      <CardContent>
                        <Skeleton animation="wave" />
                      </CardContent>
                    </Card>
                    <br />
                  </Box>
                </Grid>
              ))
              : desc.map((response, index) => {
                if (providerSlug == response.provider_id)
                  return (
                    <Grid item key={response.provider_id + "_" + response.id}>
                      <Card
                        sx={{
                          maxWidth:345,
                          transition: "transform 0.3s ease-in-out",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                          },
                        }}>
                        <CardHeader
                          title={response.name}
                          sx={{ background: "#b7bfee" }}
                        />
                        <CardMedia
                          sx={{
                            objectFit:'cover',
                            cursor: "pointer",
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": {
                              transform: "scale(1.1)",
                            },
                          }}
                          component="img"
                          image={response.img}
                          alt={response.alt}
                          onClick={(e) =>
                            router.push(
                              `${response.provider_id}/${response.id}`
                            )
                          }
                        />

                        <CardActions disableSpacing>
                          <IconButton aria-label="add to favorites" sx={{
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": {
                              transform: "scale(1.2)",
                            },
                          }}>
                            <Checkbox
                              onClick={() => fav(response)}
                              inputProps={{ "aria-label": "Favorite" }}
                              icon={<FavoriteBorder />}
                              checkedIcon={<Favorite color="secondary" />}
                            />
                          </IconButton>
                          <IconButton aria-label="bookmark"
                            sx={{
                              transition: "transform 0.3s ease-in-out",
                              "&:hover": {
                                transform: "scale(1.2)",
                              },
                            }}>
                            <Checkbox
                              onClick={() => bookmark(response)}
                              icon={<BookmarkBorderIcon />}
                              checkedIcon={<BookmarkIcon />}
                            />
                          </IconButton>
                        </CardActions>
                      </Card>
                      <br />
                    </Grid>
                  );
              })}
          </Grid>
        </Container>
      </Box>

    </div>
  );
};

export default page;
