import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import CreatePost from "./CreatePost";
import Header from "./Header";

import { db } from "./lib/firebase";

function App() {
	const INITIAL_STATE = [
		{
			id: 0,
			author: "Miles Wu",
			text: "when you make an entire firebase workshop in a single day",
			profilePicURL: null,
			imageURL: "https://i.imgflip.com/3lqr77.jpg",
		},
	];

	// set up state data for list of posts to render
	const [postData, setPostData] = useState(INITIAL_STATE);

	// Set up listener for changes to "posts" collection
	const listenForPosts = () => {
		const unsubscribe = db.collection("posts").onSnapshot((querySnapshot) => {
			var postList = [];

			// add each document in the "posts" collection to our "postList"
			querySnapshot.forEach((doc) => {
				let post = doc.data();
				let newPost = {
					id: doc.id,
					author: post.author,
					text: post.text,
					profilePicURL: post.profilePicURL,
					imageURL: post.imageURL,
				};
				console.log(newPost);
				postList.push(newPost);
			});

			// update state with new list of posts
			setPostData([...postList]);
		});

		// return the function used to stop listening to changes in collection
		return unsubscribe;
	};

	// Add a new document to our "posts" collection
	const updatePostCollection = (newPost) => {
		db.collection("posts")
			.add(newPost)
			.then((docRef) => {
				// Successful update
				console.log("New document written with ID: ", docRef.id);
			})
			.catch((error) => {
				// Error while updating database
				console.error("Error adding new document: ", error);
			});
	};

	// send new post to the database
	const submitPost = (post) => {
		if (post.text.length === 0) return;

		setPostData((prev) => {
			return [...prev, { ...post }];
		});

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
		<div className="App">
			<Header />
			<div className="container">
				<CreatePost submitPost={submitPost} />
				{renderPosts()}
			</div>
		</div>
	);
}

export default App;
