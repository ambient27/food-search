import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <div>
      <Button
        color="secondary"
        sx={{ display: { sm: "none", xs: "block" } }}
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="newentry" style={linkStyle}>
            Add New Entry
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="mytracker" style={linkStyle}>
            My Tracker
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="mealplan" style={linkStyle}>
            Meal Plan
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="goals" style={linkStyle}>
            Goals
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="signin" style={linkStyle}>
            Sign In
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
