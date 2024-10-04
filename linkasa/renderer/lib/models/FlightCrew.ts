import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "@firebase/firestore";
import { db } from "../../../firebase/clientApp";

export const getAllPilot = async () => {

    try {
        
        const pilotDoc = collection(db, "flightcrew/pilot/attendant");
        const pilotSnap = await getDocs(pilotDoc);

        const pilots = pilotSnap.docs.map((pilot) => ({
            id : pilot.id,
            ...pilot.data() 
        }));

        console.log(pilots)

        return pilots
    } catch (error) {
        console.log("Error: " + error)
    }

    
}

export const createPilot = async (pilot_name, years_of_exp, availability, gender, airline_name) => {
    try {
        const pilotCollectionRef = collection(db, 'flightcrew', 'pilot', 'attendant');
        const pilotDocRef = doc(pilotCollectionRef);

        await setDoc(pilotDocRef, {
            pilotName: pilot_name,
            yearsOfExp: parseInt(years_of_exp),
            availability: availability,
            gender: gender,
            airlineName: airline_name
        });

    } catch (error) {
        console.log("error: " + error);
    }
}

export const deletePilot = async (pilot_id) => {
    try {
        const pilotDoc = doc(db, "flightcrew/pilot/attendant", pilot_id);
        await deleteDoc(pilotDoc);

    } catch (error) {
        console.log(error)
    }
}

export const updatePilot = async (pilot_id, pilot_name, years_of_exp, availability, gender, airline_name) => {
    try {
        const pilotDoc = doc(db, "flightcrew/pilot/attendant", pilot_id);
        await setDoc(pilotDoc, {
            pilotName: pilot_name,
            yearsOfExp: parseInt(years_of_exp),
            availability: availability,
            gender: gender,
            airlineName: airline_name
        })

    } catch (error) {
        console.log(error)
    }
}

export const getAllSteward = async () => {
    try {
        
        const stewardDoc = collection(db, "flightcrew/steward/attendant");
        const stewardSnap = await getDocs(stewardDoc);

        const stewards = stewardSnap.docs.map((pilot) => ({
            id : pilot.id,
            ...pilot.data() 
        }));

        console.log(stewards)

        return stewards
    } catch (error) {
        console.log("Error: " + error)
    }
}

export const createSteward = async (steward_name, years_of_exp, availability, gender, airline_name) => {
    try {
        const stewardCollectionRef = collection(db, 'flightcrew', 'steward', 'attendant');
        const stewardDocRef = doc(stewardCollectionRef);

        await setDoc(stewardDocRef, {
        stewardName: steward_name,
            yearsOfExp: parseInt(years_of_exp),
            availability: availability,
            gender: gender,
            airlineName: airline_name
        });

    } catch (error) {
        console.log("error: " + error);
    }
}

export const deleteSteward = async (steward_id) => {
    try {
        const stewardDoc = doc(db, "flightcrew/steward/attendant", steward_id);
        await deleteDoc(stewardDoc);

    } catch (error) {
        console.log(error)
    }
}

export const updateSteward = async (steward_id, steward_name, years_of_exp, availability, gender, airline_name) => {
    try {
        const stewardDoc = doc(db, "flightcrew/steward/attendant", steward_id);
        await setDoc(stewardDoc, {
            stewardName: steward_name,
            yearsOfExp: parseInt(years_of_exp),
            availability: availability,
            gender: gender,
            airlineName: airline_name
        })

    } catch (error) {
        console.log(error)
    }
}

