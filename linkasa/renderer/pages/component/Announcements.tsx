import { Divider, List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import React from "react";
import { fetchGlobalChat } from "../../lib/models/GlobalChat";
import CampaignIcon from '@mui/icons-material/Campaign';

const Announcements = () => {
    const [announcements, setAnnouncements] = React.useState([]);

    React.useEffect(() => {
        const loadAnnouncements = async () => {
            try {
                const fetchedAnnouncements = await fetchGlobalChat();
                setAnnouncements(fetchedAnnouncements);
            } catch (error) {
                console.error("Error fetching announcements:", error);
            }
        };

        loadAnnouncements();
    }, []);

    
    return (
      <Paper sx={{ position: 'absolute', top: 60, right: 0, width: 300 , zIndex: 10}}>
        <List>
          {announcements.map((announcement, index) => (
            <React.Fragment key={index}>
              <ListItem>
              <ListItemIcon>
                    <CampaignIcon />
                </ListItemIcon>
                <ListItemText primary={announcement.message} secondary={announcement.user.role} />
              </ListItem>
              {index < announcements.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    );
  };


export default Announcements;