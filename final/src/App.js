import React, { useState } from "react";
import "./App.css";
import Post from "./Post";
import CreatePost from "./CreatePost";

function App() {
	const INITIAL_STATE = [
		{
			author: "Miles Wu",
			profilePic: null,
			text:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus molestiae nemo expedita vero illo officia neque quisquam ab quos magni.",
			file: null,
		},
	];
	const [postData, setPostData] = useState(INITIAL_STATE);

	const posts = postData.reverse().map((post) => {
		return <Post {...post} />;
	});

	return (
		<div className="App">
			<div className="container">
				<CreatePost />
				{posts}
			</div>
		</div>
	);
}

export default App;
