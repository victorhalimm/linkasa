import { deleteUser } from "firebase/auth";
import { auth, db } from "../../../firebase/clientApp";
import { collection, deleteDoc, doc, getDoc } from "@firebase/firestore";


export class Employee {
  uid : string
  email : string;
  username : string;
  password : String;
  role: string;

  
  constructor(uid : string, email : string, username : string, password : string, role: string) {
    this.email = email;
    this.uid = uid;
    this.password = password;
    this.role = role;
    this.username = username;
  }

}

export const availableRoles: string[] = [
    "Customer Service Manager",
    "Information Desk Staff",
    "Lost and Found Staff",
    "Check-in Staff",
    "Gate Agents",
    "Airport Operations Manager",
    "Flight Operations Manager",
    "Ground Handling Manager",
    "Landside Operations Manager",
    "Maintenance Manager",
    "Customs and Border Control Officer",
    "Baggage Security Supervisor",
    "Cargo Manager",
    "Logistics Manager",
    "Fuel Manager",
    "Cargo Handlers",
    "Civil Engineering Manager",
    "Airport Director / CEO",
    "Chief Financial Officer (CFO)",
    "Chief Operations Officer (COO)",
    "Chief Security Officer (CSO)",
    "Human Resources Director"
];

export const departmentChatRoles = [
   "Customer Service Manager",
  "Information Desk Staff",
 "Lost and Found Staff",
 "Check-in Staff",
 "Gate Agents",
 "Airport Operations Manager",
 "Flight Operations Manager",
 "Ground Handling Manager",
 "Landside Operations Manager",
 "Maintenance Manager",
 "Customs and Border Control Officers",
 "Baggage Security Supervisor",
 "Cargo Manager",
 "Logistics Manager",
 "Cargo Handlers",
 "Civil Engineering Manager",
 "Chief Operations Officer (COO)",
 "Chief Security Officer (CSO)",
 "Admin"
];


export const fetchUser = async (uid) => {
  
  try {
    const userRef = doc(db, "user", uid);
    const userSnap = await getDoc(userRef);

    const user = {
      id: userSnap.id,
      ...userSnap.data(),
    }

    return user;
    
  } catch (error) {
    console.log("Error: " + error);
  }
}

export const deleteEmployee = async (uid) => {
  try {
    await deleteDoc(doc(db, "user", uid));
    await deleteUser(auth.currentUser);

    console.log("Employee deleted successfully.");
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
};