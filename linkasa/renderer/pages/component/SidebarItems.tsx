import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmailIcon from '@mui/icons-material/Email';
import FlightIcon from '@mui/icons-material/Flight';
import theme from "../../lib/theme";
import PodcastsIcon from '@mui/icons-material/Podcasts';
import { getMenu } from "../../lib/models/Dashboard";

const SidebarItems = ({authorizedMenu, selectedIndex, onListItemClick}) => {


  return (
    <React.Fragment>
      {authorizedMenu.map((item, index) => (
        <ListItemButton
          key={item.text}
          selected={selectedIndex === index}
          onClick={() => onListItemClick(index)}
          sx={{
            '&.Mui-selected': {
              backgroundColor: theme.palette.secondary.main,
              borderRadius: '12px',
              '&:hover': {
              backgroundColor: theme.palette.secondary.main,
              borderRadius: '12px',
              },
            },
          }}
        >
          <ListItemIcon sx={{color: 'inherit'}}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};

export default SidebarItems;