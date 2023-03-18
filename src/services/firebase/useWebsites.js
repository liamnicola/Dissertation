import { query, orderBy} from "firebase/firestore";
import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
    deleteDoc,
  } from "firebase/firestore";

  function useWebsites() {
    const db = getFirestore();
    const ref = collection(db, "websites");
    const getWebsites = () => getDocs(query(ref, orderBy("name", "asc")));
    const createWebsite = (website) => addDoc(ref, website);
  
    return { getWebsites, createWebsite };
  }
  
  export default useWebsites;
