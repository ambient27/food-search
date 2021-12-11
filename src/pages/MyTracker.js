import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import "./NewEntry.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import firebase from "../api/firebase";
import UserContext from "../store/UserContext";

const MyTracker = () => {
  const { user } = React.useContext(UserContext);
  const [entries, setEntries] = React.useState([]);

  React.useEffect(() => {
    if (user?.user?.uid) {
      const entriesRef = collection(firebase.db, "food-entries");

      const q = query(entriesRef, where("uid", "==", user?.user?.uid));

      (async () => {
        const fetchedEntries = [];

        const docs = await getDocs(q);

        docs.forEach((doc) => {
          fetchedEntries.push(doc.data());
        });

        setEntries(fetchedEntries);
      })();
    }
  }, [user?.user?.uid]);

  return (
    <Grid container direction="row" spacing={2}>
      {entries.map((data) => (
        <Grid item>
          <Card
            key="id"
            variant="outlined"
            sx={{
              backgroundColor: "#DBA380",
              height: "220px",
            }}
          >
            <p>
              <b className="par">Label:</b> <em>{data.label}</em>
            </p>
            <p>
              <b className="par">Calories:</b> <em>{data.kcal}</em>
            </p>
            <p>
              <b className="par">Date:</b>{" "}
              <em>{new Date(data.date.seconds * 1000).toDateString()}</em>
            </p>

            <Button
              sx={{
                borderRadius: "25px",
                backgroundColor: "#9F5C2D",
                color: "black",
                textAlign: "center",
                margin: ".5rem",
                "&:hover": {
                  backgroundColor: "blue",
                },
                fontFamily: "Merriweather",
                fontStyle: "normal",
                fontVariant: "normal",
                fontWeight: "700",
                lineHeight: "26.4px",
              }}
            >
              Delete
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyTracker;
