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
import { useNavigate } from "react-router-dom";

const MyTracker = (props) => {
  const { user } = React.useContext(UserContext);
  const [entries, setEntries] = React.useState([]);
  const [dateSelected, setDateSelected] = React.useState(new Date());
  const [progress, setProgress] = React.useState(0);
  const [realProgress, setRealProgress] = React.useState(0);

  const maxOneHundred = props.calGoal / 100;
  const navigate = useNavigate();

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

  const showWeekly = () => {
    navigate("../weeklygoal", { replace: true });
    console.log("hi");
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
      <Grid item xs={12} sm={2} md={3}>
        <DesktopDatePicker
          label="Please select a date to review entries"
          sx={{ fontSize: 14 }}
          value={dateSelected}
          maxDate={new Date()}
          minDate={new Date("2021-12-01")}
          onChange={(newValue) => {
            setDateSelected(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>
      <Grid item xs={12} sm={3} md={4}>
        <Typography variant="smallertext" align="center">
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

      <Grid item xs={12} sm={3} md={4}>
        <Button variant="contained" onClick={showWeekly}>
          Show me Weekly Goal Data
        </Button>
      </Grid>
      {entries.map((data, idx) => (
        <Grid item xs={12} md={3} sm={6} key={idx}>
          <Stack direction="column" justifyContent="center" alignItems="center">
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
              variant="contained"
              onClick={() => trackDeleteHandler(data)}
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
