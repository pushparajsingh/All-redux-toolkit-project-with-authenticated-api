import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import {
  Delete,
  getPost,
  postData,
  updateData,
  viewData,
} from "../redux/UserSlice";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const Dispatch = useDispatch();
  const showData = useSelector((state) => state?.data);
  const singleData = useSelector((state) => state?.singledata);
  const del = useSelector((state) => state?.del);
  const updatepost = useSelector((state) => state?.updatecheck);
  const open = Boolean(anchorEl);
  const [o, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloses = () => setOpen(false);
  const [viewUpdateCheck, setviewUpdateCheck] = useState();
  const [Text, settext] = useState("");
  const [ids, setId] = useState();
  const [post, setpost] = useState({
    name: "",
    age: "",
    city: "",
  });
  useEffect(() => {
    Dispatch(getPost());
  }, [del, updatepost]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // function createData(Id, Name, Age, City) {
  //   return { Id, Name, Age, City };
  // }
  // const rows = [
  //   showData.map((item) => createData(item.id, item.name, item.age, item.city)),
  // ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem
                onClick={() => {
                  sessionStorage.clear();
                  handleClose();
                  window.location.href = "/login";
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
      <div>
        <div className="sidebar">
          <h1 className="txt">Information</h1>
          <ul className="list">
            <li>
              <h2>User Shows</h2>
            </li>
            <li>
              <h2>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    handleOpen();
                    setviewUpdateCheck("falsetrue");
                  }}
                >
                  Create Post
                </Button>
              </h2>
            </li>
          </ul>
        </div>

        <div className="centerimage">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Id</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Age</StyledTableCell>
                  <StyledTableCell>City</StyledTableCell>
                  <StyledTableCell>
                    <span style={{ marginLeft: "93px" }}>Action</span>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showData?.map((item, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="item">
                      {item._id}
                    </StyledTableCell>
                    <StyledTableCell>{item.name}</StyledTableCell>
                    <StyledTableCell>{item.age}</StyledTableCell>
                    <StyledTableCell>{item.city}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => {
                          Dispatch(viewData(item._id));
                          handleOpen();
                          setviewUpdateCheck(true);
                        }}
                      >
                        View
                      </Button>{" "}
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          handleOpen();
                          setId(item._id);
                          setviewUpdateCheck(false);
                        }}
                      >
                        Update
                      </Button>{" "}
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          Dispatch(Delete(item._id));
                        }}
                      >
                        Delete
                      </Button>{" "}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            {!showData && <h3>Api Not Working , Sorry !</h3>}
          </TableContainer>
        </div>
        <Modal
          open={o}
          onClose={handleCloses}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Welcome to Model
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {viewUpdateCheck == true ? (
                <div>
                  <h2>Single Id Details</h2>
                  <span className="text">Id:-</span>
                  <span> {singleData._id}</span>
                  <br />
                  <span className="text">Name:-</span>
                  <span> {singleData.name}</span>
                  <br />
                  <span className="text">Age:-</span>
                  <span> {singleData.age}</span>
                  <br />
                  <span className="text">City:-</span>
                  <span> {singleData.city}</span>
                  <br />
                </div>
              ) : viewUpdateCheck == false ? (
                <div>
                  <h2>Update the data here</h2>
                  <input
                    type={"text"}
                    value={Text}
                    onChange={(e) => settext(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      handleCloses();
                      console.log(Text);
                      Dispatch(updateData({ ids, Text }));
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h2>Create the Post</h2>
                  <table cellPadding={10}>
                    <tr>
                      {" "}
                      <td>
                        <label>Name </label>
                      </td>
                      <td>
                        <input
                          type={"text"}
                          value={post.name}
                          onChange={(e) =>
                            setpost({ ...post, name: e.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        <label>Age </label>
                      </td>
                      <td>
                        <input
                          type={"text"}
                          value={post.age}
                          onChange={(e) =>
                            setpost({ ...post, age: e.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        <label>City </label>
                      </td>
                      <td>
                        <input
                          type={"text"}
                          value={post.city}
                          onChange={(e) =>
                            setpost({ ...post, city: e.target.value })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <Button
                          variant="outlined"
                          color="warning"
                          id="btn_right"
                          onClick={() => {
                            Dispatch(postData({ ...post }));
                            handleCloses();
                          }}
                        >
                          Post
                        </Button>
                      </td>
                    </tr>
                  </table>
                </div>
              )}
            </Typography>
          </Box>
        </Modal>
        <div style={{ clear: "both" }}></div>
      </div>
    </div>
  );
};

export default Dashboard;
