import React from "react";
import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField
} from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const HeadersTable = ({ data, edit, create, del }) => {
  const handleHeaderKey = (e, kv, ndx) => {
    edit(ndx, { ...kv, key: e.target.value });
  };
  const handleHeaderValue = (e, kv, ndx) => {
    edit(ndx, { ...kv, value: e.target.value });
  };
  return (
    <TableContainer
      sx={{
        height: "fit-content"
      }}
      component={Paper}
    >
      <Table
        sx={{
          height: "max-content"
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Value</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, i) => {
              return (
                <TableRow key={i} hover>
                  <TableCell>
                    <TextField
                      size="small"
                      fullWidth
                      value={row.key}
                      InputProps={{ style: { fontFamily: "consolas" } }}
                      onChange={(e) => handleHeaderKey(e, row, i)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      fullWidth
                      value={row.value}
                      InputProps={{ style: { fontFamily: "consolas" } }}
                      onChange={(e) => handleHeaderValue(e, row, i)}
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => del(i)}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow />
          )}
        </TableBody>
      </Table>
      <Fab
        onClick={create}
        size="small"
        color={"primary"}
        sx={{ float: "right", margin: 2 }}
      >
        <AddIcon />
      </Fab>
    </TableContainer>
  );
};

export default HeadersTable;
