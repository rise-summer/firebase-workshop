import React, { useState } from "react";
import "./App.css";

function App() {
	const [postData, setPostData] = useState([]);

	return (
		<div className="App">
			<div className="container">
				<div className="new-post">
					<div className="new-post-header">
						<label htmlFor="post-text">Create a Post</label>
					</div>
					<div className="post-submission">
						<input
							type="text"
							id="post-text"
							name="postText"
							placeholder="What's on Your Mind?"
						/>
						<div className="post-details">
							<div className="icon-container">
								<i class="fas fa-photo-video"></i>
								<p>Photo/Video</p>
							</div>
							<button>Post!</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
