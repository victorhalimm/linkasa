import React, { useEffect, useState } from "react";
import {
  DialogContentText,
  TextField,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Timestamp } from "@firebase/firestore";
import { Flight, deleteFlight } from "../../lib/models/Flight";


const FlightForm = ({ onClose, onSubmit, onUpdate, flight}) => {
  const initialFlightData = {
    flightID: "",
    airlineName: "",
    origin: "",
    destination: "",
    flightStatus: "",
    boardingTime: null,
    arrivalTime: null,
  };

  const [flightData , setFlightData] = useState<Flight>(flight || initialFlightData);
  
  useEffect(() => {
    if (flight) {
      setFlightData({...flightData, flightID: flight.id})
    }
  })
  const handleDateTimeChange = (prop) => (newValue) => {
    setFlightData({ ...flightData, [prop]: newValue });
  };

  interface FlightFormErrors {
    flightID: string;
    airlineName: string;
    boardingTime: string;
    arrivalTime: string;
    origin: string;
    destination: string;
    flightStatus: string;
  }

  const [errors, setErrors] = useState<FlightFormErrors>({
    flightID: "",
    airlineName: "",
    boardingTime: "",
    arrivalTime: "",
    origin: "",
    destination: "",
    flightStatus: "",
  });

  // Step 2: Validation function
  const validate = () => {
    let tempErrors : FlightFormErrors = {
      flightID: flightData.flightID ? "" : "Flight ID is required",
      airlineName: flightData.airlineName ? "" : "Airline Name is required",
      origin: flightData.origin ? "" : "Origin is required",
      destination: flightData.destination ? "" : "Destination is required",
      flightStatus: flightData.flightStatus ? "" : "Status is required",
      boardingTime: flightData.boardingTime ? "" : "Boarding Time is required",
      arrivalTime: flightData.arrivalTime ? "" : "Arrival Time is required",
    };

    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleChange = (prop) => (event) => {
    setFlightData({ ...flightData, [prop]: event.target.value });
    setErrors({ ...errors, [prop]: "" });
  };

  const handleSubmit = () => {
    if (validate()) {

      if (flight) onUpdate(flightData)
      else onSubmit(flightData);
    }
  };


  const handleClose = () => {
    setFlightData(initialFlightData);

    onClose();
  }


  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DialogContent>
          <DialogContentText>
            Please fill in the details of the new flight.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Flight ID"
            error={!!errors.flightID}
            helperText={errors.flightID}
            type="text"
            fullWidth
            disabled={flight}
            variant="outlined"
            value={flightData.flightID}
            onChange={handleChange("flightID")}
          />
          <TextField
            margin="dense"
            label="Airline Name"
            error={!!errors.airlineName}
            helperText={errors.airlineName}
            type="text"
            fullWidth
            variant="outlined"
            value={flightData.airlineName}
            onChange={handleChange("airlineName")}
          />
          <TextField
            margin="dense"
            label="Origin"
            error={!!errors.origin}
            helperText={errors.origin}
            type="text"
            fullWidth
            variant="outlined"
            value={flightData.origin}
            onChange={handleChange("origin")}
          />
          <TextField
            margin="dense"
            label="Destination"
            error={!!errors.destination}
            helperText={errors.destination}
            type="text"
            fullWidth
            variant="outlined"
            value={flightData.destination}
            onChange={handleChange("destination")}
          />
          <TextField
            margin="dense"
            label="Status"
            error={!!errors.flightStatus}
            helperText={errors.flightStatus}
            type="text"
            fullWidth
            variant="outlined"
            value={flightData.flightStatus}
            onChange={handleChange("flightStatus")}
          />
          <DateTimePicker
            label="Boarding Time"
            value={flightData.boardingTime}
            onChange={handleDateTimeChange("boardingTime")}
          />

          <DateTimePicker
            label="Arrival Time"
            value={flightData.arrivalTime}
            onChange={handleDateTimeChange("arrivalTime")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </LocalizationProvider>
    </>
  );
};

export default FlightForm;
