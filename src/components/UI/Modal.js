import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(true);

  const [textCount, setTextCount] = useState(props.editModalArray[0].item);
  const [calorieCount, setCalorieCount] = useState(
    props.editModalArray[0].calories
  );
  const [proteinCount, setProteinCount] = useState(
    props.editModalArray[0].protein
  );
  const [fatCount, setFatCount] = useState(props.editModalArray[0].fat);
  const [carbsCount, setCarbsCount] = useState(props.editModalArray[0].carbs);
  const [fiberCount, setFiberCount] = useState(props.editModalArray[0].fiber);

  const handleClose = () => {
    props.doneEditingModal();
    setOpen(false);
  };

  const saveEdit = () => {
    const itemPickedArray = [
      {
        item: textCount,
        calories: calorieCount,
        protein: proteinCount,
        fat: fatCount,
        carbs: carbsCount,
        fiber: fiberCount,
        category: props.editModalArray[0].category,
      },
    ];
    props.iAteThisThing(itemPickedArray);
    setOpen(false);
    console.log(itemPickedArray);
  };

  const setTextHandler = (event) => {
    setTextCount(event.target.value);
  };
  const setCalorieHandler = (event) => {
    setCalorieCount(event.target.value);
  };
  const setProteinHandler = (event) => {
    setProteinCount(event.target.value);
  };
  const setFatHandler = (event) => {
    setFatCount(event.target.value);
  };
  const setCarbsHandler = (event) => {
    setCarbsCount(event.target.value);
  };
  const setFiberHandler = (event) => {
    setFiberCount(event.target.value);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            onChange={setTextHandler}
            variant="filled"
            label="item"
            defaultValue={props.editModalArray[0].item}
          ></TextField>
          <TextField
            onChange={setCalorieHandler}
            variant="filled"
            label="calories"
            defaultValue={props.editModalArray[0].calories}
          ></TextField>
          <TextField
            onChange={setProteinHandler}
            variant="filled"
            label="protein"
            defaultValue={props.editModalArray[0].protein}
          ></TextField>
          <TextField
            onChange={setFatHandler}
            variant="filled"
            label="fat"
            defaultValue={props.editModalArray[0].fat}
          ></TextField>
          <TextField
            onChange={setCarbsHandler}
            variant="filled"
            label="carbs"
            defaultValue={props.editModalArray[0].carbs}
          ></TextField>
          <TextField
            onChange={setFiberHandler}
            variant="filled"
            label="fiber"
            defaultValue={props.editModalArray[0].fiber}
          ></TextField>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Food
          </Typography>
          <Button
            variant="contained"
            sx={{ margin: ".5rem" }}
            onClick={saveEdit}
          >
            Save
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ margin: ".5rem" }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
