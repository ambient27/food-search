import TextField from "@mui/material/TextField";
import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UserContext from "../store/UserContext";
import {
  Alert,
  Stack,
  Autocomplete,
  Typography,
  Grid,
  AlertTitle,
} from "@mui/material";
import { collection, doc, setDoc } from "firebase/firestore";
import firebase from "../api/firebase";

const Goals = (props) => {
  const { user } = React.useContext(UserContext);
  const userCtx = React.useContext(UserContext);
  const [calorieGoal, setCalorieGoal] = React.useState("");
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [genderValue, setGenderValue] = React.useState("Male");
  const [inputGenderValue, setInputGenderValue] = React.useState("");
  const [howFastError, setHowFastError] = React.useState(false);
  const [activityError, setActivityError] = React.useState(false);
  const [weightError, setWeightError] = React.useState(false);
  const [heightError, setHeightError] = React.useState(false);
  const [ageError, setAgeError] = React.useState(false);
  const [displaySearchAlert, setDisplaySearchAlert] = React.useState(false);
  const [calorieError, setCalorieError] = React.useState(false);
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [activityValue, setActivityValue] = React.useState("");
  const [inputActivityValue, setInputActivityValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [displayBmr, setDisplayBmr] = React.useState();
  const [displayUpdatedBmr, setDisplayUpdatedBmr] = React.useState();
  const [displaySugGoal, setSugGoal] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isLoggedIn = () => {
    if (userCtx.signedIn) {
      console.log(userCtx.user.uid);

      return userCtx.user.uid;
    } else {
      return user;
    }
  };
  const weightHandler = async () => {
    let bestUid = await isLoggedIn();
    const calorieGoalRef = collection(firebase.db, "calorie-goals");

    await setDoc(doc(calorieGoalRef), {
      uid: bestUid,
      date: new Date(),
      calorieGoal: calorieGoal,
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const options = [
    {
      label: "Really fast",
      value: 4,
    },
    {
      label: "A decent pace",
      value: 3,
    },
    {
      label: "Slow and steady",
      value: 2,
    },
    {
      label: "I just want to maintain",
      value: 0,
    },
  ];
  const genderOptions = ["Male", "Female"];
  const activityOptions = [
    {
      label: "Sedentary - little to no exercise in a day",
      multiplier: 1.2,
    },
    {
      label: "Slightly active - light exercise/sports 1-3 days/week",
      multiplier: 1.375,
    },
    {
      label: "Moderately active - moderate exercise/sports 3-5 days/week",
      multiplier: 1.55,
    },
    {
      label: "Very active - hard exercise/sports 6-7 days/week",
      multiplier: 1.725,
    },
  ];

  const nevermindHandler = () => {
    handleClose();
  };

  const setSugGoalHandler = () => {
    props.setCalGoal(displaySugGoal);
    handleClose();
    setDisplaySearchAlert(true);
  };

  const setGoalHandler = (event) => {
    setCalorieGoal(event.target.value);
    setCalorieError(false);
  };

  const setGoal = () => {
    if (calorieGoal.length === 0) {
      setCalorieError(true);
      return;
    }
    weightHandler();
    setDisplaySearchAlert(true);
  };

  const setWeightHandler = (event) => {
    setWeight(event.target.value);
    setWeightError(false);
  };

  const setHeightHandler = (event) => {
    setHeight(event.target.value);
    setHeightError(false);
  };

  const setAgeHandler = (event) => {
    setAge(event.target.value);
    setAgeError(false);
  };

  const getPersonalGoalHandler = () => {
    let formValidity = true;

    if (activityValue.length === 0) {
      setActivityError(true);
      formValidity = false;
    }
    if (value.length === 0) {
      setHowFastError(true);
      formValidity = false;
    }
    if (weight.length === 0) {
      setWeightError(true);
      formValidity = false;
    }
    if (height.length === 0) {
      setHeightError(true);
      formValidity = false;
    }
    if (age.length === 0) {
      setAgeError(true);
      formValidity = false;
    }
    if (formValidity === false) {
      return;
    }

    handleOpen();
    if (genderValue === "Male") {
      const bmr = Math.trunc(weight * 10 + height * 6.25 - age * 5 + 5);
      setDisplayBmr(bmr);
      const updatedBmr = Math.trunc(bmr * activityValue.multiplier);
      setDisplayUpdatedBmr(updatedBmr);
      const sugGoal = Math.trunc(updatedBmr - 300 * value.value);
      setSugGoal(sugGoal);
      console.log(updatedBmr);
      console.log(sugGoal);
    } else {
      const bmr = weight * 10 + height * 6.25 - age * 5 - 161;
      const updatedBmr = Math.trunc(bmr * activityValue.multiplier);
      setDisplayUpdatedBmr(updatedBmr);
      const sugGoal = Math.trunc(updatedBmr - 300 * value.value);
      setSugGoal(sugGoal);
    }
  };

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>Your resting BMR: {displayBmr}</Typography>
          <Typography>
            Your BMR with activity level selected: {displayUpdatedBmr}
          </Typography>
          <Typography>
            Your suggested daily calorie intake to reach your goal:
            {displaySugGoal}
          </Typography>
          <Button variant="contained" onClick={setSugGoalHandler}>
            Set as my goal
          </Button>
          <Button variant="contained" onClick={nevermindHandler}>
            Nevermind
          </Button>
        </Box>
      </Modal>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Typography>Set your own calorie goal</Typography>
        </Grid>
        <Grid item sm={12}>
          <TextField
            onChange={setGoalHandler}
            variant="filled"
            label="enter calorie goal"
            id="number"
            error={calorieError}
          ></TextField>
        </Grid>
        <Grid item sm={12}>
          <Button onClick={setGoal} variant="contained">
            Submit
          </Button>
          {displaySearchAlert && (
            <Grid item sm={12} sx={{ paddingTop: "20px" }}>
              <Stack spacing={4}>
                <Alert severity="success">
                  <AlertTitle>Success!</AlertTitle>
                  You have set a new calorie goal —{" "}
                  <strong>Check out the change in My Tracker</strong>
                </Alert>
              </Stack>
            </Grid>
          )}
        </Grid>
        {!displaySearchAlert && (
          <>
            <Grid item xs={12}>
              <Typography>
                Answer the list of questions below for a personalized calorie
                goal
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                value={genderValue}
                onChange={(event, newGenderValue) => {
                  setGenderValue(newGenderValue);
                }}
                inputValue={inputGenderValue}
                onInputChange={(event, newInputGenderValue) => {
                  setInputGenderValue(newInputGenderValue);
                }}
                id="controllable-states-demo"
                options={genderOptions}
                renderInput={(params) => (
                  <TextField {...params} label="Select your gender" />
                )}
              />
            </Grid>
            <Grid item xs={9}></Grid>
            <Grid item sm={12}>
              <TextField
                onChange={setWeightHandler}
                variant="filled"
                label="enter weight in kg"
                id="number"
                error={weightError}
              ></TextField>
            </Grid>
            <Grid item sm={12}>
              <TextField
                onChange={setHeightHandler}
                variant="filled"
                label="enter height in cm"
                id="number"
                error={heightError}
              ></TextField>
            </Grid>
            <Grid item sm={12}>
              <TextField
                onChange={setAgeHandler}
                variant="filled"
                label="enter your age in years"
                id="number"
                error={ageError}
              ></TextField>
            </Grid>

            <Grid item xs={3}>
              <Autocomplete
                isOptionEqualToValue={(activityOptions, value) =>
                  activityOptions.id === value.id
                }
                value={activityValue}
                onChange={(event, newActivityValue) => {
                  setActivityValue(newActivityValue);
                }}
                inputValue={inputActivityValue}
                onInputChange={(event, newInputActivityValue) => {
                  setInputActivityValue(newInputActivityValue);
                  setActivityError(false);
                }}
                id="string"
                options={activityOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={activityError}
                    label="Select your activity level"
                  />
                )}
              />
            </Grid>
            <Grid item xs={9}></Grid>

            <Grid item xs={3}>
              <Autocomplete
                isOptionEqualToValue={(options, value) =>
                  options.id === value.id
                }
                value={value}
                onChange={(event, newInputValue) => {
                  setValue(newInputValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                  setHowFastError(false);
                }}
                id="string"
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={howFastError}
                    label="How fast lose weight?"
                  />
                )}
              />
            </Grid>
            <Grid item xs={9}></Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={getPersonalGoalHandler}>
                Click for personalized goal
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Goals;
