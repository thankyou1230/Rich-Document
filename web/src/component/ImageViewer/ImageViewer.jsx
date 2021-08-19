import "./ImageViewer.css";
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Link, useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

const ImageViewer = (props) => {
  const id = props.location.state[0];
  const fileName = props.location.state[1];
  const url = props.location.state[2];
  const email = props.location.state[3];

  const [open, setOpen] = React.useState(true);
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    appBar: {
      backgroundColor: "#FFFFFF",
    },
    bottomAppBar: {
      top: "auto",
      bottom: 0,
      backgroundColor: "#FFFFFF",
    },
    grow1: {
      flexGrow: 0.5,
    },
    grow2: {
      flexGrow: 0.5,
    },
    slider: {
      width: 250,
    },
  }));

  const classes = useStyles();

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
  });

  const handleClose = () => {
    setOpen(false);
  };

  function valueDisplay(value) {
    return `${value}`;
  }

  const valueOnChange = (e, value) => {
    document.getElementById("img").style.width = value + "%";
  };

  const backToDashboard = () => {
    history.push("/dashboard");
  };

  const backToDashboard1 = () => {
    document.getElementById("edit").style.display = "none";
    document.getElementById("view").style.display = "block";
  };

  const enableEdit = () => {
    document.getElementById("edit").style.display = "block";
    document.getElementById("view").style.display = "none";
  };

  const deleteFile = () => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("email", email);
    formData.append("fileName", fileName);
    fetch("https://localhost:44327/DeleteFile", {
      method: "POST",
      body: formData,
    }).then(() => history.push("/dashboard"));
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar variant="dense">
            <TextField
              id="standard-full-width"
              label="File Name"
              defaultValue={fileName}
              fullWidth
              disabled
              margin="normal"
            />
          </Toolbar>
        </AppBar>
        <div className={classes.offset} />
        <img id="img" src={url} class="img"></img>
        <div className={classes.offset} />
        <div id="view">
          <AppBar id="view" position="fixed" className={classes.bottomAppBar}>
            <Toolbar>
              <IconButton
                aria-haspopup="true"
                color="inherit"
                onClick={backToDashboard}
              >
                <iconify-icon
                  data-icon="akar-icons:arrow-back-thick"
                  class="blackicon"
                ></iconify-icon>
                <div className="spacer"></div>
                <Typography class="bottomIconButton">
                  Back to Dashboard
                </Typography>
              </IconButton>
              <div className={classes.grow1} />
              <Typography class="bottomIconButton">Zoom Level</Typography>
              <div className="spacer"></div>
              <Slider
                className={classes.slider}
                defaultValue={70}
                getAriaValueText={valueDisplay}
                onChange={valueOnChange}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={100}
              />
              <div className={classes.grow2} />
              <IconButton
                aria-haspopup="true"
                color="inherit"
                onClick={deleteFile}
              >
                <iconify-icon
                  data-icon="carbon:delete"
                  class="blackicon"
                ></iconify-icon>
                <div className="spacer"></div>
                <Typography class="bottomIconButton">Delete</Typography>
              </IconButton>

              <IconButton aria-haspopup="true" color="inherit">
                <iconify-icon
                  data-icon="akar-icons:download"
                  class="blackicon"
                ></iconify-icon>
                <div className="spacer"></div>
                <Link
                  class="bottomIconButton"
                  to={url}
                  target="_blank"
                  download
                >
                  Download
                </Link>
              </IconButton>
              <IconButton
                aria-haspopup="true"
                color="inherit"
                onClick={enableEdit}
              >
                <iconify-icon
                  data-icon="fa-regular:edit"
                  class="blackicon"
                ></iconify-icon>
                <div className="spacer"></div>
                <Typography class="bottomIconButton">Edit</Typography>
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>

        <div hidden id="edit">
          <AppBar position="fixed" className={classes.bottomAppBar}>
            <Toolbar>
              <IconButton
                aria-haspopup="true"
                color="inherit"
                onClick={backToDashboard1}
              >
                <iconify-icon
                  data-icon="ant-design:close-outlined"
                  class="blackicon"
                ></iconify-icon>
                <div className="spacer"></div>
                <Typography class="bottomIconButton">Close</Typography>
              </IconButton>
              <div className={classes.grow1} />

              <Tooltip title="Flip Horizontal" placement="top-start">
                <IconButton aria-haspopup="true" color="inherit">
                  <iconify-icon
                    data-icon="icon-park-outline:flip-horizontally"
                    class="blackicon"
                  ></iconify-icon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Flip Vertical" placement="top-start">
                <IconButton aria-haspopup="true" color="inherit">
                  <iconify-icon
                    data-icon="icon-park-outline:flip-vertically"
                    class="blackicon"
                  ></iconify-icon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Draw" placement="top-start">
                <IconButton aria-haspopup="true" color="inherit">
                  <iconify-icon
                    data-icon="ic:baseline-draw"
                    class="blackicon"
                  ></iconify-icon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Color Picker" placement="top-start">
                <IconButton aria-haspopup="true" color="inherit">
                  <iconify-icon
                    data-icon="si-glyph:color-picker"
                    class="blackicon"
                  ></iconify-icon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Crop" placement="top-start">
                <IconButton aria-haspopup="true" color="inherit">
                  <iconify-icon
                    data-icon="bi:crop"
                    class="blackicon"
                  ></iconify-icon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Insert New Layer" placement="top-start">
                <IconButton aria-haspopup="true" color="inherit">
                  <iconify-icon
                    data-icon="carbon:column-insert"
                    class="blackicon"
                  ></iconify-icon>
                </IconButton>
              </Tooltip>

              <div className={classes.grow2} />
              <Typography class="bottomIconButton">Zoom Level</Typography>
              <div className="spacer"></div>
              <Slider
                className={classes.slider}
                defaultValue={70}
                getAriaValueText={valueDisplay}
                onChange={valueOnChange}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={100}
              />

              <IconButton aria-haspopup="true" color="inherit">
                <iconify-icon
                  data-icon="carbon:save"
                  class="blackicon"
                ></iconify-icon>
                <div className="spacer"></div>
                <Typography class="bottomIconButton">Save</Typography>
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
      </Dialog>
    </>
  );
};

export default ImageViewer;
