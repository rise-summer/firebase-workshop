import React from "react";
import { db } from "./lib/firebase";

function Post(props) {
	const { id, author, text, profilePicURL, imageURL } = props;

	const deletePost = (id) => {
		db.collection("posts")
			.doc(id)
			.delete()
			.then(() => {
				console.log("Successfully deleted document with ID: ", id);
			})
			.catch((error) => {
				console.error("Error deleting document from database: ", error);
			});
	};

	return (
		<div id={id} className="Post">
			<div className="post-header">
				<img src={profilePicURL} alt="acc-img" />
				<p className="post-author">{author}</p>
			</div>
			<div className="post-body">
				<p>{text}</p>
				<img src={imageURL} className="post-image" />
			</div>
			<div className="post-details">
				<i class="fas fa-trash-alt" onClick={() => deletePost(id)}></i>
			</div>
		</div>
	);
}

export default Post;
