import React from "react";
import {
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = ({ open, setOpen, data, loadReq, deleteReq }) => {
  return (
    <Toolbar>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
        sx={{ marginRight: "8rem" }}
      >
        <MenuIcon fontSize="large" htmlColor="white" />
      </IconButton>
      <Typography
        textAlign={"center"}
        py={2}
        fontSize={"xx-large"}
        fontFamily={"fantasy"}
      >
        R.E.S.T. In Peace
      </Typography>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{ width: "fit-content" }}
      >
        <Box backgroundColor={"#1769aa"} paddingX={5} paddingY={2}>
          <Typography
            textAlign={"center"}
            fontSize={"xx-large"}
            fontFamily={"fantasy"}
            color={"white"}
          >
            Saved Requests
          </Typography>
        </Box>
        <Box>
          <List>
            {data.map((item, i) => {
              return (
                <ListItem
                  key={item.name}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <ListItemText primary={item.name} secondary={item.type} />
                  <ListItemIcon
                    onClick={() => deleteReq(i)}
                    sx={{ cursor: "pointer" }}
                  >
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemIcon
                    onClick={() => loadReq(i)}
                    sx={{ cursor: "pointer" }}
                  >
                    <ArrowCircleRightIcon />
                  </ListItemIcon>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Toolbar>
  );
};

export default Sidebar;
