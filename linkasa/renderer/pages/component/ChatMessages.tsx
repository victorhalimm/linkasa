import { List, ListItem, ListItemText } from "@mui/material";

const ChatMessages = ({fetchGlobalChat} ) => {
    return (
      <List sx={{ maxHeight: 300, overflow: 'auto' }}>
        {/* Map through messages and create a ListItem for each message */}
        <ListItem alignItems="flex-start">
          <ListItemText primary="Username" secondary="Message content" />
        </ListItem>
        {/* ... other messages */}
      </List>
    );
  };

export default ChatMessages;