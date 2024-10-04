import { db } from "../../../firebase/clientApp";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "@firebase/firestore";
import { serverTimestamp } from "@firebase/firestore";

export const getMessagesByRole = async (senderRole, receiverRole) => {
    // biar ID nya ga kebikin double walopun sender recever nanti dituker
    const roles = [senderRole, receiverRole].sort();
    const chatId = roles.join('-');

    const messagesRef = collection(db, `departmentchat/${chatId}/messages`);

    try {
        const snapshot = await getDocs(messagesRef); // or getDocs(q) if using a query
        const messages = snapshot.docs.map(doc => ({ 
            id: doc.id, 
            text: doc.data().text,
            timestamp: doc.data().timestamp,
            ...doc.data()
        }));


        return messages;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return []; // Return an empty array in case of error
    }
};

export const sendMessageByRole = async (senderRole, receiverRole, message) => {
    const roles = [senderRole, receiverRole].sort();
    const chatId = roles.join('-');

    const departmentDoc = doc(db, 'departmentchat', chatId);

    if (!(await getDoc(departmentDoc)).exists()) {
        await setDoc(departmentDoc, {
            participants: roles,
            lastMessage: message
        })
    }

    const messagesRef = collection(db, `departmentchat/${chatId}/messages`);

    try {
        await addDoc(messagesRef, {
            text: message,
            senderRole: senderRole,
            timestamp : serverTimestamp()
        })
    } catch (e) {
        console.log("Error: " + e);
    }
}

