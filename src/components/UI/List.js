import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "#DBA380",
  borderRadius: "25px",
  borderStyle: 'solid',
  textAlign: 'center'
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
    <List sx={style}  component="nav" aria-label="mailbox folders" subheader="Item you selected">
      <ListItem button>
        <ListItemText disableTypography primary={<Typography variant='secondary'>{itemSelected}</Typography>} />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText disableTypography 
        primary={<Typography variant='secondary'>{caloriesSelected}</Typography>}/>
      </ListItem>
      <ListItem button>
        <ListItemText disableTypography primary={<Typography variant='secondary'>{proteinSelected}</Typography>} />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText disableTypography primary={<Typography variant='secondary'>{fatSelected}</Typography>} />
      </ListItem>
    </List>
  );
}
