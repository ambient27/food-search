import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";

const Goals = (props) => {
  const [calorieGoal, setCalorieGoal] = useState(2000);

  const setGoalHandler = (event) => {
    setCalorieGoal(event.target.value);
  };

  const setGoal = () => {
    props.setCalGoal(calorieGoal);
  };

  return (
    <>
      <TextField
        onChange={setGoalHandler}
        variant="filled"
        label="enter calorie goal"
      ></TextField>
      <Button onClick={setGoal} sx={{ margin: ".5rem" }} variant="contained">
        Submit
      </Button>
    </>
  );
};

export default Goals;
