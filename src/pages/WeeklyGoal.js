import { Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import firebase from "../api/firebase";
import UserContext from "../store/UserContext";

const WeeklyGoal = () => {
  const [progress, setProgress] = React.useState([0, 0, 0, 0, 0, 0, 0]);
  const [mondayProgress, setMondayProgress] = React.useState(0);
  const [tuesdayProgress, setTuesdayProgress] = React.useState(0);
  const [wednesdayProgress, setWednesdayProgress] = React.useState(0);
  const [thursdayProgress, setThursdayProgress] = React.useState(0);
  const [fridayProgress, setFridayProgress] = React.useState(0);
  const [saturdayProgress, setSaturdayProgress] = React.useState(0);
  const [sundayProgress, setSundayProgress] = React.useState(5);

  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    if (user?.user?.uid) {
      const entriesRef = collection(firebase.db, "food-entries");
      const currentDay = new Date();
      currentDay.setHours(0, 0, 0, 0);
      let startInMs = currentDay.getTime();
      currentDay.setHours(23, 59, 59, 999);
      let endInMs = currentDay.getTime();
      const curDay = currentDay.getDay();
      console.log(curDay);

      if (curDay > 0) {
        startInMs -= curDay * 86400000;
      }
      if (curDay < 6) {
        endInMs += (6 - curDay) * 86400000;
      }

      for (let i = 0; i < 7; i++) {
        const initialDate = new Date(startInMs + i * 86400000);
        const endingDate = new Date(endInMs - (6 - i) * 86400000);
        console.log(initialDate);
        console.log(endingDate);
        const q = query(
          entriesRef,
          where("uid", "==", user?.user?.uid),
          where("date", ">=", initialDate),
          where("date", "<", endingDate)
        );

        (async () => {
          const fetchedCalories = [];
          const yourArray = [];

          const reducer = (accumulator, curr) => accumulator + curr;
          const docs = await getDocs(q);
          docs.forEach((doc) => {
            fetchedCalories.push(doc.data().kcal);
          });
          const setSum = fetchedCalories.reduce(reducer, 0);

          console.log(i);
          console.log(setSum);
          yourArray.push(setSum);
        })();
      }
    }
  }, [user?.user?.uid]);

  return (
    <>
      <Stack direction="column" spacing={1}>
        <Typography>Sunday Calories</Typography>
        <Box sx={{ width: "300px" }}>
          <LinearProgress
            variant="determinate"
            value={sundayProgress}
            valueBuffer={0}
          />
        </Box>
        <Typography>Monday Calories</Typography>
        <Box sx={{ width: "300px" }}>
          <LinearProgress
            variant="determinate"
            value={mondayProgress}
            valueBuffer={0}
          />
        </Box>
        <Typography>Tuesday Calories</Typography>
        <Box sx={{ width: "300px" }}>
          <LinearProgress
            variant="determinate"
            value={tuesdayProgress}
            valueBuffer={0}
          />
        </Box>
        <Typography>Wednesday Calories</Typography>
        <Box sx={{ width: "300px" }}>
          <LinearProgress
            variant="determinate"
            value={wednesdayProgress}
            valueBuffer={0}
          />
        </Box>
        <Typography>Thursday Calories</Typography>
        <Box sx={{ width: "300px" }}>
          <LinearProgress
            variant="determinate"
            value={thursdayProgress}
            valueBuffer={0}
          />
        </Box>
        <Typography>Friday Calories</Typography>
        <Box sx={{ width: "300px" }}>
          <LinearProgress
            variant="determinate"
            value={fridayProgress}
            valueBuffer={0}
          />
        </Box>
        <Typography>Saturday Calories</Typography>
        <Box sx={{ width: "300px" }}>
          <LinearProgress
            variant="determinate"
            value={saturdayProgress}
            valueBuffer={0}
          />
        </Box>
      </Stack>
    </>
  );
};

export default WeeklyGoal;
