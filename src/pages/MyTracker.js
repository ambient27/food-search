import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import firebase from "../api/firebase";
import UserContext from "../store/UserContext";
import { Typography, Box, Stack, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/lab";
import LinearProgress from "@mui/material/LinearProgress";

const MyTracker = () => {
  const { user } = React.useContext(UserContext);
  const [entries, setEntries] = React.useState([]);
  const [dateSelected, setDateSelected] = React.useState(new Date());
  const [progress, setProgress] = React.useState(0);

  const trackDeleteHandler = (data) => {
    deleteDoc(doc(firebase.db, "food-entries", `${data.id}`));
    setEntries(entries.filter((entry) => entry.id !== data.id));
  };

  React.useEffect(() => {
    if (user?.user?.uid) {
      const entriesRef = collection(firebase.db, "food-entries");

      const dateObj = dateSelected;
      const month = dateObj.getUTCMonth() + 1; //months from 1-12
      const day = dateObj.getUTCDate() - 1;
      const year = dateObj.getUTCFullYear();

      const newdate = year + "/" + month + "/" + day;

      //const q = query(entriesRef, where("uid", "==", user?.user?.uid));
      const qTwo = query(entriesRef, where("date", "==", newdate));

      console.log(newdate);

      (async () => {
        const fetchedEntries = [];
        const fetchedCalories = [];
        const reducer = (accumulator, curr) => accumulator + curr;

        const docs = await getDocs(qTwo);

        docs.forEach((doc) => {
          fetchedEntries.push({ data: doc.data(), id: doc.id });
          fetchedCalories.push(doc.data().kcal);
        });

        console.log(fetchedEntries);
        console.log(fetchedCalories);

        const setSum = fetchedCalories.reduce(reducer, 0);

        if (setSum / 20 >= 100) {
          setProgress(100);
          setEntries(fetchedEntries);
        } else {
          setProgress(setSum / 20);
          setEntries(fetchedEntries);
        }
      })();
    }
  }, [user?.user?.uid, dateSelected]);

  console.log(progress);
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={4}>
        <DesktopDatePicker
          label="Please select a date to review entries"
          value={dateSelected}
          maxDate={new Date()}
          minDate={new Date("2021-12-01")}
          onChange={(newValue) => {
            setDateSelected(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>
      <Grid item xs={8}>
        <Typography variant="smalltext">
          Calories % of goal out of 2000
        </Typography>
        <Box sx={{ width: "300px" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            valueBuffer="0"
          />
        </Box>
      </Grid>
      {entries.map((data) => (
        <Grid item xs={3} key={data.data.foodId}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="secondary">
              Item - {data.data.label}
            </Typography>
            <Typography variant="secondary">
              Ate at - {data.data.whenate}
            </Typography>
            <Typography variant="secondary">
              Calories - {data.data.kcal}
            </Typography>
            <Typography variant="secondary">
              Carbs - {data.data.carbs}
            </Typography>
            <Typography variant="secondary">
              Fiber - {data.data.fiber}
            </Typography>
            <Typography variant="secondary">Date - {data.data.date}</Typography>
            <Button
              onClick={() => trackDeleteHandler(data)}
              sx={{
                borderRadius: "25px",
                backgroundColor: "#9F5C2D",
                color: "black",
                margin: "1rem",
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
            >
              Remove Entry
            </Button>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyTracker;
