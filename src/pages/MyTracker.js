import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import "./NewEntry.css";

const MyTracker = (props) => {
  return props.data.map((data, index) => {
    return (
      <Grid container spacing={1}>
        &nbsp;
        <Grid item xs={12}></Grid>
        <Grid item xs={1}>
          {data.date.length !== 0 && (
            <Box>
              <Card
                key="id"
                variant="outlined"
                sx={{
                  backgroundColor: "#DBA380",
                  height: "160px",
                }}
              >
                <p>
                  <b className="par">Calories:</b> <em>{data.calories}</em>
                </p>
                <p>
                  <b className="par">Date:</b>{" "}
                  <em>{new Date(data.date).toLocaleDateString()}</em>
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
                    color: "black",
                    fontWeight: "700",
                    lineHeight: "26.4px",
                  }}
                  onClick={() => props.deleteHandler(index)}
                >
                  Delete
                </Button>
              </Card>
            </Box>
          )}
        </Grid>
      </Grid>
    );
  });
};

export default MyTracker;
