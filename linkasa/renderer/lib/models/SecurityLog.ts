import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "@firebase/firestore"
import { db } from "../../../firebase/clientApp"
import { Dayjs } from "dayjs";

export const getAllSecurityLog = async () => {
    try {
        const securityLogRef = collection(db, 'securitylog');
        const securityLogDoc = await getDocs(securityLogRef);

        const logs = securityLogDoc.docs.map((log) => {
            const date = log.data().time.toDate();
            console.log(date);
            return {
                ...log.data(),
                id: log.id,
                time: date.toLocaleString(), // Convert to a string in local time format
            }
        });

        console.log(logs);
        return logs;

    } catch (error) {
        console.log("Error fetching security logs:", error);
    }
}

export const createSecurityLog = async (name, description, timestamp : Dayjs, location) => {
    try {
        const securityLogRef = collection(db, 'securitylog');
        
        await addDoc(securityLogRef, {
            name: name,
            description: description,
            time: Timestamp.fromDate(
                timestamp.toDate()
            ),
            location: location
        });


    } catch (error) {
        console.log(error);
    }
}

export const removeSecurityLog = async (logId) => {
    try {
        const securityLogRef = doc(db, 'securitylog', logId);
        await deleteDoc(securityLogRef);
    } catch (error) {
        console.log(error);
    }
}

export const updateSecurityLog = async (logId, name, description, timestamp : Dayjs, location) => {
    try {
        const securityLogRef = doc(db, 'securitylog', logId);
        await setDoc(securityLogRef, {
            name: name,
            description: description,
            time: Timestamp.fromDate(
                timestamp.toDate()
            ),
            location: location
        })
    } catch (error) {
        console.log(error);
    }
}