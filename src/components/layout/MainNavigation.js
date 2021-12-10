import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import './MainNavigation.css';

const MainNavigation = () => {
  const linkStyle = {
    margin: ".2rem",
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
    fontFamily: 'Merriweather',
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: '700',
    lineHeight: '26.4px' }

  const linkStyle2 = {
    margin: ".2rem",
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
    fontFamily: 'Merriweather',
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: '700',
    lineHeight: '26.4px'
  };

  const linkStyle3 = {
    margin: ".2rem",
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
    fontFamily: 'Merriweather',
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: '700',
    lineHeight: '26.4px'
  };

  const linkStyle4 = {
    margin: ".2rem",
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
    fontFamily: 'Merriweather',
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: '700',
    lineHeight: '26.4px'
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
        height: '65px',
      }}
    >
      <ul>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7F4A24",
            height: '22px',
            borderRadius: '25px',
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
            height: '22px',
            borderRadius: '25px',
          }}
        >
          <Link to="mytracker" style={linkStyle2}>
            My Tracker
          </Link>
        </Button>
        &nbsp;
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7F4A24",
            height: '22px',
            borderRadius: '25px',
          }}
        >
          <Link to="mealplan" style={linkStyle3}>
            Meal Plan
          </Link>
        </Button>
        &nbsp;
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7F4A24",
            height: '22px',
            borderRadius: '25px',
          }}
        >
          <Link to="signin" style={linkStyle4}>
            Sign In
          </Link>
        </Button>
      </ul>
    </AppBar>
  );
};

export default MainNavigation;
