import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/clientApp";
import { useRouter } from "next/router";
import SidebarItems from "./component/SidebarItems";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../../firebase/clientApp";
import RegisterStaff from "./feature/RegisterStaff";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ManageFlight from "./feature/ManageFlight";
import theme from "../lib/theme";
import Announcements from "./component/Announcements";
import ManageBroadcast from "./feature/ManageBroadcast";
import { getMenu, getMenuItems } from "../lib/models/Dashboard";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        LinKasa Application
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  
  const [user, setUser] = React.useState(null);
  const [dashboardMenu, setDashboardMenu] = React.useState([]);
  const [userData, setUserData] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [isChat, setIsChat] = React.useState(false);
  const [showAnnouncements, setShowAnnouncements] = React.useState(false);
  
  const router = useRouter();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log(currentUser)

        try {
          const userRef = doc(db, "user", currentUser.uid);
          
          getDoc(userRef).then((userDoc) => {
            if (userDoc) {
              setUserData(userDoc.data());
            } else {
              console.log("no data");
            }
          });
        } catch (error) {
          console.log(error);
        }
      } else router.push("/auth/login");
    });

    return () => unsubscribe();


  }, [router]);

  const handleSignOut = () => {
    // Perform sign out
    auth
      .signOut()
      .then(() => {
        // Handle successful sign out
        router.push("/auth/login");
      })
      .catch((error) => {
        // Handle sign out errors
        console.error("Sign out error:", error);
      });
  };

  const ProfileMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    return (
      <Box sx={{ display: "block" }}>
        <Typography
          sx={{ minWidth: 75, cursor: "pointer", fontWeight: "600" }}
          onMouseEnter={handleMenuOpen}
        >
          {userData && userData.username}
        </Typography>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            onMouseLeave: handleMenuClose,
          }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
      </Box>
    );
  };
  // Callback function to update the selectedIndex state in Dashboard
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    setIsChat(false);
  };

  React.useEffect(() => {
    if (userData && userData.role) {
      const menus = getMenuItems(userData.role);

      console.log(menus)
      setDashboardMenu(menus);
    }
  }, [userData]);

  
  const formatDate = () => {
    return new Date().toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
    });
  };
  
  const renderContent = () => {
    return selectedIndex !== null && selectedIndex !== undefined
    ? getMenu(dashboardMenu[selectedIndex].text, userData.role)
    : '';
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: [1],
              position: "relative",
            }}
          ></Toolbar>
          <Divider />
          <List component="nav">
            <SidebarItems
              authorizedMenu={dashboardMenu}
              selectedIndex={selectedIndex}
              onListItemClick={handleListItemClick}
            />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight={600}>
              Today, {formatDate()}
            </Typography>
            <Box sx={{ display: "flex", gap: "0.5", alignItems: "center" }}>
              <ProfileMenu />
              <IconButton color="inherit" onClick={() => setShowAnnouncements(!showAnnouncements)}>
                <Badge badgeContent={4} color="warning">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
          {user && (
            <Typography
              variant="h5"
              sx={{ margin: 2, marginTop: 4, fontWeight: 600 }}
            >
              Welcome, {userData ? userData.username : "User"}!
            </Typography>
          )}

          {showAnnouncements && <Announcements />}

          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {renderContent()}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
