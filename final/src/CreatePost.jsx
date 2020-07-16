import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";

const PLACEHOLDER_PROFILE_PIC =
	"https://w5insight.com/wp-content/uploads/2014/07/placeholder-user-400x400.png";

function CreatePost({ submitPost }) {
	const currentUser = useContext(AuthContext).currentUser;
	const INITIAL_STATE = {
		text: "",
		imageFile: null,
	};
	const [postSubmission, setPostSubmission] = useState(INITIAL_STATE);

	const handleSubmit = () => {
		submitPost({
			author: currentUser ? currentUser.displayName : "anonymous",
			profilePicURL: currentUser
				? currentUser.photoURL
				: PLACEHOLDER_PROFILE_PIC,
			...postSubmission,
		});

		//TODO: Submit post data to firebase

		setPostSubmission(INITIAL_STATE);
	};

	const handleChange = (event) => {
		event.preventDefault();

		const target = event.target;
		setPostSubmission((prev) => {
			return {
				...prev,
				[target.name]: target.value,
			};
		});
	};

	const handleFileChange = (event) => {
		event.preventDefault();
		var file = event.target.files[0];
		console.log(file);
		setPostSubmission((prev) => {
			return {
				...prev,
				imageFile: file,
			};
		});
	};

	const { text, imageFile } = postSubmission;
	const preview = imageFile ? URL.createObjectURL(imageFile) : null;

	return (
		<div className="Post">
			<div className="post-header">
				<label htmlFor="post-text">Create a Post</label>
			</div>
			<div className="post-body">
				<textarea
					id="post-text"
					name="text"
					placeholder="What's on Your Mind?"
					value={text}
					onChange={handleChange}
				/>
				<img src={preview} className="post-image" />
				<div className="post-options">
					<label
						id="mediaCaptureLabel"
						htmlFor="mediaCapture"
						className="icon-container"
					>
						<i class="fas fa-image"></i>
						<p>Upload Photo</p>
					</label>
					<input
						type="file"
						name="file"
						id="mediaCapture"
						accept="image/*"
						capture="camera"
						onChange={handleFileChange}
					/>
					<button onClick={handleSubmit}>Post!</button>
				</div>
			</div>
		</div>
	);
}

export default CreatePost;
