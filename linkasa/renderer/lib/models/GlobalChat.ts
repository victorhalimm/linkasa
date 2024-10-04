import { Dayjs } from "dayjs"
import { db } from "../../../firebase/clientApp"
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
    setDoc,
  } from "@firebase/firestore";
import { fetchUser } from "./Employee";

export interface GlobalChatMessage {
    createdAt : Dayjs,
    message: string,
    uid: string
};

export const insertChat = async (message : GlobalChatMessage) => {

    try {
        const createTimestamp = message.createdAt.valueOf();

        const toBeInserted = {
            ...message,
            createdAt: createTimestamp,
        }
        await addDoc(collection(db, "globalmessage"), toBeInserted);

    } catch (e) {
        console.log("Error: " + e);
    }
}

export const fetchGlobalChat = async () => {
    try {
        const snapshots = await getDocs(collection(db, "globalmessage"));

        const globalChats = snapshots.docs.map(doc => ({
            id: doc.id,
            message: doc.data().message,
            uid: doc.data().uid,
            ...doc.data()
        }));

        const userPromises = globalChats.map(globalChat => fetchUser(globalChat.uid));

        const users = await Promise.all(userPromises)

        return globalChats.map(globalChat => ({
            ...globalChat,
            user: users.find(user => user.id == globalChat.uid)
        }));
    } catch (error) {
        console.log("Error: " + error);
    }
};

export const deleteBroadcast = async (broadcastId) => {
    try {
        const broadcastRef = doc(db, 'globalmessage', broadcastId);
        await deleteDoc(broadcastRef);
    } catch (error) {
        console.log(error);
    }
}

export const updateBroadcast = async (broadcastId, priority, message, uid) => {
    try {
        const broadcastRef = doc(db, 'globalmessage', broadcastId);
        await setDoc(broadcastRef, {
            message: message,
            priorityLevel: priority,
            createdAt: serverTimestamp(),
            uid: uid
        });
    } catch (error) {
        console.log(error);
    }
}