import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import theme from "../../lib/theme";
import {
  getMessagesByRole,
  sendMessageByRole,
} from "../../lib/models/DepartmentChat";
import { Timestamp, serverTimestamp } from "@firebase/firestore";

const ChatHistory = ({ senderRole, receiverRole }) => {
  // SISA RAPIIN DIKIT LAGI TAPI FUNGSIONALITAS UDA OKE SI OHYES
  
  const [chatMessages, setChatMessages] = useState([]);

  const [messageVal, setMessageVal] = useState("");

  // const [updateChat, setUpdateChat] = useState(0);

  interface IMessage {
    id: string;
    text: string;
    timestamp: Timestamp;
  }

  const handleMessageSend = async () => {
    if (messageVal.trim()) {
      await sendMessageByRole(senderRole, receiverRole, messageVal);
  
      const newMessage = {
        text: messageVal,
        senderRole: senderRole,
        timestamp: serverTimestamp()
      };
  
      
      setChatMessages(prevMessages => [...prevMessages, newMessage]);
      setMessageVal("");
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessagesByRole(senderRole, receiverRole);

      const sortedMessages = messages.sort((a, b) => {
        // Check if timestamps exist and handle potential null values
        const timeA = a.timestamp ? a.timestamp.toMillis() : 0;
        const timeB = b.timestamp ? b.timestamp.toMillis() : 0;
        return timeA - timeB;
      });

      setChatMessages(sortedMessages);

      console.log(messages);
    };

    fetchMessages();
  }, [senderRole, receiverRole]);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, overflowY: "auto", padding: theme.spacing(2) }}>
        {chatMessages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent:
                message.senderRole === senderRole ? "flex-end" : "flex-start",
              mb: 2,
            }}
          >
            <Box sx={{ maxWidth: "70%" }}>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  textAlign: message.sender === senderRole ? "right" : "left",
                }}
              >
                {message.senderRole}
              </Typography>
              <Typography
                sx={{
                  mt: 0.5,
                  py: 1,
                  px: 2,
                  bgcolor:
                    message.senderRole === senderRole
                      ? theme.palette.secondary.main
                      : theme.palette.background.default,
                  borderRadius: theme.shape.borderRadius,
                  textAlign: "left",
                  display: "inline-block",
                }}
              >
                {message.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          borderTop: 1,
          borderColor: "divider",
          padding: theme.spacing(1),
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          value={messageVal}
          onChange={(e) => setMessageVal(e.target.value)}
          placeholder="Type a message..."
          variant="outlined"
          size="small"
          sx={{ marginRight: theme.spacing(1) }}
        />
        <Button variant="contained" color="primary" onClick={handleMessageSend}>
          Send
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default ChatHistory;
