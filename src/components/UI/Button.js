import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function ContainedButtons(props) {
  return (
    
      <Button 
      sx={{
        margin: ".5rem",
        borderRadius: "25px",
        backgroundColor: "#9F5C2D",
        fontFamily: "Merriweather",
        fontStyle: "normal",
        fontVariant: "normal",
        color: "black",
        fontWeight: "700",
        lineHeight: "26.4px",
      }}
      variant="contained">{props.name}</Button>
    
  );
}
