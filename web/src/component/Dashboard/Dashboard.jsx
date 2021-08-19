import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Authentication/Authentication";
import {
  ColumnDirective,
  ColumnsDirective,
  TreeGridComponent,
} from "@syncfusion/ej2-react-treegrid";
import { Filter, Inject, Sort } from "@syncfusion/ej2-react-treegrid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import Grid from "@material-ui/core/Grid";
import documents from "../../img/document.png";
import IconButton from "@material-ui/core/IconButton";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import MenuItem from "@material-ui/core/MenuItem";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DnsIcon from "@material-ui/icons/Dns";
import { Button } from "@material-ui/core";
import MergeTypeIcon from "@material-ui/icons/MergeType";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SdStorageIcon from "@material-ui/icons/SdStorage";
import InputBase from "@material-ui/core/InputBase";
import HttpIcon from "@material-ui/icons/Http";
import { fade, makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const useStyles = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    button: {
      textTransform: "none",
      fontSize: "small",
      fontWeight: "normal",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    grow: {
      flexGrow: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const { currentUser } = useContext(AuthContext);
  const [setAnchorEl] = React.useState(null);
  const [type, setType] = React.useState("");
  const [orderBy, setOrderBy] = React.useState("lastModified");
  const [order, setOrder] = React.useState("desc");
  const [open, setOpen] = React.useState(false);
  const [datas, setDatas] = React.useState([]);
  const [origin, setOrigin] = React.useState([]);
  const [file, setFile] = React.useState("");
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      getDatas();
    }
  }, []);

  const getDatas = () => {
    let formData = new FormData();
    formData.append("email", email);
    fetch("https://localhost:44327/GetAllDocumentsByEmail", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setDatas(JSON.parse(JSON.stringify(data)));
        setOrigin(JSON.parse(JSON.stringify(data)));
      });
  };

  const menuId = "primary-search-account-menu";
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  var email = "";
  var displayName = "";

  if (!currentUser) {
    //redirect to dashboard if user logged out
    return <Redirect to="/signin" />;
  }

  if (currentUser) {
    email = currentUser.email;
    displayName = currentUser.displayName;
  }

  const handleTypeChange = (e) => {
    setType(e.target.value);
    var string = e.target.value;
    if (string.trim() != "") {
      setDatas(
        origin.filter((data) => {
          return data.fileType.toLowerCase().match(string.toLowerCase());
        })
      );
    } else {
      setDatas(origin);
    }
  };

  const handleOrderByChange = (e) => {
    setOrderBy(e.target.value);
    var string = e.target.value;
    if (string == "fileName") {
      setDatas(
        origin.sort((a, b) => a.fileName.localeCompare(b.fileName)).reverse()
      );
    } else {
      setDatas(origin);
    }
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    setDatas(origin.sort((a, b) => a.fileName.localeCompare(b.fileName)));
  };

  const gridViewOnClick = () => {
    document.getElementById("list").style.display = "none";
    document.getElementById("grid").style.display = "block";
  };

  const listViewOnClick = () => {
    document.getElementById("list").style.display = "block";
    document.getElementById("grid").style.display = "none";
  };

  const searchOnChange = (e) => {
    var string = e.target.value;
    if (string.trim() != "") {
      setDatas(
        origin.filter((data) => {
          return data.fileName
            .toLowerCase()
            .match(e.target.value.toLowerCase());
        })
      );
    } else {
      setDatas(origin);
    }
  };

  const getItemForGrid = (id, fileName, fileType, url) => {
    if (fileType == "document") {
      return (
        <>
          <iconify-icon
            data-icon="emojione:clipboard"
            class="blackicon"
            data-width="50"
            data-height="50"
          ></iconify-icon>
          <div className="spacer"></div>
          <Button
            className={classes.button}
            onClick={documentViewerRedirect(id, fileName, url, email)}
          >
            {fileName}
          </Button>
        </>
      );
    }
    if (fileType == "image") {
      return (
        <>
          <iconify-icon
            data-icon="flat-color-icons:picture"
            class="blackicon"
            data-width="50"
            data-height="50"
          ></iconify-icon>
          <div className="spacer"></div>
          <Button
            className={classes.button}
            onClick={imageViewerRedirect(id, fileName, url, email)}
          >
            {fileName}
          </Button>
        </>
      );
    }
    if (fileType == "audio") {
      return (
        <>
          <iconify-icon
            data-icon="flat-color-icons:music"
            class="blackicon"
            data-width="50"
            data-height="50"
          ></iconify-icon>
          <Button
            className={classes.button}
            onClick={audioViewerRedirect(id, fileName, url, email)}
          >
            {fileName}
          </Button>
        </>
      );
    }
    if (fileType == "video") {
      return (
        <>
          <iconify-icon
            data-icon="flat-color-icons:video-file"
            class="blackicon"
            data-width="50"
            data-height="50"
          ></iconify-icon>
          <Button
            className={classes.button}
            onClick={videoViewerRedirect(id, fileName, url, email)}
          >
            {fileName}
          </Button>
        </>
      );
    }
  };

  const documentViewerRedirect = (id, fileName, url, email) => () => {
    history.push({
      pathname: "/documentviewer",
      state: [id, fileName, url, email],
    });
  };

  const imageViewerRedirect = (id, fileName, url, email) => () => {
    history.push({
      pathname: "/imageviewer",
      state: [id, fileName, url, email],
    });
  };

  const audioViewerRedirect = (id, fileName, url, email) => () => {
    history.push({
      pathname: "/audioviewer",
      state: [id, fileName, url, email],
    });
  };

  const videoViewerRedirect = (id, fileName, url, email) => () => {
    history.push({
      pathname: "/videoviewer",
      state: [id, fileName, url, email],
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rowDataBound = (args) => {
    console.log(args.data);
  };

  const uploadOnChange = (e) => {
    const extensions = [
      ".docx",
      ".pdf",
      ".txt",
      ".mp3",
      ".wav",
      ".mp4",
      ".avi",
      ".wmv",
      ".png",
      ".jpg",
      ".jpeg",
      ".bmp",
    ];
    var extension = e.target.files[0].name
      .substring(e.target.files[0].name.lastIndexOf("."))
      .toLowerCase();
    if (extensions.includes(extension) && e.target.files[0].size <= 10485760) {
      setFile(e.target.files[0]);
    } else {
      alert("Please choose a new valid file.");
    }
  };

  const uploadOnSubmit = (e) => {
    if (file != "") {
      e.preventDefault();
      let formData = new FormData();
      formData.append("email", email);
      formData.append("body", file);
      fetch("https://localhost:44327/UploadFile", {
        method: "POST",
        body: formData,
      })
        .then(() => getDatas())
        .catch((err) => console.log(err));

      alert("Upload Succeeded!");
      setOpen(false);
    } else {
      alert("Please choose your file.");
    }
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">
            <img src={documents} height="15" width="15" /> Rich Document
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <iconify-icon data-icon="clarity:search-line"></iconify-icon>
            </div>
            <InputBase
              id="inputSearch"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={searchOnChange}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={handleClickOpen}
            >
              <iconify-icon data-icon="bi:upload"></iconify-icon>
              <div className="spacer"></div>
              <Typography variant="h6">Upload Files</Typography>
            </IconButton>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <iconify-icon data-icon="carbon:user-avatar"></iconify-icon>
              <div className="spacer"></div>
              <Typography variant="h6">{displayName}</Typography>
            </IconButton>
          </div>
        </Toolbar>

        <Toolbar className="secondtoolbar">
          <FormControl className={classes.formControl}>
            <InputLabel shrink>Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              displayEmpty
              value={type}
              onChange={handleTypeChange}
            >
              <MenuItem value={""}>All My Files</MenuItem>
              <MenuItem value={"document"}>
                <InsertDriveFileOutlinedIcon fontSize="small" />
                Document
              </MenuItem>
              <MenuItem value={"image"}>
                <CropOriginalIcon fontSize="small" />
                Image
              </MenuItem>
              <MenuItem value={"audio"}>
                <MusicNoteIcon fontSize="small" />
                Audio
              </MenuItem>
              <MenuItem value={"video"}>
                <PlayCircleOutlineIcon fontSize="small" />
                Video
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink>Order By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderBy}
              onChange={handleOrderByChange}
            >
              <MenuItem value={"fileName"}>
                <DnsIcon fontSize="small" />
                File Name
              </MenuItem>
              <MenuItem value={"fileType"}>
                <MergeTypeIcon fontSize="small" />
                File Type
              </MenuItem>
              <MenuItem value={"lastModified"}>
                <ScheduleIcon fontSize="small" />
                Last Modified
              </MenuItem>
              <MenuItem value={"byteSize"}>
                <SdStorageIcon fontSize="small" />
                Byte Size
              </MenuItem>
              <MenuItem value={"url"}>
                <HttpIcon fontSize="small" />
                Object Url
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink>Order</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={order}
              onChange={handleOrderChange}
            >
              <MenuItem value={"asc"}>
                <ExpandLessIcon fontSize="small" />
                Ascending
              </MenuItem>
              <MenuItem value={"desc"}>
                <ExpandMoreIcon fontSize="small" />
                Descending
              </MenuItem>
            </Select>
          </FormControl>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={listViewOnClick}
            >
              <iconify-icon
                data-icon="fluent:text-bullet-list-ltr-20-regular"
                class="blackicon"
              ></iconify-icon>
              <div className="spacer"></div>
              <Typography className="view">List View</Typography>
            </IconButton>

            <IconButton
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={gridViewOnClick}
            >
              <iconify-icon
                data-icon="et:grid"
                class="blackicon"
              ></iconify-icon>
              <div className="spacer"></div>
              <Typography className="view">Grid View</Typography>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
      <div className={classes.offset} />
      <TreeGridComponent
        dataSource={datas}
        id="list"
        rowDataBound={rowDataBound}
      >
        <ColumnsDirective>
          <ColumnDirective width="30" />
          <ColumnDirective
            field="fileName"
            headerText="File Name"
            width="auto"
          />
          <ColumnDirective
            field="fileType"
            headerText="File Type"
            width="auto"
          />
          <ColumnDirective
            field="lastModified"
            headerText="Last Modified"
            width="auto"
            format="hh:mm:ss, MM/dd/yyyy"
            type="date"
          />
          <ColumnDirective
            field="byteSize"
            headerText="Byte Size"
            width="auto"
            type="number"
          />
          <ColumnDirective field="url" headerText="Object Url" width="auto" />
        </ColumnsDirective>
        <Inject services={[Sort, Filter]} />
      </TreeGridComponent>

      <div id="grid" class="grid" hidden>
        <Grid container>
          {datas.map((item) => {
            return (
              <>
                <Grid container item xs="2" alignItems="center">
                  {(() => {
                    return getItemForGrid(
                      item.id,
                      item.fileName,
                      item.fileType,
                      item.url
                    );
                  })()}
                </Grid>
              </>
            );
          })}
        </Grid>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose your file</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <li>
              Supported file extension: .docx, .pdf, .txt, .mp3, .wav, .mp4,
              .avi, .wmv, .png, .jpg, .jpeg, .bmp
            </li>
            <li>Maximum file upload size: 10MB</li>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <form onSubmit={uploadOnSubmit}>
            <input type="file" onChange={uploadOnChange} />
            <Button type="submit" color="primary">
              Upload
            </Button>
            <Button type="button" onClick={handleClose} color="secondary">
              Close
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
