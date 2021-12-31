import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import { Box } from "@mui/system";
import { Stack, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import firebase from "../api/firebase";
import UserContext from "../store/UserContext";

const WeeklyGoal = (props) => {
  const [sundayProgress, setSundayProgress] = React.useState(0);
  const [mondayProgress, setMondayProgress] = React.useState(0);
  const [tuesdayProgress, setTuesdayProgress] = React.useState(0);
  const [wednesdayProgress, setWednesdayProgress] = React.useState(0);
  const [thursdayProgress, setThursdayProgress] = React.useState(0);
  const [fridayProgress, setFridayProgress] = React.useState(0);
  const [saturdayProgress, setSaturdayProgress] = React.useState(0);
  const [weeklyCals, setWeeklyCals] = React.useState([0, 0, 0, 0, 0, 0, 0]);
  const { user } = React.useContext(UserContext);
  const maxOneHundred = props.calGoal / 100;

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
      const getData = async (props) => {
        const fetchedCalories = [];
        const reducer = (accumulator, curr) => accumulator + curr;
        const docs = await getDocs(props);
        docs.forEach((doc) => {
          fetchedCalories.push(doc.data().kcal);
        });
        const setSum = fetchedCalories.reduce(reducer, 0);
        return setSum;
      };

      const getWeeklyData = async () => {
        const promises = [];
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
          promises.push(getData(q));
          const weeklyData = await Promise.all(promises);
          console.log(weeklyData);
          setWeeklyCals(weeklyData);
          if (i === 6) {
            return weeklyData;
          }
        }
      };

      (async () => {
        const promises = [];
        promises.push(getWeeklyData());
        const weeklyData = await Promise.all(promises);

        console.log(weeklyData);
        console.log(weeklyData[0][0]);
        if (weeklyData[0][0] / maxOneHundred > 100) {
          setSundayProgress(100);
        } else {
          setSundayProgress(weeklyData[0][0] / maxOneHundred);
        }
        if (weeklyData[0][1] / maxOneHundred > 100) {
          setMondayProgress(100);
        } else {
          setMondayProgress(weeklyData[0][1] / maxOneHundred);
        }
        if (weeklyData[0][2] / maxOneHundred > 100) {
          setTuesdayProgress(100);
        } else {
          setTuesdayProgress(weeklyData[0][2] / maxOneHundred);
        }
        if (weeklyData[0][3] / maxOneHundred > 100) {
          setWednesdayProgress(100);
        } else {
          setWednesdayProgress(weeklyData[0][3] / maxOneHundred);
        }
        if (weeklyData[0][4] / maxOneHundred > 100) {
          setThursdayProgress(100);
        } else {
          setThursdayProgress(weeklyData[0][4] / maxOneHundred);
        }
        if (weeklyData[0][5] / maxOneHundred > 100) {
          setFridayProgress(100);
        } else {
          setFridayProgress(weeklyData[0][5] / maxOneHundred);
        }
        if (weeklyData[0][6] / maxOneHundred > 100) {
          setSaturdayProgress(100);
        } else {
          setSaturdayProgress(weeklyData[0][6] / maxOneHundred);
        }
      })();
    }
  }, [user?.user?.uid]);

  return (
    <>
      <Stack direction="column" spacing={1}>
        <Typography>Sunday Calories</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "300px" }}>
            <LinearProgress
              variant="determinate"
              value={sundayProgress}
              valueBuffer={0}
            />
          </Box>
          <Typography sx={{ paddingLeft: "10px" }} variant="smallertext">
            {weeklyCals[0]} kcals
          </Typography>
        </Box>
        <Typography>Monday Calories</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "300px" }}>
            <LinearProgress
              variant="determinate"
              value={mondayProgress}
              valueBuffer={0}
            />
          </Box>
          <Typography sx={{ paddingLeft: "10px" }} variant="smallertext">
            {weeklyCals[1]} kcals
          </Typography>
        </Box>
        <Typography>Tuesday Calories</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "300px" }}>
            <LinearProgress
              variant="determinate"
              value={tuesdayProgress}
              valueBuffer={0}
            />
          </Box>
          <Typography sx={{ paddingLeft: "10px" }} variant="smallertext">
            {weeklyCals[2]} kcals
          </Typography>
        </Box>
        <Typography>Wednesday Calories</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "300px" }}>
            <LinearProgress
              variant="determinate"
              value={wednesdayProgress}
              valueBuffer={0}
            />
          </Box>
          <Typography sx={{ paddingLeft: "10px" }} variant="smallertext">
            {weeklyCals[3]} kcals
          </Typography>
        </Box>
        <Typography>Thursday Calories</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "300px" }}>
            <LinearProgress
              variant="determinate"
              value={thursdayProgress}
              valueBuffer={0}
            />
          </Box>
          <Typography sx={{ paddingLeft: "10px" }} variant="smallertext">
            {weeklyCals[4]} kcals
          </Typography>
        </Box>
        <Typography>Friday Calories</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "300px" }}>
            <LinearProgress
              variant="determinate"
              value={fridayProgress}
              valueBuffer={0}
            />
          </Box>
          <Typography sx={{ paddingLeft: "10px" }} variant="smallertext">
            {weeklyCals[5]} kcals
          </Typography>
        </Box>
        <Typography>Saturday Calories</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "300px" }}>
            <LinearProgress
              variant="determinate"
              value={saturdayProgress}
              valueBuffer={0}
            />
          </Box>
          <Typography sx={{ paddingLeft: "10px" }} variant="smallertext">
            {weeklyCals[6]} kcals
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default WeeklyGoal;
