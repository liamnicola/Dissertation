import {
	createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged,
	signInWithEmailAndPassword, signInWithPopup, signOut, getAdditionalUserInfo
} from "firebase/auth";
import { setDoc, doc, getFirestore, ref} from "firebase/firestore"
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";



function useAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState({})
	const auth = getAuth();
	const googleProvider = new GoogleAuthProvider();
	const db = getFirestore();

	useEffect(() => {

		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsAuthenticated(true);
				setUser(user);
				Redirect("/Home")
				return;
			}
			setIsAuthenticated(false);
			setUser({})
			return;
		});

	}, [setIsAuthenticated, auth])



	const createEmailUser =   async(email, password) =>{
		await createUserWithEmailAndPassword(auth, email, password).then((account) => {
			return setDoc(doc(db, "users", account.user.uid),{
				email: email,
			})

		});
		 
	}


	const signInEmailUser = (email, password) => 
		signInWithEmailAndPassword(auth, email, password);

	
	const signUserOut = () => signOut(auth);
	const signInGoogleUser = () => signInWithPopup(auth, googleProvider)
		.then((result) => {
		const { isNewUser } = getAdditionalUserInfo(result)
		console.log(getAdditionalUserInfo(result))
		if (isNewUser) {
			return setDoc(doc(db, "users", result.user.uid),{
				email: result.user.email
			})
		} else {
		  console.log("User already exists")
		}
	})


	return {
		createEmailUser, isAuthenticated, signInEmailUser, signUserOut, user,
		signInGoogleUser
	};
}

export default useAuth;
