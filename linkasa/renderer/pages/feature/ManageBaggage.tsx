import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  DialogActions,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TitleHeader from "../component/TitleHeader";
import {
  createBaggageData,
  deleteBaggageData,
  getBaggageData,
  updateBaggageData,
} from "../../lib/models/BaggageData";

const ManageBaggage = () => {
  const [baggageData, setBaggageData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newBaggage, setNewBaggage] = useState({
    weight: "",
    width: "",
    height: "",
    status: "",
    passengerName: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const handleDelete = async (baggage) => {
    // Implement the logic to handle the delete action
    try {
      await deleteBaggageData(baggage.id);

      // fetch data after delete
      const baggages = await getBaggageData();
      setBaggageData(baggages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    // Optionally reset the newBaggage state here if needed
  };

  const handleSubmitBaggage = async () => {
    // Implement logic to add new baggage

    if (formStatus === "update") {
      updateBaggageData(newBaggage);
    } else createBaggageData(newBaggage);

    handleDialogClose();
    setNewBaggage({
      weight: "",
      width: "",
      height: "",
      status: "",
      passengerName: "",
    });
    setFormStatus("");
    
    const baggages = await getBaggageData();
    setBaggageData(baggages);
  };

  const handleEdit = (baggage) => {
    setNewBaggage(baggage);
    setFormStatus("update");
    handleDialogOpen();
  };

  useEffect(() => {
    const fetchBaggageData = async () => {
      try {
        const baggages = await getBaggageData();

        console.log(baggages);
        setBaggageData(baggages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBaggageData();
  }, []);
  return (
    <React.Fragment>
      <TitleHeader title={"Manage Baggage"} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Weight</TableCell>
              <TableCell>Width</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Passenger Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {baggageData.map((baggage, index) => (
              <TableRow key={index}>
                <TableCell>{baggage.weight} kg</TableCell>
                <TableCell>{baggage.width} m</TableCell>
                <TableCell>{baggage.height} m</TableCell>
                <TableCell>{baggage.status}</TableCell>
                <TableCell>{baggage.passengerName}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(baggage)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(baggage)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={handleDialogOpen}>
        Add New Baggage
      </Button>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Baggage</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Weight (kg)"
            fullWidth
            variant="outlined"
            value={newBaggage.weight}
            onChange={(e) =>
              setNewBaggage({ ...newBaggage, weight: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Width (m)"
            fullWidth
            variant="outlined"
            value={newBaggage.width}
            onChange={(e) =>
              setNewBaggage({ ...newBaggage, width: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Height (m)"
            fullWidth
            variant="outlined"
            value={newBaggage.height}
            onChange={(e) =>
              setNewBaggage({ ...newBaggage, height: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Status"
            fullWidth
            variant="outlined"
            value={newBaggage.status}
            onChange={(e) =>
              setNewBaggage({ ...newBaggage, status: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Passenger Name"
            fullWidth
            variant="outlined"
            value={newBaggage.passengerName}
            onChange={(e) =>
              setNewBaggage({ ...newBaggage, passengerName: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmitBaggage}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ManageBaggage;
