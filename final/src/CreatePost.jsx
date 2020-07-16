import React, { useState } from "react";

function CreatePost({ submitPost }) {
	const INITIAL_STATE = {
		author: "Anonymous",
		text: "",
		profilePicURL: null,
		imageFile: null,
	};
	const [postSubmission, setPostSubmission] = useState(INITIAL_STATE);

	const handleSubmit = () => {
		console.log(postSubmission);
		submitPost(postSubmission);

		//TODO: Submit post data to firebase

		setPostSubmission(INITIAL_STATE);
	};

	const handleChange = (event) => {
		event.preventDefault();
		console.log(event.target);
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
				<div className="post-details">
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
