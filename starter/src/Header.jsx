import React, { useContext } from "react";
import "./Header.css";

import { AuthContext } from "./AuthProvider";

function Header() {
	const currentUser = useContext(AuthContext).currentUser;
	const signedIn = () => {
		return !!currentUser;
	};

	// Trigger on button click
	const googleSignIn = () => {
		// TODO: Set up authentication with Google sign in
		console.log("Sign in with Google");
	};

	return (
		<div className="Header">
			<div className="brand">
				<p>My Public Forum</p>
			</div>
			<div className="signin-options">
				<button className="signin-btn" onClick={googleSignIn}>
					<i className="fab fa-google"></i>
					{signedIn() ? <p>Sign Out</p> : <p>Sign In with Google</p>}
				</button>
			</div>
		</div>
	);
}

export default Header;
