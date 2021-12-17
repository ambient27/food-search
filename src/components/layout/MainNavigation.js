import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import UserContext from "../../store/UserContext";
import { Typography } from "@mui/material";

const MainNavigation = () => {
  const { user } = React.useContext(UserContext);

  const linkStyle = {
    textDecoration: "none",
    color: "black",
    lineHeight: "26.4px",
  };

  const navButtonStyle = {
    "&:hover": {
      backgroundColor: "#9F5C2D",
    },
    borderStyle: "none",
    backgroundColor: "#DBA380",
    height: "65px",
  };

  const AppBarStyle = {
    backgroundColor: "#DBA380",
    minWidth: "500px",
    marginRight: "auto",
    marginLeft: "auto",
    maxWidth: "100%",
    height: "65px",
  };

  return (
    <AppBar position="fixed" sx={AppBarStyle}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Button variant="outlined" sx={navButtonStyle}>
          <Link to="newentry" style={linkStyle}>
            Add New Entry
          </Link>
        </Button>
        <Button variant="outlined" sx={navButtonStyle}>
          <Link to="mytracker" style={linkStyle}>
            My Tracker
          </Link>
        </Button>
        <Button variant="outlined" sx={navButtonStyle}>
          <Link to="mealplan" style={linkStyle}>
            Meal Plan
          </Link>
        </Button>
        <Button variant="outlined" sx={navButtonStyle}>
          <Link to="goals" style={linkStyle}>
            Goals
          </Link>
        </Button>
        <Button variant="outlined" sx={navButtonStyle}>
          <Link to="signin" style={linkStyle}>
            Sign In
          </Link>
        </Button>
        <Typography
          variant="smallertext"
          sx={{ margin: ".3rem", marginLeft: "auto" }}
        >
          Current userID: {user?.user?.uid}
        </Typography>
      </Stack>
    </AppBar>
  );
};

export default MainNavigation;
