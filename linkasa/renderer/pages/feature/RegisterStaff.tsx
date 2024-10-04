import ViewEmployee from "../component/ViewEmployee";
import * as React from 'react';
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../../firebase/clientApp";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RegisterStaffDialog from "../component/RegisterStaffDialog";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { AlertColor } from "@mui/material/Alert/Alert";

const RegisterStaff = () => {
    const [allUsers, setAllUsers] = React.useState([]); // State to store all users
    const [openDialog, setOpenDialog] = React.useState(false);

    React.useEffect(() => {
    // Function to fetch all users
    const fetchUsers = async () => {
      try {
        // Reference to the users collection
        const usersRef = collection(db, "user"); 
        const querySnapshot = await getDocs(usersRef);
        const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllUsers(usersList); 
        console.log(usersList)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [openDialog]);

    const handleDialog = () => {
      setOpenDialog(!openDialog);
    }

    const [alertStatus, setAlertStatus] = React.useState<{
      open: boolean;
      severity: AlertColor;
      message: string;
    }>({
      open: false,
      severity: 'success', // 'error', 'info', or 'warning' could also be used here
      message: '',
    });


    
    return (
        <>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '2vh'}}>
                <ViewEmployee users={allUsers}/>
                <Button variant="contained" sx={{width: '15vw'}} onClick={handleDialog}>CREATE NEW EMPLOYEE</Button>
                <RegisterStaffDialog open={openDialog} onClose={handleDialog} setAlertStatus={setAlertStatus}/>
            </Box>
            <Snackbar
              open={alertStatus.open}
              autoHideDuration={1000} // Alert shows for 1 second
              onClose={() => setAlertStatus({ ...alertStatus, open: false })}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Alert 
                onClose={() => setAlertStatus({ ...alertStatus, open: false })}
                severity={alertStatus.severity}
                sx={{ width: '100%' }}
              >
                {alertStatus.message}
              </Alert>
            </Snackbar>
        </>
    )
}

export default RegisterStaff;