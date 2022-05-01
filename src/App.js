import "./App.css";
import {
  Grid,
  FormControl,
  MenuItem,
  TextField,
  Select,
  Container,
  InputLabel,
  Button,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions
} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import SendIcon from "@mui/icons-material/Send";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Badge from "@mui/material/Badge";

import React from "react";
import Request from "./Request";
import HeadersTable from "./HeadersTable";
import Sidebar from "./Sidebar";
import SaveIcon from "@mui/icons-material/Save";

const reqTypes = ["GET", "POST", "DELETE", "PUT", "PATCH"];
// const combinations = [{ "[": "]" }, { "{": "}" }, { "(": ")" }];
const defaultHeaders = [
  { key: "Accept", value: "*/*" },
  { key: "Content-Type", value: "application/json" },
  { key: "Access-Control-Allow-Origin", value: "*" }
];

function App() {
  const [reqType, setReqType] = React.useState("GET");
  const handleReqType = (e) => {
    setReqType(e.target.value);
  };

  const [url, setUrl] = React.useState("");
  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const [headers, setHeaders] = React.useState(defaultHeaders);
  const handleHeaderChange = (ndx, header) => {
    let temp = [...headers];
    temp[ndx] = header;
    setHeaders([...temp]);
  };
  const handleNewHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };
  const handleDeleteHeader = (ndx) => {
    let temp = [...headers.slice(0, ndx), ...headers.slice(ndx + 1)];
    setHeaders(temp);
  };

  const [body, setBody] = React.useState("");
  const handleBody = (e) => {
    setBody(e.target.value);
  };

  const reformat = () => {
    try {
      setBody(JSON.stringify(JSON.parse(body), null, 4));
    } catch (err) {}
    try {
      setResult(JSON.stringify(JSON.parse(result), null, 4));
    } catch (err) {}
  };

  const [result, setResult] = React.useState("");
  const resRef = React.useRef(null);
  const sendRequest = async () => {
    let payload = {};
    headers.forEach((h) => {
      if (h.key !== "" && h.value !== "") payload[h.key] = h.value;
    });
    switch (reqType) {
      case "GET":
        await Request.GET(url, headers, body, setResult);
        break;
      case "POST":
        await Request.POST(url, headers, body, setResult);
        break;
      case "DELETE":
        await Request.DELETE(url, headers, body, setResult);
        break;
      case "PUT":
        await Request.PUT(url, headers, body, setResult);
        break;
      case "PATCH":
        await Request.PATCH(url, headers, body, setResult);
        break;
      default:
        console.error("Invalid Request!");
        break;
    }
    resRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [open, setOpen] = React.useState(false);
  const [savedReq, setSavedReq] = React.useState([]);
  const getSavedRequests = () => {
    let saved = localStorage.getItem("savedReq");
    if (saved) {
      setSavedReq(JSON.parse(saved));
    }
  };
  const [reqName, setReqName] = React.useState("");
  const [saveDialog, setSaveDialog] = React.useState(false);
  const deleteSavedRequest = (ndx) => {
    let temp = [...savedReq.slice(0, ndx), ...savedReq.slice(ndx + 1)];
    setSavedReq(temp);
    localStorage.setItem("savedReq", JSON.stringify(temp));
  };
  const loadSavedRequest = (ndx) => {
    const req = savedReq[ndx];
    setReqType(req.type);
    setBody(req.body);
    setUrl(req.url);
    setHeaders(req.headers);
  };
  const saveRequest = () => {
    const req = {
      name: reqName,
      type: reqType,
      url: url,
      body: body,
      headers: headers
    };
    //Append this to existing requests
    const temp = [...savedReq, req];
    localStorage.setItem("savedReq", JSON.stringify(temp));
    setSavedReq(temp);
  };

  React.useEffect(() => {
    getSavedRequests();
  }, []);

  return (
    <div className="App">
      <Box
        className="Header"
        fullWidth
        sx={{ backgroundColor: "#1769aa", color: "white" }}
      >
        <Sidebar
          open={open}
          setOpen={setOpen}
          data={savedReq}
          loadReq={loadSavedRequest}
          deleteReq={deleteSavedRequest}
        />
      </Box>
      <Container>
        <Grid columns={10} my={2} container spacing={2} justifyContent="left">
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select value={reqType} label="Type" onChange={handleReqType}>
                {reqTypes.map((req) => (
                  <MenuItem key={req} value={req}>
                    {req}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField
              placeholder="URL"
              fullWidth
              value={url}
              onChange={(e) => handleUrl(e)}
              onKeyUp={(e) => handleUrl(e)}
              spellCheck="false"
              InputProps={{ style: { fontFamily: "consolas" } }}
            />
          </Grid>
          <Grid item xs={5} mr={5}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Badge badgeContent={headers.length} color="primary">
                  <Typography>Headers</Typography>
                </Badge>
              </AccordionSummary>
              <AccordionDetails>
                <HeadersTable
                  data={headers}
                  edit={handleHeaderChange}
                  create={handleNewHeader}
                  del={handleDeleteHeader}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={10}>
            <TextField
              multiline
              fullWidth
              minRows={5}
              maxRows={15}
              value={body}
              onChange={handleBody}
              onKeyUp={handleBody}
              spellCheck="false"
              InputProps={{ style: { fontFamily: "consolas" } }}
              placeholder="JSON"
            />
          </Grid>
          <Grid item xs={10}>
            <Button
              onClick={reformat}
              variant="outlined"
              startIcon={<FormatAlignCenterIcon />}
            >
              Reformat
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Button
              variant="contained"
              onClick={sendRequest}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Grid>
          <Grid item xs={10} hidden={result.length === 0}>
            <TextField
              multiline
              fullWidth
              minRows={5}
              maxRows={15}
              disabled
              value={result}
              spellCheck="false"
              InputProps={{ style: { fontFamily: "consolas" } }}
            />
          </Grid>
          <Grid ref={resRef} item xs={10} hidden={result.length === 0}>
            <Button
              variant="contained"
              onClick={() => setSaveDialog(true)}
              endIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Dialog open={saveDialog} onClose={() => setSaveDialog(false)}>
        <DialogTitle>Save Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please name the request to store the request locally.
          </DialogContentText>
          <TextField
            autoFocus
            type="text"
            fullWidth
            variant="standard"
            placeholder="Request Name"
            onChange={(e) => setReqName(e.target.value)}
            onKeyUp={(e) => setReqName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              saveRequest();
              setSaveDialog(false);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
