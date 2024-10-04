import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogActions,
  Box,
  IconButton,
} from "@mui/material";
import {
  createSecurityLog,
  getAllSecurityLog,
  removeSecurityLog,
  updateSecurityLog,
} from "../../lib/models/SecurityLog";
import theme from "../../lib/theme";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TitleHeader from "../component/TitleHeader";

const ManageSecurityLog = () => {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({
    name: "",
    description: "",
    location: "",
    time: "",
    id: ''
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [formState, setFormState] = useState('');
  const [selectedId, setSelectedId] = useState('')

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSubmitLog = async () => {
    try {
      const timestamp = dayjs(newLog.time);

      if (formState === 'update') {
        await updateSecurityLog(
            newLog.id,
            newLog.name,
            newLog.description,
            timestamp,
            newLog.location
        );
      }

      else {
          await createSecurityLog(
            newLog.name,
            newLog.description,
            timestamp,
            newLog.location
          );
      }

      // Optional: Fetch logs again to update the list
      const updatedLogs = await getAllSecurityLog();
      setLogs(updatedLogs);

      handleDialogClose();
      setNewLog({ name: "", description: "", location: "", time: "" , id: ""});
      setSelectedId('');
      setFormState('');
    } catch (error) {
      console.log("Error adding new log:", error);
    }
  };

  const handleEditLog = (log) => {
    setNewLog(log);
    handleDialogOpen();
    
    setFormState('update');
  };

  const handleRemoveLog = async (logId) => {
    removeSecurityLog(logId);

    // Optional: Fetch logs again to update the list
    const updatedLogs = await getAllSecurityLog();
    setLogs(updatedLogs);
  };

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const logs = await getAllSecurityLog();
        setLogs(logs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLog();
  }, []);

  return (
    <React.Fragment>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: theme.spacing(1) }}
      >
        <TitleHeader title={'Manage Security Log'}/>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Incident Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Time of Occurrence</TableCell>
                <TableCell>Action</TableCell> {/* New column for actions */}
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.name}</TableCell>
                  <TableCell>{log.description}</TableCell>
                  <TableCell>{log.location}</TableCell>
                  <TableCell>{log.time}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditLog(log)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleRemoveLog(log.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          sx={{
            width: "200px",
            paddingX: theme.spacing(2),
            padding: theme.spacing(1),
          }}
          variant="contained"
          onClick={handleDialogOpen}
        >
          Add New Incident
        </Button>
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Add New Incident Log</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Incident Name"
              fullWidth
              variant="outlined"
              value={newLog.name}
              onChange={(e) => setNewLog({ ...newLog, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              variant="outlined"
              value={newLog.description}
              onChange={(e) =>
                setNewLog({ ...newLog, description: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Location"
              fullWidth
              variant="outlined"
              value={newLog.location}
              onChange={(e) =>
                setNewLog({ ...newLog, location: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Time of Occurrence"
              type="datetime-local"
              fullWidth
              variant="outlined"
              value={newLog.time}
              onChange={(e) => setNewLog({ ...newLog, time: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleSubmitLog}>Add</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </React.Fragment>
  );
};

export default ManageSecurityLog;
