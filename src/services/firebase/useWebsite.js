import { query, orderBy, where} from "firebase/firestore";
import {
    addDoc,
    collection,
    getDoc,
    getFirestore,
    deleteDoc,
  } from "firebase/firestore";

  function useWebsite() {
    const db = getFirestore();
    const ref = collection(db, "websites");
    const getWebsite = () => getDoc(query(ref, where("id", "==", "")));
  
    return { getWebsite };
  }
  
  export default useWebsite;
