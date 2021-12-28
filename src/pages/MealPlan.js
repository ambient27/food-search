import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const MealPlan = () => {
  const dumbClickHandler = () => {
    alert("I see we have some things to work on");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}></Grid>
      <Box>
        <Typography variant="secondary">Stop eating food</Typography>
        <Button
          sx={{
            margin: ".5rem",
          }}
          variant="contained"
          onClick={dumbClickHandler}
        >
          Click here if you were expecting something different
        </Button>
      </Box>
    </Grid>
  );
};

export default MealPlan;
