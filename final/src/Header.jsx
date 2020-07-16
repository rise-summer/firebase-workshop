import React, { useContext } from "react";
import "./Header.css";

import firebase from "firebase";
import { AuthContext } from "./AuthProvider";

function Header() {
	const currentUser = useContext(AuthContext).currentUser;
	const signedIn = () => {
		return !!currentUser;
	};

	const googleSignIn = () => {
		// TODO: set up firebase auth
		if (signedIn()) {
			firebase
				.auth()
				.signOut()
				.then(() => {
					console.log("signed out");
				})
				.catch((error) => console.error(error));
		} else {
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase
				.auth()
				.signInWithPopup(provider)
				.then((result) => {
					console.log(result.user);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	return (
		<div className="Header">
			<div className="brand">
				<p>My Public Forum</p>
			</div>
			<div className="signin-options">
				<button className="signin-btn" onClick={googleSignIn}>
					<i class="fab fa-google"></i>
					{signedIn() ? <p>Sign Out</p> : <p>Sign In with Google</p>}
				</button>
			</div>
		</div>
	);
}

export default Header;
