import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import "./MainNavigation.css";
import UserContext from "../../store/UserContext";

const MainNavigation = () => {
  const { user } = React.useContext(UserContext);

  const linkStyle = {
    margin: ".2rem",
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
    fontFamily: "Merriweather",
    fontStyle: "normal",
    fontVariant: "normal",
    fontWeight: "700",
    lineHeight: "26.4px",
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#DBA380",
        minWidth: "500px",
        marginRight: "auto",
        marginLeft: "auto",
        maxWidth: "100%",
        height: "65px",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <ul>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7F4A24",
              height: "22px",
              borderRadius: "25px",
            }}
          >
            <Link to="newentry" style={linkStyle}>
              Add New Entry
            </Link>
          </Button>
          &nbsp;
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7F4A24",
              height: "22px",
              borderRadius: "25px",
            }}
          >
            <Link to="mytracker" style={linkStyle}>
              My Tracker
            </Link>
          </Button>
          &nbsp;
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7F4A24",
              height: "22px",
              borderRadius: "25px",
            }}
          >
            <Link to="mealplan" style={linkStyle}>
              Meal Plan
            </Link>
          </Button>
          &nbsp;
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7F4A24",
              height: "22px",
              borderRadius: "25px",
            }}
          >
            <Link to="signin" style={linkStyle}>
              Sign In
            </Link>
          </Button>
        </ul>
        {user?.user?.uid}
      </Stack>
    </AppBar>
  );
};

export default MainNavigation;
