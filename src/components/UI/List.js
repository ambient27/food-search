import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "#DBA380",
  borderRadius: "25px",
  borderStyle: "solid",
  textAlign: "center",
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

  const itemStartCarbs = "Carbs in grams: ";
  const carbsSelected = itemStartCarbs.concat(props.carbs);

  const itemStartFiber = "Fiber in grams: ";
  const fiberSelected = itemStartFiber.concat(props.fiber);

  const selectThisOne = () => {
    const emptyArray = [];
    const itemPickedArray = [
      ...emptyArray,
      {
        item: props.text,
        calories: props.calories,
        protein: props.protein,
        fat: props.protein,
        carbs: props.carbs,
        fiber: props.fiber,
        category: props.category,
      },
    ];
    props.iAteThisThing(itemPickedArray);
  };

  return (
    <>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="secondary">{itemSelected}</Typography>
            }
          />
        </ListItem>
        <Divider />
        <ListItem divider>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="secondary">{caloriesSelected}</Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="secondary">{proteinSelected}</Typography>
            }
          />
        </ListItem>
        <Divider light />
        <ListItem>
          <ListItemText
            disableTypography
            primary={<Typography variant="secondary">{fatSelected}</Typography>}
          />
        </ListItem>
        <Divider light />
        <ListItem>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="secondary">{carbsSelected}</Typography>
            }
          />
        </ListItem>
        <Divider light />
        <ListItem>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="secondary">{fiberSelected}</Typography>
            }
          />
        </ListItem>
        <Divider light />
        <Button variant="contained" onClick={selectThisOne}>
          Select Item
        </Button>
      </List>
    </>
  );
}
