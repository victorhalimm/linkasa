import React, { useEffect, useState } from "react";
import TitleHeader from "../component/TitleHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import MaleAvatar from "../../../resources/male-pilot.jpg";
import FemaleAvatar from "../../../resources/female-pilot.jpg";
import Image from "next/image";
import {
  createPilot,
  createSteward,
  deletePilot,
  deleteSteward,
  getAllPilot,
  getAllSteward,
  updatePilot,
  updateSteward,
} from "../../lib/models/FlightCrew";
import theme from "../../lib/theme";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomAvatar = ({ src, alt, size = 50 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        display: "inline-block",
      }}
    >
      <Image src={src} alt={alt} width={size} height={size} objectFit="cover" />
    </div>
  );
};

const ManageFlightCrew = () => {
  const [pilots, setPilotsData] = useState([]);
  const [stewards, setStewardsData] = useState([]);
  const [newCrewDetails, setCrewDetails] = useState({
    availability: "",
    name: "",
    airlineName: "",
    yearsOfExp: "",
    gender: "",
    id: "",
  });

  const getAvatar = (gender) => {
    const maleAvatar = MaleAvatar;
    const femaleAvatar = FemaleAvatar;

    return gender === "male" ? maleAvatar : femaleAvatar;
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Available":
        return {
          backgroundColor: "green",
          color: "white",
          padding: theme.spacing(1),
          borderRadius: "12px",
          paddingX: theme.spacing(2),
          display: "inline-flex",
        };
      case "Unavailable":
        return {
          backgroundColor: "red",
          color: "white",
          padding: theme.spacing(1),
          borderRadius: "12px",
          paddingX: theme.spacing(2),
          display: "inline-flex",
        };
      case "Pending Training":
        return {
          backgroundColor: "yellow",
          color: "white",
          padding: theme.spacing(1),
          borderRadius: "12px",
          paddingX: theme.spacing(2),
          display: "inline-flex",
        };
      case "Personal Leave":
        return {
          backgroundColor: "darkblue",
          color: "white",
          padding: theme.spacing(1),
          borderRadius: "12px",
          paddingX: theme.spacing(2),
          display: "inline-flex",
        };
      default:
        return {};
    }
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "pilot" or "steward"

  // Function to handle dialog open
  const handleDialogOpen = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  // Function to handle dialog close
  const handleDialogClose = () => {
    
    setCrewDetails({
      availability: "",
      name: "",
      airlineName: "",
      yearsOfExp: "",
      gender: "",
      id: "",
    });
    setOpenDialog(false);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (dialogType === "pilot")
      createPilot(
        newCrewDetails.name,
        newCrewDetails.yearsOfExp,
        newCrewDetails.availability,
        newCrewDetails.gender,
        newCrewDetails.airlineName
      );
    else if (dialogType === "steward")
      createSteward(
        newCrewDetails.name,
        newCrewDetails.yearsOfExp,
        newCrewDetails.availability,
        newCrewDetails.gender,
        newCrewDetails.airlineName
      );
    else if (dialogType === "updatePilot") {
      updatePilot(
        newCrewDetails.id,
        newCrewDetails.name,
        newCrewDetails.yearsOfExp,
        newCrewDetails.availability,
        newCrewDetails.gender,
        newCrewDetails.airlineName
      );
    } else if (dialogType === "updateSteward") {
      updateSteward(
        newCrewDetails.id,
        newCrewDetails.name,
        newCrewDetails.yearsOfExp,
        newCrewDetails.availability,
        newCrewDetails.gender,
        newCrewDetails.airlineName
      );
    }

    // Refetch everytime submit
    const newData = await getAllPilot();
    setPilotsData(newData);
    const stewardsData = await getAllSteward();
    setStewardsData(stewardsData);

    handleDialogClose();
  };

  const handleUpdatePilot = (crewData) => {
    setCrewDetails({ ...crewData, name: crewData.pilotName });
    handleDialogOpen("updatePilot");
  };

  const handleUpdateSteward = (crewData) => {
    setCrewDetails({ ...crewData, name: crewData.stewardName });
    handleDialogOpen("updateSteward");
  };

  const handleRemovePilot = (crewId) => {
    deletePilot(crewId);
  };

  const handleRemoveSteward = (crewId) => {
    deleteSteward(crewId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const pilotsData = await getAllPilot();
      setPilotsData(pilotsData);
      const stewardsData = await getAllSteward();
      setStewardsData(stewardsData);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: theme.spacing(2) }}
      >
        <Box>
          <TitleHeader title={"Pilot & Co-Pilot"} />
          <TableContainer component={Paper}>
            <Table aria-label="flight crew table">
              <TableHead>
                <TableRow>
                  <TableCell>Picture</TableCell>
                  <TableCell>Pilot Name / Airline</TableCell>
                  <TableCell>Availability</TableCell>
                  <TableCell>Years of Experience</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pilots.map((crew, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <CustomAvatar
                        src={getAvatar(crew.gender)}
                        alt={crew.pilotName}
                      />
                    </TableCell>

                    <TableCell>
                      <div>{crew.pilotName}</div>
                      <div style={{ color: "gray", fontSize: "smaller" }}>
                        {crew.airlineName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Box sx={getStatusStyles(crew.availability)}>
                        {crew.availability}
                      </Box>
                    </TableCell>
                    <TableCell>{crew.yearsOfExp}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleUpdatePilot(crew)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleRemovePilot(crew.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <TitleHeader title={"Steward"} />
          <TableContainer component={Paper}>
            <Table aria-label="flight crew table">
              <TableHead>
                <TableRow>
                  <TableCell>Picture</TableCell>
                  <TableCell>Steward Name / Airline</TableCell>
                  <TableCell>Availability</TableCell>
                  <TableCell>Years of Experience</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stewards.map((crew, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <CustomAvatar
                        src={getAvatar(crew.gender)}
                        alt={crew.stewardName}
                      />
                    </TableCell>

                    <TableCell>
                      <div>{crew.stewardName}</div>
                      <div style={{ color: "gray", fontSize: "smaller" }}>
                        {crew.airlineName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Box sx={getStatusStyles(crew.availability)}>
                        {crew.availability}
                      </Box>
                    </TableCell>
                    <TableCell>{crew.yearsOfExp}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleUpdateSteward(crew)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleRemoveSteward(crew.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{ display: "flex", gap: theme.spacing(1) }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleDialogOpen("pilot")}
          >
            Add New Pilot
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleDialogOpen("steward")}
          >
            Add New Steward
          </Button>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={newCrewDetails.name}
            onChange={(e) =>
              setCrewDetails({ ...newCrewDetails, name: e.target.value })
            }
          />
          <TextField
            label="Airline"
            fullWidth
            margin="normal"
            value={newCrewDetails.airlineName}
            onChange={(e) =>
              setCrewDetails({ ...newCrewDetails, airlineName: e.target.value })
            }
          />
          <TextField
            label="Years of Experience"
            fullWidth
            margin="normal"
            value={newCrewDetails.yearsOfExp}
            onChange={(e) =>
              setCrewDetails({ ...newCrewDetails, yearsOfExp: e.target.value })
            }
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(1),
            }}
          >
            <FormControl fullWidth margin="normal">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                label="Gender"
                onChange={(e) =>
                  setCrewDetails({ ...newCrewDetails, gender: e.target.value })
                }
                value={newCrewDetails.gender}
                name="gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="availability-label">Availability</InputLabel>
              <Select
                labelId="availability-label"
                label="Availability"
                onChange={(e) =>
                  setCrewDetails({
                    ...newCrewDetails,
                    availability: e.target.value,
                  })
                }
                value={newCrewDetails.availability}
                name="availability"
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Pending Training">Pending Training</MenuItem>
                <MenuItem value="Unavailable">Unavailable</MenuItem>
                <MenuItem value="Personal Leave">Personal Leave</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ManageFlightCrew;
