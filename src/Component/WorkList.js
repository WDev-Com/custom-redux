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
import { ADD_WORKOUT, CHANGE_THEME } from "../Store/actionConstant";
import { getAddWorkout } from "../Store/actionCreators";

// Define the component
const WorkList = () => {
  const [selected, setSelected] = React.useState(store.getState().isThemeDark);
  const [data, setData] = React.useState("");

  const addWork = () => {
    store.dispatch(getAddWorkout(ADD_WORKOUT, data));
  };

  // console.log(store.getState().list);

  React.useEffect(() => {
    const unsubcribe = store.subcribe(() => {
      setSelected(store.getState().isThemeDark);
    });
    return () => unsubcribe();
  }, []);

  return (
    <>
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
            This is example of changing the background using the short circuit
            and store state
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
              store.dispatch({ type: CHANGE_THEME, payload: selected });
            }}
          >
            <CheckIcon />
          </ToggleButton>
        </CardActions>
      </Card>

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
            onChange={(e) => setData(e.target.value)}
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
        {store.getState().list.map((sectionId, index) => (
          <ListItem key={`item-${index}`}>{sectionId}</ListItem>
        ))}
      </List>
    </>
  );
};

// Export the component
export default WorkList;
