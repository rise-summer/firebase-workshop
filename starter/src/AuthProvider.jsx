import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);

	// Track changes in AuthState
	useEffect(() => {
		//TODO: set up auth state listener
		console.log("Listening for changes in auth state");
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
