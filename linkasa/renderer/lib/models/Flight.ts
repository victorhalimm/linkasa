import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "@firebase/firestore";
import { db } from "../../../firebase/clientApp";
import dayjs, { Dayjs } from "dayjs";

export interface Flight {
  flightID: string;
  airlineName: string;
  boardingTime: Dayjs;
  arrivalTime: Dayjs;
  origin: string;
  destination: string;
  flightStatus: string;
}

export const addFlight = async (flightData: Flight) => {
  try {
    const boardingTimestamp = Timestamp.fromDate(
      flightData.boardingTime.toDate()
    );
    const arrivalTimestamp = Timestamp.fromDate(
      flightData.arrivalTime.toDate()
    );

    const dataToSave = {
      ...flightData,
      boardingTime: boardingTimestamp,
      arrivalTime: arrivalTimestamp,
    };

    const withoutId = (({ flightID, ...o }) => o)(dataToSave);
    console.log(flightData);
    await setDoc(doc(db, "flight", flightData.flightID), withoutId);
  } catch (error) {
    console.error("Error adding flight: ", error);
  }
};

export const getFlights = async () => {
  const querySnapshot = await getDocs(collection(db, "flight"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updateFlight = async (flightID: string, flightData) => {
  try {
    const boardingTimestamp = Timestamp.fromDate(
      flightData.boardingTime.toDate()
    );
    const arrivalTimestamp = Timestamp.fromDate(
      flightData.arrivalTime.toDate()
    );

    const dataToSave = {
      ...flightData,
      boardingTime: boardingTimestamp,
      arrivalTime: arrivalTimestamp,
    };

    const withoutId = (({ flightID, ...o }) => o)(dataToSave);
    const updateRef = doc(db, "flight", flightID);
    await setDoc(updateRef, withoutId);
  } catch (error) {
    console.log("Error: " + error);
  }
};

export const deleteFlight = async (flightID: string) => {
  try {
    const deleteRef = doc(db, "flight", flightID);
    await deleteDoc(deleteRef);
  } catch (error) {
    console.log("Error in deleting: " + error);
  }
};
