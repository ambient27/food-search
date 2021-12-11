import { useState } from "react";
import "./NewEntry.css";
import ListDividers from "../components/UI/List";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
//import Alert from '@mui/material/Alert';
//import AlertTitle from '@mui/material/AlertTitle';
//import Stack from '@mui/material/Stack';
import DescriptionAlerts from "../components/UI/Alerts";
import CircularProgress from "@mui/material/CircularProgress";
//import SimpleSnackbar from "../components/UI/SimpleSnackbar";
import Snackbar from "@mui/material/Snackbar";
//import MuiAlert from '@mui/material/Alert';
import { Typography } from "@mui/material";

const isEmpty = (value) => value.trim() === "";

const NewEntry = (props) => {
  const [subs, setSubs] = useState([]);
  const [loaded, isLoaded] = useState(false);
  const [selectedSearch, isSearching] = useState("");
  const [thingsAte, setThingsAte] = useState([]);
  const [clickedEat, setClickedEat] = useState(false);
  const [totalCalories, setTotalCalories] = useState([0]);
  const [amountRemoved, setAmountRemoved] = useState([0]);
  const [dateSelected, setDateSelected] = useState(new Date());
  const [searchStarted, setSearchStarted] = useState(false);

  const fetchMeals = async (event) => {
    event.preventDefault();
    setSearchStarted(true);

    const searchIsValid = !isEmpty(selectedSearch);

    if (!searchIsValid) {
      console.log("notworking");
      return (
        <>
          <Snackbar>
            <DescriptionAlerts severity="error" />
          </Snackbar>
        </>
      );
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

  const deleteHandler = (index) => {
    const newArray = [...thingsAte];
    newArray.splice(index, 1);

    const handleArray = [...amountRemoved, thingsAte[index].calories];

    setAmountRemoved(handleArray);
    setThingsAte(newArray);
  };

  const searchHandler = (event) => {
    isSearching(event.target.value);
  };

  const iAteThisThing = () => {
    const newArray = [
      ...thingsAte,
      { text: subs[0].text, calories: subs[0].calories },
    ];
    const newCalArray = [...totalCalories, subs[0].calories];

    setTotalCalories(newCalArray);
    setThingsAte(newArray);
    setClickedEat(true);
  };

  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  const removeSum = amountRemoved.reduce(reducer);
  const sum = totalCalories.reduce(reducer);
  const updatedSum = sum - removeSum;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={3}>
            <Typography> Enter food you ate{" "}
            </Typography>
          <input className="input_example" onChange={searchHandler}></input>
          <Button
            sx={{ 
              margin: '.5rem',
            borderRadius: "25px", 
            backgroundColor: "#9F5C2D",  
            fontFamily: "Merriweather",
            fontStyle: "normal",
            fontVariant: "normal",
            color: 'black',
            fontWeight: "700",
            lineHeight: "26.4px", }}
            variant="contained"
            onClick={fetchMeals}
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid item xs={3}>
          {searchStarted && (
            <Box sx={{ display: "flex", margin: "1rem" }}>
              <CircularProgress />
            </Box>
          )}
          {loaded && <h3 className='par'> &nbsp; <b><u>Item you selected</u></b></h3>}
          {loaded && (
            <ListDividers
              text={subs[0].text}
              calories={subs[0].calories}
              protein={subs[0].protein}
              fat={subs[0].fat}
              sx={{
                fontFamily: "Merriweather",
                fontStyle: "normal",
                fontVariant: "normal",
                color: "black",
                fontWeight: "700",
                lineHeight: "26.4px"
              }}
            >
              {" "}
            </ListDividers>
          )}
        </Grid>
        <Grid item xs={9}>
          <Box
            sx={{
              width: 225,
              height: 320,
              borderRadius: "25px",
              paddingTop: "5px",
              paddingBottom: "10px",
              paddingLeft: "10px",
              backgroundColor: "#DBA380",
              opacity: [0.9, 0.9, 0.9],
              borderStyle: "solid",
              display: "grid",
              textAlign: "center",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(3, 1fr)",
              rowGap: 3,
              columnGap: 0,
            }}
          >
            <Box
              sx={{
                paddingTop: "7px",
                borderRadius: "25px",
                width: 200,
                height: 50,
                textAlign: "center",
                backgroundColor: "#9F5C2D",
                opacity: [0.9, 0.9, 0.9],
                borderStyle: "solid",
                gridColumn: "span 2",
                
              }}
            >
              <b className="par">Total Calories</b>
              &nbsp;
              <b> {updatedSum}</b>
            </Box>
            &nbsp;
            <DesktopDatePicker
              label="Please enter a date"
              value={dateSelected}
              onChange={(newValue) => {
                setDateSelected(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <Button
              sx={{
                gridColumn: "1",
                gridRow: "span 1",
                width: 200,
                textAlign: "center",
                borderRadius: "25px",
                backgroundColor: "#9F5C2D",
                fontFamily: "Merriweather",
                fontStyle: "normal",
                fontVariant: "normal",
                fontWeight: "700",
                lineHeight: "26.4px",
                color: 'black'
              }}
              variant="contained"
              onClick={() =>
                props.entryHandler({ calories: updatedSum, date: dateSelected })
              }
            >
              Submit Entry
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          &nbsp;
          {loaded && (
            <Button
              sx={{ backgroundColor: "#9F5C2D", 
              borderRadius: "25px",
              fontFamily: "Merriweather",
              fontStyle: "normal",
              fontVariant: "normal",
              fontWeight: "700",
              lineHeight: "26.4px",
              color: 'black'
            }}
              variant="contained"
              onClick={iAteThisThing}
            >
              I ate this thing idk why
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          {clickedEat && (
            <ul>
              {thingsAte.map((data, index) => (
                <Box key={index}>
                  <Typography>Item:</Typography> <em>{data.text}</em> {""} <Typography>Calorie Count:</Typography>{" "}
                 <em> {data.calories}</em> &nbsp;
                  <Grid item xs={1}>
                    <Button
                      sx={{
                        backgroundColor: "#9F5C2D",
                        borderRadius: "25px",
                          fontFamily: "Merriweather",
                          fontStyle: "normal",
                          fontVariant: "normal",
                          color: "black",
                          fontWeight: "700",
                          lineHeight: "26.4px"
                        
                      }}
                      onClick={() => deleteHandler(index)}
                      variant="contained"
                    >
                      Remove
                    </Button>
                  </Grid>
                </Box>
              ))}
            </ul>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default NewEntry;
