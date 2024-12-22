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
import Divider from "@mui/material/Divider";

import store from "../Store/TodoStore";
import {
  ADD_WORKOUT,
  CHANGE_THEME,
  ADD_DEMO,
  CHANGE_DEMO_THEME,
} from "../action/actionConstant";
import {
  demoActionCreator,
  workoutActionCreator,
} from "../action/actionCreators";

// Define the component
const WorkList = () => {
  const [selected, setSelected] = React.useState(
    store.getState().workoutReducer.isThemeDark
  );

  const [selectedDemo, setSelectedDemo] = React.useState(
    store.getState().demoReducer.isThemeDark
  );

  const [data, setData] = React.useState("");
  const [demoData, setDemoData] = React.useState("");

  const addWork = () => {
    store.dispatch(workoutActionCreator(ADD_WORKOUT, data));
    setData("");
  };

  const addDemo = () => {
    store.dispatch(demoActionCreator(ADD_DEMO, demoData));
  };

  // console.log(store.getState().demoReducer);

  React.useEffect(() => {
    const unsubscribe = store.subcribe(() => {
      setSelected(store.getState().workoutReducer.isThemeDark);
      setSelectedDemo(store.getState().demoReducer.isThemeDark);
    });
    return () => unsubscribe();
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
          {store.getState().workoutReducer.isThemeDark ? (
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
              // store.dispatch({ type: CHANGE_THEME, payload: selected });
              store.dispatch(workoutActionCreator(CHANGE_THEME, selected));
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
        {store.getState().workoutReducer.list.map((sectionId, index) => (
          <ListItem key={`item-${index}`}>{sectionId}</ListItem>
        ))}
      </List>

      <Divider sx={{ borderBottomWidth: 10 }} />
      {/* Example for demoreducer @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/}
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        />
        <CardContent>
          {store.getState().demoReducer.isThemeDark ? (
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
            selected={selectedDemo}
            onChange={() => {
              setSelectedDemo((prevSelected) => !prevSelected);
              store.dispatch(
                demoActionCreator(CHANGE_DEMO_THEME, selectedDemo)
              );
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
            id="outlined-basic2"
            label="ADD WORK 2"
            variant="outlined"
            value={demoData}
            onChange={(e) => setDemoData(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              setDemoData("");
              addDemo();
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
        {store.getState().demoReducer.list.map((sectionId, index) => (
          <ListItem key={`item-${index}`}>{sectionId}</ListItem>
        ))}
      </List>
    </>
  );
};

// Export the component
export default WorkList;
