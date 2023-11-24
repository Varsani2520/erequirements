"use client";
import React from "react";
import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <Container maxWidth="xl">
      <Grid container justifyContent="center" spacing={2} sx={{ mt: "10%" }}>
        <Grid item md={4}>
          <Card
            sx={{
              backgroundColor: "#f0f0f0",
              marginTop: 4,
              position: "relative",
              padding: 3,
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Button
                variant="outlined"
                color="primary"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  margin: 8,
                }}
              >
                Edit
              </Button>
              <Avatar
                src=""
                alt="User Avatar"
                sx={{ width: 120, height: 120, marginBottom: 2 }}
              />
              <Typography variant="h6" sx={{ fontSize: 20, color: "#333" }}>
                Name
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 16, color: "#666" }}>
                Address
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 16, color: "#666" }}>
                Email
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2, "&:hover": { backgroundColor: "#0069d9" } }}
              >
                Logout
              </Button>
            </Box>
          </Card>
          <Divider />
          <Card sx={{ background: "#f0f0f0", padding: 3 }}>
            <div style={linkStyle}>
              <Button variant="outlined" color="primary">
                <Link href="/profile/bookings">Booking</Link>
              </Button>
            </div>
            <Divider />
            <div style={linkStyle}>
              <Button
                variant="outlined"
                color="primary"
                href="/profile/bookmark"
              >
                Bookmark
              </Button>
            </div>
            <Divider />
            <div style={linkStyle}>
              <Button
                variant="outlined"
                color="primary"
                href="/profile/favourites"
              >
                WishList
              </Button>
            </div>
            <Divider />
            <div style={linkStyle}>
              <Button
                variant="outlined"
                color="primary"
                href="/profile/notifications"
              >
                Notification
              </Button>
            </div>
            <Divider />
            <div style={linkStyle}>
              <Button
                variant="outlined"
                color="secondary"
                href="/profile/delete-account"
              >
                Delete Account
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item md={8}>
          <Card
            sx={{
              backgroundColor: "#f0f0f0",
              marginTop: 4,
              padding: 3,
            }}
          >
            {children}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const linkStyle = {
  color: "#0069d9",
  fontSize: 16,
  cursor: "pointer",
  justifyContent: "center", // Center the button text
  margin: "8px", // Apply margin
  padding: "8px", // Apply padding
  "&:hover": {
    textDecoration: "underline",
    backgroundColor: "#f9f9f9", // Apply hover effect
  },
};

export default Layout;
