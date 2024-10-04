import React, { useState } from "react";
import { Box, Button, Divider, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import theme from "../../lib/theme";
import ChatHistory from "../component/ChatHistory";
import { departmentChatRoles } from "../../lib/models/Employee";
import { sendMessageByRole } from "../../lib/models/DepartmentChat";

const DepartmentChat = ({currRole}) => {
    const [selectedContactIndex, setSelectedContactIndex] = useState(null);

    const handleListItemClick = (index) => {
        setSelectedContactIndex(index);
    };

    const getListItemBgColor = (index) => {
        if (index === selectedContactIndex) {
            return theme.palette.secondary.main; // Color for selected item
        }
        return index % 2 === 0 ? theme.palette.action.hover : theme.palette.background.paper;
    };

    const filteredChatRoles = departmentChatRoles.filter(role => role !== currRole);

    return (
        <React.Fragment>
            <Box sx={{
                width: '100%',
                bgcolor: 'background.paper',
                padding: theme.spacing(2),
                borderRadius: theme.spacing(2),
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(1),
                height: '100vh'
            }}>
                <Typography fontWeight={600} variant="h5" color="initial">Department Chat</Typography>
                <Divider />
                <Box sx={{ display: 'flex', width: '100%', height: '92%' }}>
                    {/* Contacts List */}
                    <Box sx={{
                        width: '30%',
                        bgcolor: 'background.paper',
                        overflowY: 'auto',
                        borderRight: 1,
                        borderColor: 'divider',
                        height: '100%'
                    }}>
                        <List>
                            {filteredChatRoles.map((contact, index) => (
                                <ListItem
                                    button
                                    key={contact}
                                    sx={{ bgcolor: getListItemBgColor(index) }}
                                    onClick={() => handleListItemClick(index)}
                                >
                                    <ListItemText primary={contact} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Divider orientation="vertical" />

                    {/* Chat Area */}
                    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
                        <ChatHistory senderRole={currRole} receiverRole={filteredChatRoles[selectedContactIndex]}/>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default DepartmentChat;
