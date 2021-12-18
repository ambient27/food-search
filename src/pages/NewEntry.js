import React from "react";
import UserContext from "../store/UserContext";
import ListDividers from "../components/UI/List";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import DescriptionAlerts from "../components/UI/Alerts";
import CircularProgress from "@mui/material/CircularProgress";
import firebase from "../api/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import Autocomplete from "@mui/material/Autocomplete";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const isEmpty = (value) => value.trim() === "";
const options = ["Breakfast", "Lunch", "Dinner", "Snacks"];

const NewEntry = () => {
  const { user } = React.useContext(UserContext);
  const [subs, setSubs] = React.useState([]);
  const [loaded, isLoaded] = React.useState(false);
  const [selectedSearch, isSearching] = React.useState("");
  const [dateSelected, setDateSelected] = React.useState(new Date());
  const [searchStarted, setSearchStarted] = React.useState(false);
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");
  const [displayAlert, setDisplayAlert] = React.useState(false);
  const [displaySearchAlert, setDisplaySearchAlert] = React.useState(false);

  const fetchMeals = async (event) => {
    event.preventDefault();
    setSearchStarted(true);

    const searchIsValid = !isEmpty(selectedSearch);
    if (!searchIsValid) {
      setDisplaySearchAlert(true);
    } else {
      setDisplaySearchAlert(false);
    }

    const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=08ccfbe5&app_key=%20fc8b065b7c50db00c72dd76e96abb3ca&ingr=${selectedSearch}&nutrition-type=cooking`;

    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      const loadedData = [];

      for (let i = 0; i < 20; i++) {
        loadedData.push({
          text: responseData.hints[i].food.label,
          calories: Math.trunc(responseData.hints[i].food.nutrients.ENERC_KCAL),
          protein: Math.trunc(responseData.hints[i].food.nutrients.PROCNT),
          fat: Math.trunc(responseData.hints[i].food.nutrients.FAT),
          carbs: Math.trunc(responseData.hints[i].food.nutrients.CHOCDF),
          fiber: Math.trunc(responseData.hints[i].food.nutrients.FIBTG),
          foodId: responseData.hints[i].food.foodId,
          category: responseData.hints[i].food.category,
        });
      }
      setSubs(loadedData);
      isLoaded(true);
    } catch (error) {
      console.log(error);
    }
    setSearchStarted(false);
  };

  const searchHandler = (event) => {
    setDisplayAlert(false);
    isSearching(event.target.value);
  };

  const iAteThisThing = async (props) => {
    const foodEntriesRef = collection(firebase.db, "food-entries");

    await setDoc(doc(foodEntriesRef), {
      category: props[0].category,
      date: dateSelected,
      fat: props[0].fat,
      protein: props[0].protein,
      label: props[0].item,
      kcal: props[0].calories,
      uid: user?.user?.uid,
      whenate: inputValue,
      fiber: props[0].fiber,
      carbs: props[0].carbs,
    });
    isLoaded(false);
    setDisplayAlert(true);
    setDisplaySearchAlert(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={4}>
          <TextField
            onChange={searchHandler}
            variant="filled"
            label="Food you ate"
          ></TextField>
          <Button
            sx={{ margin: ".5rem" }}
            variant="contained"
            onClick={fetchMeals}
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            renderInput={(params) => (
              <TextField {...params} label="Select when you ate this item" />
            )}
          />
        </Grid>
        <Grid item xs={5}>
          <DesktopDatePicker
            label="Please enter a date"
            value={dateSelected}
            maxDate={new Date()}
            minDate={new Date("2021-12-01")}
            onChange={(newValue) => {
              setDateSelected(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        {searchStarted && (
          <Box>
            <CircularProgress />
          </Box>
        )}
        <Grid item xs={12}></Grid>
        {loaded &&
          subs.map((data, idx) => (
            <Grid item xs={3} key={idx}>
              <ListDividers
                iAteThisThing={iAteThisThing}
                key={data.foodId}
                text={data.text}
                calories={data.calories}
                protein={data.protein}
                fat={data.fat}
                carbs={data.carbs}
                fiber={data.fiber}
                category={data.category}
              ></ListDividers>
            </Grid>
          ))}

        <Grid item xs={12}>
          {displayAlert && <DescriptionAlerts severity="success" />}
          {displaySearchAlert && (
            <Stack spacing={2}>
              <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                Your search is invalid —{" "}
                <strong>Please enter a valid search</strong>
              </Alert>
            </Stack>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default NewEntry;
