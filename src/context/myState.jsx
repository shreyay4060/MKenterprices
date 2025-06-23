import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import toast from "react-hot-toast";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

export default function MyState({ children }) {
  const [loading, setLoading] = useState(false);

  // CONTACT SECTION
  const [getAllContactMsg, setGetAllContactMsg] = useState([]);

  const getAllContactFun = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "contactMsg"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let contactArray = [];
        querySnapshot.forEach((doc) => {
          contactArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllContactMsg(contactArray);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      toast.error("Failed to fetch contact messages");
      console.log(error);
      setLoading(false);
    }
  };

  const deleteContactMsgFun = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "contactMsg", id));
      toast.success("Contact message deleted successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Failed to delete contact message");
      console.log(error);
      setLoading(false);
    }
  };

  // USER SECTION
  const [getAllUser, setGetAllUser] = useState([]);

  const getAllUserFun = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "user"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let userArray = [];
        querySnapshot.forEach((doc) => {
          userArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllUser(userArray);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      toast.error("Failed to fetch users");
      console.log(error);
      setLoading(false);
    }
  };

  const deleteUserFun = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "user", id));
      toast.success("User deleted successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Failed to delete user");
      console.log(error);
      setLoading(false);
    }
  };

  // updateUser
 

  // work info function
  const [getAllWork , setGetAllWork] = useState([])

  const getAllWorkFun = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "work"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let workArray = [];
        querySnapshot.forEach((doc) => {
          workArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllWork(workArray);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error fetching work data:", error);
      setLoading(false);
    }
  };

  // ====================
  // Delete Work Function
  // ====================
  const deleteWorkFun = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "work", id));
      toast.success("Work deleted successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Try again, work details are not deleted");
      console.error(error);
      setLoading(false);
    }
  };

  // RUN ON MOUNT
  useEffect(() => {
    getAllContactFun();
    getAllUserFun();
    getAllWorkFun();
  }, []);

  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllContactMsg,
        deleteContactMsgFun,
        getAllUser,
        deleteUserFun,
        getAllWork,
        deleteWorkFun
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
