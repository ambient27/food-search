import { Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
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

const WeeklyGoal = () => {
  const [progress, setProgress] = React.useState(75);
  const [entries, setEntries] = React.useState([]);
  const [realProgress, setRealProgress] = React.useState(0);
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    if (user?.user?.uid) {
      const maxOneHundred = 20 / 100;
      const currentDay = new Date();
      const entriesRef = collection(firebase.db, "food-entries");
      currentDay.setHours(0, 0, 0, 0);
      const startInMs = currentDay.getTime();

      currentDay.setHours(23, 59, 59, 999);
      const endInMs = currentDay.getTime();

      const startDate = new Date(startInMs);
      const endDate = new Date(endInMs);

      console.log(endDate);
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
  }, [user?.user?.uid]);

  return (
    <>
      <Stack direction="column" spacing={1}>
        <Typography>Sunday Calories</Typography>
        <Box sx={{ width: "300px" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            valueBuffer={0}
          />
        </Box>
        <Typography>Monday Calories</Typography>
        <Box sx={{ width: "300px" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            valueBuffer={0}
          />
        </Box>
        <Typography>Tuesday Calories</Typography>
        <Box sx={{ width: "300px" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            valueBuffer={0}
          />
        </Box>
        <Typography>Wednesday Calories</Typography>
        <Box sx={{ width: "300px" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            valueBuffer={0}
          />
        </Box>
        <Typography>Thursday Calories</Typography>
        <Box sx={{ width: "300px" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            valueBuffer={0}
          />
        </Box>
        <Typography>Friday Calories</Typography>
        <Box sx={{ width: "300px" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            valueBuffer={0}
          />
        </Box>
        <Typography>Saturday Calories</Typography>
        <Box sx={{ width: "300px" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            valueBuffer={0}
          />
        </Box>
      </Stack>
    </>
  );
};

export default WeeklyGoal;
