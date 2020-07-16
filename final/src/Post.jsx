import React from "react";
import { db } from "./lib/firebase";

function Post(props) {
	const { id, author, text, timestamp, profilePicURL, imageURL } = props;

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

	const date = timestamp ? timestamp.toDate() : new Date();
	const time = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

	return (
		<div id={id} className="Post">
			<div className="post-header">
				<img src={profilePicURL} alt="acc-img" className="profile-pic" />
				<div className="post-details">
					<p className="post-author">{author}</p>
					<p className="post-time">{time}</p>
				</div>
			</div>
			<div className="post-body">
				<p>{text}</p>
				<img src={imageURL} className="post-image" alt="" />
			</div>
			<div className="post-options">
				<i className="fas fa-trash-alt" onClick={() => deletePost(id)}></i>
			</div>
		</div>
	);
}

export default Post;
