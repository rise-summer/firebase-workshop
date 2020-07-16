import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import CreatePost from "./CreatePost";
import Header from "./Header";

import firebase, { db, storage } from "./lib/firebase";
import AuthProvider from "./AuthProvider";
const LOADING_IMAGE_URL =
	"https://breckenridge.skyrun.com/components/com_jomholiday/assets/images/04-spinner.gif";

function App() {
	// set up state data for list of posts to render
	const INITIAL_STATE = [];
	const [postData, setPostData] = useState(INITIAL_STATE);

	// Set up listener for changes to "posts" collection
	const listenForPosts = () => {
		const query = db.collection("posts").orderBy("timestamp", "desc").limit(10);
		const unsubscribe = query.onSnapshot((querySnapshot) => {
			var postList = [];

			// add each document in the "posts" collection to our "postList"
			querySnapshot.forEach((doc) => {
				let post = doc.data();
				let newPost = {
					id: doc.id,
					author: post.author,
					text: post.text,
					timestamp: post.timestamp,
					profilePicURL: post.profilePicURL,
					imageURL: post.imageURL,
				};

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
			// 1 - Add post to Firestore database
			.add({
				author: newPost.author,
				text: newPost.text,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				profilePicURL: newPost.profilePicURL,
				imageURL: newPost.imageFile ? LOADING_IMAGE_URL : null,
			})
			.then((docRef) => {
				// Successful update
				console.log("New document written with ID: ", docRef.id);
				// 2 - Upload the image to Cloud Storage.
				const file = newPost.imageFile;
				if (!file) return;
				var filePath = "post-images/" + docRef.id + "/" + file.name;
				return storage
					.ref(filePath)
					.put(file)
					.then((fileSnapshot) => {
						// 3 - Generate a public URL for the file.
						return fileSnapshot.ref.getDownloadURL().then((url) => {
							// 4 - Update the placeholder with the image’s URL.
							return docRef.update({
								imageURL: url,
								storageUri: fileSnapshot.metadata.fullPath,
							});
						});
					});
			})
			.catch((error) => {
				// Error while updating database
				console.error(
					"Error adding new document and/or uploading to Cloud storage: ",
					error,
				);
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
