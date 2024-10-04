import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  TableContainer,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  Select,
  DialogActions,
} from "@mui/material";
import TitleHeader from "../component/TitleHeader";
import { auth } from "../../../firebase/clientApp";
import dayjs from "dayjs";
import {
  deleteBroadcast,
  fetchGlobalChat,
  insertChat,
  updateBroadcast,
} from "../../lib/models/GlobalChat";
import theme from "../../lib/theme";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageBroadcast = () => {
  const [priority, setPriority] = useState("Low");
  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = React.useState(null);
  const [globalChats, setGlobalChats] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBroadcast, setSelectedBroadcast] = useState({
    id: "",
    message: "",
    priorityLevel: "",
    uid: ""
  });

  React.useEffect(() => {
    fetchGlobalChat().then((chats) => {
      setGlobalChats(chats);
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) return; // Avoid sending empty messages

    // Create your message data with priority
    const messageData = {
      message: message,
      createdAt: dayjs(), // Current time using Day.js
      uid: userUid,
      priorityLevel: priority,
    };

    // Send the message
    await insertChat(messageData);
    setMessage("");

    fetchGlobalChat().then((chats) => {
      setGlobalChats(chats);
    });
  };

  const handleDeleteBroadcast = async (broadcastId) => {
    await deleteBroadcast(broadcastId);

    // Update table
    fetchGlobalChat().then((chats) => {
      setGlobalChats(chats);
    });
  };

  const handleOpenDialog = (broadcast) => {
    setSelectedBroadcast(broadcast);
    setOpenDialog(true);
  };

  const handleUpdateBroadcast = async (broadcastId, priority, message, uid) => {
    await updateBroadcast(broadcastId, priority, message, uid);
    
    handleDialogClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);

    fetchGlobalChat().then((chats) => {
      setGlobalChats(chats);
    });
  };

  const BroadcastTable = ({ globalChats }) => {
    const getPriorityStyle = (priority) => {
      switch (priority) {
        case "Low":
          return {
            bgcolor: "green",
            color: "white",
            padding: theme.spacing(1),
            paddingX: theme.spacing(2),
            display: "inline-flex",
            borderRadius: "12px",
          };
        case "Medium":
          return {
            bgcolor: "orange",
            color: "white",
            padding: theme.spacing(1),
            paddingX: theme.spacing(2),
            display: "inline-flex",
            borderRadius: "12px",
          };
        case "High":
          return {
            bgcolor: "red",
            color: "white",
            padding: theme.spacing(1),
            paddingX: theme.spacing(2),
            display: "inline-flex",
            borderRadius: "12px",
          };
        default:
          return {};
      }
    };

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Message</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {globalChats.map((chat, index) => (
              <TableRow key={index}>
                <TableCell>{chat.message}</TableCell>
                <TableCell>{chat.user?.role || "Unknown"}</TableCell>
                <TableCell width={120}>
                  <Box sx={getPriorityStyle(chat.priorityLevel)}>
                    {chat.priorityLevel}
                  </Box>
                </TableCell>
                <TableCell width={120}>
                  <IconButton onClick={() => handleOpenDialog(chat)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteBroadcast(chat.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <React.Fragment>
      <TitleHeader title={"Manage Broadcast"} />
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(1),
        }}
      >
        <BroadcastTable globalChats={globalChats} />
        <Typography variant="h6" color="initial" fontWeight={600}>
          Broadcast Priority Level:
        </Typography>
        <Box sx={{ display: "flex", gap: 2, marginBottom: 7 }}>
          <Button
            variant={priority === "Low" ? "contained" : "outlined"}
            sx={{
              ...(priority === "Low" ? { bgcolor: "green" } : {}),
              "&:hover": {
                bgcolor: priority === "Low" ? "green" : "",
                "@media (hover: none)": { bgcolor: "transparent" },
              },
            }}
            onClick={() => setPriority("Low")}
          >
            Low Priority
          </Button>

          <Button
            variant={priority === "Medium" ? "contained" : "outlined"}
            sx={{
              ...(priority === "Medium" ? { bgcolor: "orange" } : {}),
              "&:hover": {
                bgcolor: priority === "Medium" ? "orange" : "",
                "@media (hover: none)": { bgcolor: "transparent" },
              },
            }}
            onClick={() => setPriority("Medium")}
          >
            Medium Priority
          </Button>

          <Button
            variant={priority === "High" ? "contained" : "outlined"}
            sx={{
              ...(priority === "High" ? { bgcolor: "red" } : {}),
              "&:hover": {
                bgcolor: priority === "High" ? "red" : "",
                "@media (hover: none)": { bgcolor: "transparent" },
              },
            }}
            onClick={() => setPriority("High")}
          >
            High Priority
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            fullWidth
            label="Broadcast Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={handleSendMessage}>
            Send
          </Button>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Update Broadcast</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={selectedBroadcast.priorityLevel}
            onChange={(e) =>
              setSelectedBroadcast({
                ...selectedBroadcast,
                priorityLevel: e.target.value,
              })
            }
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="Low">Low Priority</MenuItem>
            <MenuItem value="Medium">Medium Priority</MenuItem>
            <MenuItem value="High">High Priority</MenuItem>
          </Select>
          <TextField
            fullWidth
            multiline
            label="Broadcast Message"
            value={selectedBroadcast.message}
            onChange={(e) =>
              setSelectedBroadcast({
                ...selectedBroadcast,
                message: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={() => handleUpdateBroadcast(selectedBroadcast.id, selectedBroadcast.priorityLevel, selectedBroadcast.message, selectedBroadcast.uid)}>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ManageBroadcast;
