import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "@firebase/firestore"
import { db } from "../../../firebase/clientApp"

export const getBaggageData = async () => {
    try {
        const baggageRef = collection(db, 'baggagedata');
        const baggageDoc = await getDocs(baggageRef);

        return baggageDoc.docs.map((baggageData) => {
            return {
                id: baggageData.id,
                ...baggageData.data()
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteBaggageData = async (baggageId) => {
    try {
        const baggageRef = doc(db, 'baggagedata', baggageId);
        await deleteDoc(baggageRef);
    } catch (error) {
        console.log(error);
    }
}

export const createBaggageData = async (baggageData) => {
    try {
        const baggageRef = collection(db, 'baggagedata');
        await addDoc(baggageRef, baggageData)
    } catch (error) {
        console.log(error);
    }
}

export const updateBaggageData = async (baggageData) => {
    try {
        const baggageRef = doc(db, 'baggagedata', baggageData.id);
        await setDoc(baggageRef, baggageData);
    } catch (error) {
        console.log(error);
    }
}