import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import React from 'react';
import { collection, doc, setDoc } from "firebase/firestore"; 
import { db } from "../../../firebase/clientApp";
import { Employee, availableRoles} from "../../lib/models/Employee"
import { auth } from "../../../firebase/clientApp";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { SelectChangeEvent } from "@mui/material/Select";

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    setAlertStatus : ({}) => void;
}

const RegisterStaffDialog = (props : SimpleDialogProps) => {

    const { onClose, open } = props;

    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleRoleChange = (event: SelectChangeEvent<string>) => {
        setRole(event.target.value as string);
    };

    const handleFormSubmit = async () => {
        
        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            // Create a new employee object with the user's uid, email, username, and role
            const newEmployee = new Employee(userCredential.user.uid, email, username, password, role);
            
            if (userCredential) { 
                setDoc(doc(db, "user", userCredential.user.uid), {
                    email: newEmployee.email,
                    username: newEmployee.username,
                    role: newEmployee.role,
                });

                props.setAlertStatus({
                    open: true,
                    severity: 'success',
                    message: 'Employee successfully registered!',
                });
            }
            
            clearForm();
            onClose(); 
        } catch (error) {

            props.setAlertStatus({
                open: true,
                severity: 'error',
                message: 'Email is already in use!',
            });

            console.error("Error adding document: ", error);
        }
    };

    const clearForm = () => {
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('');
    }


    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Register New Employee</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                />
                <TextField
                margin="dense"
                id="username"
                label="Username"
                type="text"
                fullWidth
                variant="outlined"
                value={username}
                onChange={handleUsernameChange}
                />
                <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                />
                <FormControl fullWidth margin="dense">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                    labelId="role-label"
                    id="role"
                    value={role}
                    label="Role"
                    onChange={handleRoleChange}
                >
                    {availableRoles.map((val) => {
                        return (
                            <MenuItem value={val}>{val}</MenuItem>
                        )
                    })}
                </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleFormSubmit}>Register</Button>
            </DialogActions>
    </Dialog>

    )
}

export default RegisterStaffDialog;