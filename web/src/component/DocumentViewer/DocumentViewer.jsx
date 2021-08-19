import "./DocumentViewer.css";
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory } from "react-router-dom";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const DocumentViewer = (props) => {
  const id = props.location.state[0];
  const fileName = props.location.state[1];
  const url = props.location.state[2];
  const email = props.location.state[3];

  if (fileName.substring(fileName.lastIndexOf(".")).toLowerCase() != ".txt") {
    document.getElementById("edit").style.display = "none";
  }

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
    grow: {
      flexGrow: 1,
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

  const backToDashboard = () => {
    history.push("/dashboard");
  };

  const enableEdit = () => {
    const fileUrl = url;

    fetch(fileUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((r) => r.text())
      .then((t) => console.log(t));
    document.getElementById("textedit").style.display = "block";
    document.getElementById("iframe").style.display = "none";
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
        <div id="textedit" hidden>
          <TextareaAutosize class="textarea" />
        </div>

        <iframe
          src={`https://docs.google.com/viewer?url=${url}&embedded=true`}
          id="iframe"
          title="file"
          width="100%"
          height="100%"
        ></iframe>

        <div className={classes.offset} />
        <AppBar position="fixed" className={classes.bottomAppBar}>
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
            <div className={classes.grow} />
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
              <Link class="bottomIconButton" to={url} target="_blank" download>
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
              <Typography id="edit" class="bottomIconButton">
                Edit
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Dialog>
    </>
  );
};

export default DocumentViewer;
