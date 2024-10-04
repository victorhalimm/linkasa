import { Box, Button, TextField } from "@mui/material";
import React from "react";

const ChatInput = ({ onSend }) => {
    const [message, setMessage] = React.useState("");
    
    const handleChange = (event) => {
      setMessage(event.target.value);
    };
  
    const handleSend = () => {
      onSend(message);
      setMessage("");
    };
  
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={handleChange}
        />
        <Button variant="contained" sx={{ ml: 2 }} onClick={handleSend}>
          Send
        </Button>
      </Box>
    );
  };

export default ChatInput;