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

	return (
		<div className="Post">
			<div className="post-header">
				<label htmlFor="post-text">Create a Post</label>
			</div>
			<div className="post-submission">
				<input
					type="text"
					id="post-text"
					name="text"
					placeholder="What's on Your Mind?"
					value={postSubmission.text}
					onChange={handleChange}
				/>
				<img src={postSubmission.file} id="image-preview" />
				<div className="post-details">
					<label
						id="mediaCaptureLabel"
						htmlFor="mediaCapture"
						className="icon-container"
					>
						<i class="fas fa-photo-video"></i>
						<p>Photo/Video</p>
					</label>
					<input
						type="file"
						name="file"
						id="mediaCapture"
						accept="image/*|video/*"
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
