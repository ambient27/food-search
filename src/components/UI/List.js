import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "#DBA380",
  borderRadius: "25px",
  fontFamily: "Merriweather",
  fontStyle: "normal",
  fontVariant: "normal",
  color: "black",
  fontWeight: "700",
  lineHeight: "26.4px",
};

export default function ListDividers(props) {
  const itemStartText = "Item: ";
  const itemSelected = itemStartText.concat(props.text);

  const itemStartCalories = "Calories: ";
  const caloriesSelected = itemStartCalories.concat(props.calories);

  const itemStartProtein = "Protein in grams: ";
  const proteinSelected = itemStartProtein.concat(props.protein);

  const itemStartFat = "Fat in grams: ";
  const fatSelected = itemStartFat.concat(props.fat);

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary={itemSelected} />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary={caloriesSelected} />
      </ListItem>
      <ListItem button>
        <ListItemText primary={proteinSelected} />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary={fatSelected} />
      </ListItem>
    </List>
  );
}
