import React from "react";

function Post(props) {
	const { author, profilePic, text, file } = props;

	return (
		<div className="Post">
			<div className="post-header">
				<p className="post-author">{author}</p>
			</div>
			<div className="post-body">
				<p>{text}</p>
			</div>
			<div className="post-details">
				<i class="fas fa-edit"></i>
				<i class="fas fa-trash-alt"></i>
			</div>
		</div>
	);
}

export default Post;
