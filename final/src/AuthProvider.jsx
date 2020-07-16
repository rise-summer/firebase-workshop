import React, { useState, useEffect } from "react";
import { auth } from "./lib/firebase";

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setCurrentUser(user);
			} else {
				setCurrentUser(null);
			}
		});
	}, []);

	return (
		<AuthContext.Provider
			value={{
				currentUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
