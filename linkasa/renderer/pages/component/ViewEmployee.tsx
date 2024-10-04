import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  IconButton,
} from "@mui/material";
import theme from "../../lib/theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteEmployee } from "../../lib/models/Employee";

const ViewEmployee = ({ users }) => {
  const handleEdit = (employee) => {
    console.log("Edit:", employee);
  };

  const handleDelete = async (employee) => {
    await deleteEmployee(employee.id)
  };

  return (
    <TableContainer component={Card}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((employee, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {employee.username}
              </TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(employee)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(employee)}>
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

export default ViewEmployee;
