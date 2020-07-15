import React, { useState } from "react";

function CreatePost() {
	const INITIAL_STATE = {
		author: "Anonymous",
		profilePic: null,
		text: "",
		file: null,
	};
	const [postSubmission, setPostSubmission] = useState(INITIAL_STATE);

	const handleSubmit = () => {
		//TODO: Submit post data
		console.log(postSubmission);
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
				file: URL.createObjectURL(file),
			};
		});
	};

	const { text, file } = postSubmission;

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
				<img src={file} className="post-image" />
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
