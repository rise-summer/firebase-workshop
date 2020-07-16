import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import CreatePost from "./CreatePost";
import Header from "./Header";

import AuthProvider from "./AuthProvider";
const LOADING_IMAGE_URL =
	"https://breckenridge.skyrun.com/components/com_jomholiday/assets/images/04-spinner.gif";

function App() {
	// set up state data for list of posts to render
	const INITIAL_STATE = [];
	const [postData, setPostData] = useState(INITIAL_STATE);

	// Set up listener for changes to "posts" collection
	const listenForPosts = () => {
		//TODO: Setup listener for database changes
		console.log("Listening for posts :3");
	};

	// Add a new document to our "posts" collection
	const updatePostCollection = (newPost) => {
		// update state with new post
		setPostData((prev) => {
			return [
				{
					id: prev[0] ? prev[0].id + "1" : "1",
					author: newPost.author,
					text: newPost.text,
					timestamp: null,
					profilePicURL: newPost.profilePicURL,
					imageURL: newPost.imageFile
						? URL.createObjectURL(newPost.imageFile)
						: null,
				},
				...prev,
			];
		});

		//TODO: Integrate firestore to add new post to database
	};

	// send new post to the database
	const submitPost = (post) => {
		if (post.text.length === 0) return;

		// update database with new post
		updatePostCollection(post);
	};

	// set up listener whenever component renders
	useEffect(() => {
		return listenForPosts();
	}, [setPostData]);

	const renderPosts = () => {
		if (postData.length === 0) return <p>No posts yet D:</p>;

		// map list of posts to Post components
		const posts = postData.map((post) => {
			return <Post id={post.id} key={post.id} {...post} />;
		});

		return posts;
	};

	return (
		<AuthProvider>
			<div className="App">
				<Header />
				<div className="container">
					<CreatePost submitPost={submitPost} />
					{renderPosts()}
				</div>
			</div>
		</AuthProvider>
	);
}

export default App;
