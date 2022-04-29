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
  AccordionSummary
} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import SendIcon from "@mui/icons-material/Send";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Badge from "@mui/material/Badge";

import React from "react";
import Request from "./Request";
import HeadersTable from "./HeadersTable";

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
    console.log();
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
  const sendRequest = () => {
    let payload = {};
    headers.forEach((h) => {
      if (h.key !== "" && h.value !== "") payload[h.key] = h.value;
    });

    // console.log(reqType, url, headers, body);
    switch (reqType) {
      case "GET":
        Request.GET(url, headers, body, setResult);
        break;
      case "POST":
        Request.POST(url, headers, body, setResult);
        break;
      case "DELETE":
        Request.DELETE(url, headers, body, setResult);
        break;
      case "PUT":
        Request.PUT(url, headers, body, setResult);
        break;
      case "PATCH":
        Request.PATCH(url, headers, body, setResult);
        break;
      default:
        console.error("Invalid Request!");
        break;
    }
    resRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <Box
        className="Header"
        fullWidth
        sx={{ backgroundColor: "#1769aa", color: "white" }}
      >
        <Typography
          textAlign={"center"}
          py={2}
          fontSize={"xx-large"}
          fontFamily={"fantasy"}
        >
          R.E.S.T. In Peace
        </Typography>
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
              onChange={handleUrl}
              onKeyUp={handleUrl}
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
          <Grid ref={resRef} item xs={10} hidden={result.length === 0}>
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
        </Grid>
      </Container>
    </div>
  );
}

export default App;
