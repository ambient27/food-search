import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import UserContext from "../../store/UserContext";
import { Typography } from "@mui/material";
import PositionedMenu from "./Menu";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/system";

const MainNavigation = () => {
  const { user } = React.useContext(UserContext);

  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  const navButtonStyle = {
    height: "65px",
    "&:hover": {
      background: "#7BCC7E",
    },
  };

  const AppBarStyle = {
    minWidth: "200px",
    marginRight: "auto",
    marginLeft: "auto",
    maxWidth: "100%",
    height: "75px",
  };

  return (
    <AppBar sx={AppBarStyle}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <PositionedMenu sx={{ display: { sm: "none", xs: "block" } }} />
        <Button
          variant="outlinedInherit"
          style={navButtonStyle}
          sx={{ display: { sm: "block", xs: "none" } }}
        >
          <Link to="newentry" style={linkStyle}>
            Add New Entry
          </Link>
        </Button>
        <Button
          variant="outlinedInherit"
          style={navButtonStyle}
          sx={{ display: { sm: "block", xs: "none" } }}
        >
          <Link to="mytracker" style={linkStyle}>
            My Tracker
          </Link>
        </Button>
        <Button
          variant="outlinedInherit"
          style={navButtonStyle}
          sx={{ display: { sm: "none", xs: "none", md: "block" } }}
        >
          <Link to="mealplan" style={linkStyle}>
            Meal Plan
          </Link>
        </Button>
        <Button
          variant="outlinedInherit"
          style={navButtonStyle}
          sx={{ display: { sm: "none", xs: "none", md: "block" } }}
        >
          <Link to="goals" style={linkStyle}>
            Goals
          </Link>
        </Button>
        <Button
          variant="outlinedInherit"
          style={navButtonStyle}
          sx={{ display: { sm: "block", xs: "none" } }}
        >
          <Link to="signin" style={linkStyle}>
            Sign In
          </Link>
        </Button>
        <Box
          sx={{ marginLeft: "auto", paddingTop: "12px", paddingRight: "15px" }}
        >
          <Avatar
            src="/broken-image.jpg"
            sx={{ height: "50px", width: "50px" }}
          ></Avatar>
        </Box>
      </Stack>
    </AppBar>
  );
};

export default MainNavigation;
