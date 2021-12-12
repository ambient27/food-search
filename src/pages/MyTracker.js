import React from "react";
import Card from "@mui/material/Card";
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
import { Typography } from "@mui/material";

const MyTracker = () => {
  const { user } = React.useContext(UserContext);
  const [entries, setEntries] = React.useState([]);

  const trackDeleteHandler = (data) => {
    deleteDoc(doc(firebase.db, "food-entries", `${data.id}`));
    setEntries(entries.filter((entry) => entry.id !== data.id));
  };

  React.useEffect(() => {
    if (user?.user?.uid) {
      const entriesRef = collection(firebase.db, "food-entries");

      const q = query(entriesRef, where("uid", "==", user?.user?.uid));

      (async () => {
        const fetchedEntries = [];

        const docs = await getDocs(q);

        docs.forEach((doc) => {
          fetchedEntries.push({ data: doc.data(), id: doc.id });
        });

        console.log(fetchedEntries);
        setEntries(fetchedEntries);
      })();
    }
  }, [user?.user?.uid]);

  return (
    <Grid container direction="row" spacing={2}>
      {entries.map((data) => (
        <Grid item>
          <Card
            variant="outlined"
            sx={{
              backgroundColor: "#DBA380",
              height: "220px",
              width: "210px",
            }}
          >
            <Typography variant="secondary">
              &nbsp;Label: <em>{data.data.label}</em>
            </Typography>
            <br />
            <Typography variant="secondary">
              &nbsp;Ate During: <em>{data.data.whenate} </em>
            </Typography>
            <br />
            <Typography variant="secondary">
              &nbsp;Calories: <em>{data.data.kcal}</em>
            </Typography>
            <br />
            <Typography variant="secondary">
              &nbsp;Date:{" "}
              <em>{new Date(data.data.date.seconds * 1000).toDateString()}</em>
            </Typography>
            <br />
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
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyTracker;
