import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import store from "../Store/TodoStore";

export default WorkList = () => {
  const [selected, setSelected] = React.useState(store.getState().isThemeDark);
  const [data, setData] = React.useState("");
  const addWork = () => {
    store.dispatch({ type: "list", payload: data });
  };

  // For getting latest value of list
  // console.log(store.getState().list);

  React.useEffect(() => {
    // const unsubcribe = store.subcribe(() => {
    //   setSelected(store.getState().isThemeDark);
    // });
    // return () => unsubcribe();
  }, []);

  return (
    <>
      {/* Learning the raw redux with simple isThemeDark example */}
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        />
        <CardContent>
          {store.getState().isThemeDark ? (
            <Typography gutterBottom variant="h5" component="div">
              White
            </Typography>
          ) : (
            <Typography gutterBottom variant="h5" component="div">
              Dark
            </Typography>
          )}
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
          <ToggleButton
            value="check"
            selected={selected}
            onChange={() => {
              setSelected((prevSelected) => !prevSelected);
              store.dispatch({ type: "theme", payload: selected });
            }}
          >
            <CheckIcon />
          </ToggleButton>
        </CardActions>
      </Card>
      {/* Form for adding WorkOuts */}
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={1} direction="row">
          <TextField
            id="outlined-basic"
            label="ADD WORK"
            variant="outlined"
            value={data}
            onChange={(e) => {
              // console.log(e.target.value);
              setData(e.target.value);
            }}
          />
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              setData("");
              addWork();
            }}
          >
            SUBMIT
          </Button>
        </Stack>
      </Box>
      {/* List For Display WorkOuts */}
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {store.getState().list.map((sectionId) => (
          <ListItem key={`item-${sectionId}}`}>{sectionId}</ListItem>
        ))}
      </List>
    </>
  );
};
