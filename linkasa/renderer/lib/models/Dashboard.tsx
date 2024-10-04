import ManageBroadcast from "../../pages/feature/ManageBroadcast";
import ManageFlight from "../../pages/feature/ManageFlight";
import RegisterStaff from "../../pages/feature/RegisterStaff";
import EmailIcon from "@mui/icons-material/Email";
import FlightIcon from "@mui/icons-material/Flight";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import ChatIcon from "@mui/icons-material/Chat";
import DepartmentChat from "../../pages/feature/DepartmentChat";
import ViewTerminalMap from "../../pages/feature/ViewTerminalMap";
import MapIcon from "@mui/icons-material/Map";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ManageFlightCrew from "../../pages/feature/ManageFlightCrew";
import CloudIcon from "@mui/icons-material/Cloud";
import ViewWeather from "../../pages/feature/ViewWeather";
import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdateGood";
import ManageSecurityLog from "../../pages/feature/ManageSecurityLog";
import LuggageIcon from "@mui/icons-material/Luggage";
import ManageBaggage from "../../pages/feature/ManageBaggage";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DownloadReport from "../../pages/feature/DownloadReport";
import BarChartIcon from "@mui/icons-material/BarChart";
import ViewRevenue from "../../pages/feature/ViewRevenue";

// 1. Tambain semua role yang bisa department chat disini buat dapetin fungsionalitasnya
// 2. Fix masalah posisi dialog chat bakal otomatis ditaro dipaling atas harusnya disort biar
// paling baru ditaro dipaling bawah
// 3. Bikin fungsionalitas lainnya juga JANGAN LUPA
export const getMenuItems = (role) => {
  switch (role) {
    case "Human Resources Director":
      return [{ text: "Register Staff", icon: <EmailIcon /> }];
    case "Flight Operations Manager":
      return [
        { text: "Manage Flight", icon: <FlightIcon /> },
        { text: "Department Chat", icon: <ChatIcon /> },
        { text: "Manage Flight Crew", icon: <AssignmentIndIcon /> },
      ];
    case "Customer Service Manager":
      return [
        { text: "Manage Broadcast", icon: <PodcastsIcon /> },
        { text: "Department Chat", icon: <ChatIcon /> },
      ];
    case "Admin":
      return [
        { text: "Register Staff", icon: <EmailIcon /> },
        { text: "Manage Flight", icon: <FlightIcon /> },
        { text: "Manage Broadcast", icon: <PodcastsIcon /> },
        { text: "Department Chat", icon: <ChatIcon /> },
        { text: "View Flight", icon: <FlightIcon /> },
        { text: "View Terminal Maps", icon: <MapIcon /> },
        { text: "Manage Flight Crew", icon: <AssignmentIndIcon /> },
        { text: "View Weather", icon: <CloudIcon /> },
        { text: "Manage Security Log", icon: <SecurityUpdateGoodIcon /> },
        { text: "Manage Baggage", icon: <LuggageIcon /> },
        { text: "Download Report", icon: <AssessmentIcon /> },
        { text: "View Revenue", icon: <BarChartIcon /> },
      ];
    case "Gate Agents":
      return [
        { text: "View Flight", icon: <FlightIcon /> },
        { text: "Department Chat", icon: <ChatIcon /> },
      ];
    case "Chief Operations Officer (COO)":
      return [{ text: "Department Chat", icon: <ChatIcon /> }];
    case "Airport Operations Manager":
      return [
        { text: "View Flight", icon: <FlightIcon /> },
        ,
        { text: "Department Chat", icon: <ChatIcon /> },
        { text: "View Weather", icon: <CloudIcon /> },
      ];
    case "Information Desk Staff":
      return [
        { text: "View Flight", icon: <FlightIcon /> },
        { text: "Department Chat", icon: <ChatIcon /> },
        { text: "View Terminal Maps", icon: <MapIcon /> },
      ];
    case "Check-in Staff":
      return [
        { text: "View Flight", icon: <FlightIcon /> },
        { text: "Department Chat", icon: <ChatIcon /> },
      ];
    case "Chief Security Officer (CSO)":
      return [
        { text: "Manage Security Log", icon: <SecurityUpdateGoodIcon /> },
        { text: "Department Chat", icon: <ChatIcon /> },
      ];
    case "Ground Handling Manager":
      return [{ text: "Manage Baggage", icon: <LuggageIcon /> }];
    case "Baggage Security Officer":
      return [
        { text: "Manage Baggage", icon: <LuggageIcon /> },
        { text: "Manage Security Log", icon: <SecurityUpdateGoodIcon /> },
        { text: "Department Chat", icon: <ChatIcon /> },
      ];
    case "Airport Director (CEO)":
      return [
        { text: "Download Report", icon: <AssessmentIcon /> },
        { text: "View Revenue", icon: <BarChartIcon /> },
      ];
    case "Lost and Found Staff":
      return [{ text: "Department Chat", icon: <ChatIcon /> }];
    case "Landside Operations Manager":
      return [{ text: "Department Chat", icon: <ChatIcon /> }];
    case "Maintenance Manager":
      return [{ text: "Department Chat", icon: <ChatIcon /> }];
    case "Customs and Border Control Officers":
      return [{ text: "Department Chat", icon: <ChatIcon /> }];
    case "Baggage Security Supervisor":
      return [
        { text: "Manage Baggage", icon: <LuggageIcon /> },
        { text: "Department Chat", icon: <ChatIcon /> },
      ];
    case "Cargo Manager":
      return [{ text: "Department Chat", icon: <ChatIcon /> }];
    case "Logistics Manager":
      return [{ text: "Department Chat", icon: <ChatIcon /> }];
    case "Cargo Handlers":
      return [{ text: "Department Chat", icon: <ChatIcon /> }];
    case "Civil Engineering Manager":
      return [{ text: "Department Chat", icon: <ChatIcon /> }];

    default:
      return [];
  }
};

export const getMenu = (menu: string, role: string): JSX.Element | null => {
  switch (menu) {
    case "Manage Flight":
      return <ManageFlight />;
    case "Register Staff":
      return <RegisterStaff />;
    case "Manage Broadcast":
      return <ManageBroadcast />;
    case "Department Chat":
      return <DepartmentChat currRole={role} />;
    case "View Flight":
      return <ManageFlight viewOnly={true} />;
    case "View Terminal Maps":
      return <ViewTerminalMap />;
    case "Manage Flight Crew":
      return <ManageFlightCrew />;
    case "View Weather":
      return <ViewWeather />;
    case "Manage Security Log":
      return <ManageSecurityLog />;
    case "Manage Baggage":
      return <ManageBaggage />;
    case "Download Report":
      return <DownloadReport />;
    case "View Revenue":
      return <ViewRevenue />;
    default:
      return null;
  }
};
