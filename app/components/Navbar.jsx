"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useState, useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Hidden } from "@mui/material";
import { styled } from '@mui/material/styles';
import { getFaviorites } from "../service/getFaviourite";
import { getCart } from "../service/getCart";
import Cookies from "js-cookie";

const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/pages/about" },
  { label: "Contact", href: "/pages/contact" },
];
const settings = [
  { label: "Profile", href: "/pages/profile" },
  { label: "Logout", href: "/pages/logout" },
];

function App() {
  const [cart, setCart] = useState(0);
  const [fav, setFav] = useState(0);
  const cartItems = useSelector((state) => state.cart.cartItems)
  const favItems = useSelector((state) => state.likes.favouriteItems)

  let tokens;
  const authenticated = useSelector((state) => state.auth.message = "true")
  const user = Cookies.get('user')
  useEffect(() => {
    if (authenticated) {
      if (cartItems) {
        setCart(cartItems.length);
      }
      if (favItems) {
        setFav(favItems.length)
      }
    } else {
      setCart(0);
      setFav(0);
    }
  }, [tokens, cartItems, favItems]);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgba(255, 255, 255, 0.8)",
        color: "black",
        zIndex: 1000,
      }}
    >
      <Container >
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", sm: 'none', md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            eShop
          </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Link href={page.href} style={{ textDecoration: "none" }}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            eShop
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                href={page.href}
                style={{ textDecoration: "none" }}
                key={page.label}
              >
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>

            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              href="/pages/checkout"

            >
              <StyledBadge badgeContent={cart} color="secondary">

                <AddShoppingCartIcon />
              </StyledBadge>
            </IconButton>

            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              href="/pages/profile/favourites"
              sx={{ marginRight: 2 }}
            >
              <StyledBadge badgeContent={fav} color="secondary">
                <FavoriteBorderOutlinedIcon />
              </StyledBadge>
            </IconButton>

            {
              user=="true" && authenticated ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar />
                  </IconButton>
                </Tooltip>
              ) : (
                <> <Link href="/pages/signup" passHref>
                  <Button component="a" variant="contained" sx={{ marginRight: 2 }}>Sign up</Button>
                </Link>
                  <Link href="/pages/login" passHref>
                    <Button component="a" variant="contained" sx={{ marginRight: 2 }}>Login</Button>
                  </Link>
                </>
              )
            }

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                  <Link href={setting.href} style={{ textDecoration: "none" }}>
                    <Typography textAlign="center">{setting.label}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default App;
