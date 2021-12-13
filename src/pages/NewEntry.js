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

const buttonStyle = {
  margin: ".5rem",
  borderRadius: "25px",
  lineHeight: "26.4px",
};

const buttonStyle2 = {
  gridColumn: "1",
  width: 200,
  height: 50,
  textAlign: "center",
  borderRadius: "25px",
};

const boxStyle1 = {
  width: 225,
  height: 255,
  borderRadius: "25px",
  paddingTop: "10px",
  paddingLeft: "10px",
  backgroundColor: "#DBA380",
  borderStyle: "solid",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
};

const boxStyle2 = {
  paddingTop: "7px",
  borderRadius: "25px",
  width: 200,
  height: 65,
  textAlign: "center",
  backgroundColor: "#9F5C2D",
  borderStyle: "solid",
  gridColumn: "span 2",
};

const fontFamily = 'roboto';
const fontSize = 18;
const fontWeight = 700;


const NewEntry = (props) => {
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
      const loadedSubs = [];

      loadedSubs.push({
        text: responseData.text,
        calories: Math.trunc(responseData.hints[0].food.nutrients.ENERC_KCAL),
        protein: Math.trunc(responseData.hints[0].food.nutrients.PROCNT),
        fat: Math.trunc(responseData.hints[0].food.nutrients.FAT),
      });
      setSubs(loadedSubs);
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

  const iAteThisThing = async () => {
    const searchIsValid = !isEmpty(selectedSearch);
    if (!searchIsValid) {
      setDisplaySearchAlert(true);
      return;
    } else {
      const foodEntriesRef = collection(firebase.db, "food-entries");
      const refID = Math.floor(Math.random() * 100);

      const dateObj = dateSelected;
      const month = dateObj.getUTCMonth() + 1; //months from 1-12
      const day = dateObj.getUTCDate() - 1;
      const year = dateObj.getUTCFullYear();

      const newdate = year + '/' + month + '/' + day;

      await setDoc(doc(foodEntriesRef), {
        category: "Generic Foods",
        date: newdate,
        fat: subs[0].fat,
        protein: subs[0].protein,
        label: subs[0].text,
        kcal: subs[0].calories,
        uid: user?.user?.uid,
        refid: refID,
        whenate: inputValue,
      });
      setDisplayAlert(true);
      setDisplaySearchAlert(false);
    }
  };
  
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="secondary">Food you ate</Typography> &nbsp;
          <input className="input_example" onChange={searchHandler}></input>
          <Button style={buttonStyle} variant="contained" onClick={fetchMeals}>
            Search
          </Button>
        </Grid>
        <Grid item xs={8}></Grid>
        <Grid item xs={4}>
          
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
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Select when you ate this item" sx={{label: {fontFamily}, label: {fontSize}, label: {fontWeight}}} />
              )}
            />
         
        </Grid>
        <Grid item xs={8}></Grid>
        <Grid item xs={3}>
          {searchStarted && (
            <Box sx={{ display: "flex", margin: "1rem" }}>
              <CircularProgress />
            </Box>
          )}
          {loaded && (
            <ListDividers
              text={subs[0].text}
              calories={subs[0].calories}
              protein={subs[0].protein}
              fat={subs[0].fat}
            ></ListDividers>
          )}
        </Grid>
        <Grid item xs={9}>
          <Box style={boxStyle1}>
            <Box style={boxStyle2}>
              <Typography variant="primary">Total Calories</Typography>
              {loaded && <Typography> {subs[0].calories}</Typography>}
            </Box>
            &nbsp;
            <DesktopDatePicker
              label="Please enter a date"
              value={dateSelected}
              maxDate={new Date()}
              minDate={new Date('2021-12-01')}
              onChange={(newValue) => {
                setDateSelected(newValue);
              }}
              renderInput={(params) => <TextField {...params} sx={{label: {fontFamily}, label: {fontSize}, label: {fontWeight}}}/>}
            />
            <Button
              variant="contained"
              style={buttonStyle2}
              onClick={iAteThisThing}
            >
              Submit Entry
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {displayAlert && <DescriptionAlerts severity="success" />}
          {displaySearchAlert && (
            <Stack sx={{ width: "100%" }} spacing={2}>
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
