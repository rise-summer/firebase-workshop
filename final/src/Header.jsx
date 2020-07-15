import React from "react";
import "./Header.css";

function Header() {
	const googleSignIn = () => {
		// TODO: set up firebase auth
	};

	return (
		<div className="Header">
			<div className="brand">
				<p>My Public Forum</p>
			</div>
			<div className="signin-options">
				<button className="signin-btn" onClick={googleSignIn}>
					<i class="fab fa-google"></i>
					<p>Sign In with Google</p>
				</button>
			</div>
		</div>
	);
}

export default Header;
