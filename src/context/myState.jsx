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
        const contactArray = [];
        querySnapshot.forEach((doc) => contactArray.push({ ...doc.data(), id: doc.id }));
        setGetAllContactMsg(contactArray);
        setLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      toast.error("Failed to fetch contact messages");
      console.error(error);
      setLoading(false);
    }
  };

  const deleteContactMsgFun = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "contactMsg", id));
      toast.success("Contact message deleted successfully");
    } catch (error) {
      toast.error("Failed to delete contact message");
      console.error(error);
    } finally {
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
        const userArray = [];
        querySnapshot.forEach((doc) => userArray.push({ ...doc.data(), id: doc.id }));
        setGetAllUser(userArray);
        setLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
      setLoading(false);
    }
  };

  const deleteUserFun = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "user", id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // REVIEWS SECTION
  const [getAllReviews, setGetAllReviews] = useState([]);

  const getAllReviewsFun = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "reviews"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const reviewArray = [];
        querySnapshot.forEach((doc) => reviewArray.push({ ...doc.data(), id: doc.id }));
        setGetAllReviews(reviewArray);
        setLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      toast.error("Failed to fetch reviews");
      console.error(error);
      setLoading(false);
    }
  };

  const deleteReviewFun = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "reviews", id));
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error("Failed to delete review");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // WORK INFO SECTION
  const [getAllWork, setGetAllWork] = useState([]);

  const getAllWorkFun = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "work"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const workArray = [];
        querySnapshot.forEach((doc) => workArray.push({ ...doc.data(), id: doc.id }));
        setGetAllWork(workArray);
        setLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching work data:", error);
      setLoading(false);
    }
  };

  const deleteWorkFun = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "work", id));
      toast.success("Work deleted successfully");
    } catch (error) {
      toast.error("Try again, work details are not deleted");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // WORKERS SECTION
  const [getAllWorkers, setGetAllWorkers] = useState([]);

  const getAllWorkersFun = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "workers"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const workerArray = [];
        querySnapshot.forEach((doc) => workerArray.push({ ...doc.data(), id: doc.id }));
        setGetAllWorkers(workerArray);
        setLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      toast.error("Failed to fetch workers");
      console.error(error);
      setLoading(false);
    }
  };

  const deleteWorkerFun = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "workers", id));
      toast.success("Worker deleted successfully");
    } catch (error) {
      toast.error("Failed to delete worker");
      console.error("Delete Worker Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // RUN ON MOUNT
  useEffect(() => {
    getAllContactFun();
    getAllUserFun();
    getAllWorkFun();
    getAllWorkersFun();
    getAllReviewsFun();
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
        deleteWorkFun,
        getAllWorkers,
        deleteWorkerFun,
        getAllReviews,
        deleteReviewFun,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
