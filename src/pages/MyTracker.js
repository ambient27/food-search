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

const MyTracker = (props) => {
  const { user } = React.useContext(UserContext);
  const [entries, setEntries] = React.useState([]);
  const [dateSelected, setDateSelected] = React.useState(new Date());
  const [progress, setProgress] = React.useState(0);
  const [realProgress, setRealProgress] = React.useState(0);

  const maxOneHundred = props.calGoal / 100;

  const trackDeleteHandler = (data) => {
    deleteDoc(doc(firebase.db, "food-entries", `${data.id}`));
    setEntries(entries.filter((entry) => entry.id !== data.id));
    const newProg = realProgress - data.data.kcal;
    console.log(newProg);

    if (newProg / maxOneHundred >= 100) {
      setProgress(100);
    } else {
      setProgress(newProg / maxOneHundred);
    }
    setRealProgress(newProg);
  };

  React.useEffect(() => {
    if (user?.user?.uid) {
      const entriesRef = collection(firebase.db, "food-entries");

      dateSelected.setHours(0, 0, 0, 0);
      const startInMs = dateSelected.getTime();

      dateSelected.setHours(23, 59, 59, 999);
      const endInMs = dateSelected.getTime();

      const startDate = new Date(startInMs);
      const endDate = new Date(endInMs);

      const q = query(
        entriesRef,
        where("uid", "==", user?.user?.uid),
        where("date", ">=", startDate),
        where("date", "<", endDate)
      );

      (async () => {
        const fetchedEntries = [];
        const fetchedCalories = [];
        const reducer = (accumulator, curr) => accumulator + curr;

        const docs = await getDocs(q);

        docs.forEach((doc) => {
          fetchedEntries.push({ data: doc.data(), id: doc.id });
          fetchedCalories.push(doc.data().kcal);
        });

        const setSum = fetchedCalories.reduce(reducer, 0);
        setEntries(fetchedEntries);
        if (setSum / maxOneHundred >= 100) {
          setProgress(100);
        } else {
          setProgress(setSum / maxOneHundred);
        }
        setRealProgress(setSum);
      })();
    }
  }, [user?.user?.uid, dateSelected, maxOneHundred]);

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={12}></Grid>
      <Grid item xs={1} md={2}></Grid>
      <Grid item xs={2} md={4}>
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
      <Grid item xs={2} md={6}>
        <Typography variant="smalltext">
          Calories % of goal out of {props.calGoal}
        </Typography>
        <Box sx={{ width: "300px" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            valueBuffer={0}
          />
        </Box>
      </Grid>
      {entries.map((data, idx) => (
        <Grid item xs={3} key={idx}>
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
            <Typography variant="secondary">
              Date - {data.data.date.toDate().toLocaleDateString()}
            </Typography>
            <Button
              onClick={() => trackDeleteHandler(data)}
              sx={{
                backgroundColor: "#9F5C2D",
                color: "black",
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
