import { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const useGetUserId = () => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getUserIdFromSession = async () => {
      try {
        const sessionsRef = collection(db, "sessions");
        const q = query(sessionsRef);
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          return null;
        }

        const sessionData = querySnapshot.docs[0].data();
        const userId = sessionData.userId;
        setUserId(userId);
      } catch (error) {
        console.error("Error getting user ID from session:", error);
      }
    };
    getUserIdFromSession();
  }, []);

  return userId;
};

export { useGetUserId };
