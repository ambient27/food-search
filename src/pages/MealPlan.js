import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const MealPlan = () => {
  const dumbClickHandler = () => {
    alert("I see we have some things to work on");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={1}></Grid>
      <h1>Stop eating food</h1>
      <Button
        sx={{
          margin: "1rem",
          backgroundColor: "#9F5C2D",
          color: "black",
        }}
        variant="contained"
        onClick={dumbClickHandler}
      >
        Click here if you were expecting something different
      </Button>
    </Grid>
  );
};

export default MealPlan;
