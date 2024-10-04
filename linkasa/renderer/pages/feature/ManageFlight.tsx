import { useEffect, useState } from "react";
import * as Flight from "../../lib/models/Flight";
import theme from "../../lib/theme";
import TitleHeader from "../component/TitleHeader";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Timestamp, collection } from "@firebase/firestore";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import FlightForm from "../component/FlightForm";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ManageFlight = (props) => {
  const [flights, setFlights] = useState([]);
  const [viewOnly, setViewOnly] = useState(props.viewOnly || false);

  const formatDate = (fbTimestamp: Timestamp) => {
    if (fbTimestamp) {
      const date = fbTimestamp.toDate();
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }

    return "";
  };

  const [editingFlight, setEditingFlight] = useState(null);

  const handleFlightSubmit = (flightData: Flight.Flight) => {
    console.log(flightData);

    Flight.addFlight(flightData);


    // refetch data on table
    Flight.getFlights().then((flightsData) => {
      setFlights(flightsData);
    });
    handleClose();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleMenuClick = (event, flight) => {
    setAnchorEl(event.currentTarget);
    setSelectedFlight(flight);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFlight(null);
  };

  // Kalo conditional rendering gini pake switch case bagus nice
  const getStatusStyles = (status) => {
    switch (status) {
      case "ARRIVED":
        return {
          backgroundColor: "green",
          color: "white",
          padding: theme.spacing(0.3),
          borderRadius: "12px",
        };
      case "CANCELLED":
        return {
          backgroundColor: "red",
          color: "white",
          padding: theme.spacing(0.3),
          borderRadius: "12px",
        };
      case "DELAYED":
        return {
          backgroundColor: "yellow",
          color: "white",
          padding: theme.spacing(0.3),
          borderRadius: "12px",
        };
      case "IN-TRANSIT":
        return {
          backgroundColor: "darkblue",
          color: "white",
          padding: theme.spacing(0.3),
          borderRadius: "12px",
        };
      default:
        return {};
    }
  };

  const [open, setOpen] = useState(false);

  const handleCreateFlight = () => {
    setEditingFlight(null);

    handleOpen();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (flight) => {
    setEditingFlight(flight);
    handleOpen();
  };

  const handleFlightUpdate = (flight: Flight.Flight) => {
    Flight.updateFlight(flight.flightID, flight);

    Flight.getFlights().then((flightsData) => {
      setFlights(flightsData);
    });
    handleClose();
  };

  const handleDelete = (flightID) => {
    Flight.deleteFlight(flightID);

    Flight.getFlights().then((flightsData) => {
      setFlights(flightsData);
    });
  };

  useEffect(() => {
    Flight.getFlights().then((flightsData) => {
      setFlights(flightsData);
    });
  }, []);

  return (
    <>
      <TitleHeader title="Flight Schedule" />
      <TableContainer component={Paper} sx={{ marginTop: theme.spacing(-0.5) }}>
        <Table aria-label="flight schedule table">
          <TableHead>
            <TableRow>
              <TableCell>Flight ID / Airline</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Boarding Time</TableCell>
              <TableCell>Arrival Time</TableCell>
              <TableCell>Status</TableCell>
              {!viewOnly && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>
                  <Typography
                    sx={{
                      color: theme.palette.primary.dark,
                      fontWeight: "550",
                    }}
                  >
                    {flight.id}
                  </Typography>
                  <Typography sx={{ color: theme.palette.primary.light }}>
                    {flight.airlineName}
                  </Typography>
                </TableCell>
                <TableCell>{flight.origin}</TableCell>
                <TableCell>{flight.destination}</TableCell>
                <TableCell>{formatDate(flight.boardingTime)}</TableCell>
                <TableCell>{formatDate(flight.arrivalTime)}</TableCell>
                <TableCell>
                  <Box sx={getStatusStyles(flight.flightStatus)}>
                    <Typography sx={{ fontWeight: "550", textAlign: "center" }}>
                      {flight.flightStatus}
                    </Typography>
                  </Box>
                </TableCell>
                {!viewOnly && (
                  <TableCell>
                    <IconButton
                      aria-label="more"
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={(e) => handleMenuClick(e, flight)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!viewOnly && (
        <Button
          variant="contained"
          sx={{ marginY: theme.spacing(2) }}
          onClick={handleCreateFlight}
        >
          <Typography sx={{ fontWeight: "600" }}>
            Create flight schedule
          </Typography>
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Flight</DialogTitle>
        <DialogContent>
          <FlightForm
            onUpdate={handleFlightUpdate}
            onClose={handleClose}
            onSubmit={handleFlightSubmit}
            flight={editingFlight}
          />
        </DialogContent>
      </Dialog>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            /* Add logic for Assign Crew */ handleMenuClose();
          }}
        >
          Assign Crew
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleEdit(selectedFlight);
            handleMenuClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete(selectedFlight.id);
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default ManageFlight;
