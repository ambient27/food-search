import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

const style = {
  bgcolor: "#ffffff",
  borderRadius: "25px",
  borderStyle: "solid",
  textAlign: "center",
  maxHeight: "auto",
};

export default function ListDividers(props) {
  const selectThisOne = () => {
    const itemPickedArray = [
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

  const editHandler = () => {
    const itemPickedArray = [
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
    props.editModal(itemPickedArray);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="secondary">
                {truncate(props.text, 20)}
              </Typography>
            }
          />
        </ListItem>
        <Divider />
        <ListItem divider>
          <ListItemText
            primary={
              <Typography variant="secondary">
                {"Calories(kcal) ".concat(props.calories)}
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="secondary">
                {"Protein(g) ".concat(props.protein)}
              </Typography>
            }
          />
        </ListItem>
        <Divider light />
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="secondary">
                {"Fat(g) ".concat(props.fat)}
              </Typography>
            }
          />
        </ListItem>
        <Divider light />
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="secondary">
                {"Carbs(g) ".concat(props.carbs)}
              </Typography>
            }
          />
        </ListItem>
        <Divider light />
        <ListItem>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="secondary">
                {"Fiber(g) ".concat(props.fiber)}
              </Typography>
            }
          />
        </ListItem>
        <Divider light />
        <Button
          variant="contained"
          sx={{ margin: ".5rem" }}
          onClick={selectThisOne}
        >
          Select Item
        </Button>
        <Button variant="contained" onClick={editHandler}>
          edit
        </Button>
      </List>
    </>
  );
}
