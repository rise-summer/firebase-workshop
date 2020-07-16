# RISE Firebase Workshop

## Resources

- [**Workshop Slides**](https://tinyurl.com/rise-firebase-workshop)

**Firebase Documentation**

- Setting up a Firebase Project
- Add Firebase to Application
  - [Web](https://firebase.google.com/docs/web/setup)
  - [iOS](https://firebase.google.com/docs/ios/setup)
  - [Android](https://firebase.google.com/docs/android/setup)
- Firestore [Data Model](https://firebase.google.com/docs/firestore/data-model)
- Using Firestore Database in App
  - [Add to Database](https://firebase.google.com/docs/firestore/manage-data/add-data)
  - [Delete from Database](https://firebase.google.com/docs/firestore/manage-data/delete-data)
  - [Fetch from Database](https://firebase.google.com/docs/firestore/query-data/get-data)
  - [Listen for Realtime Updates](https://firebase.google.com/docs/firestore/query-data/listen)
  - [Querying Database](https://firebase.google.com/docs/firestore/query-data/queries)
- Firebase Hosting: [initalize firebase](https://firebase.google.com/docs/cli#initialize_a_firebase_project)
  then [test and deploy](https://firebase.google.com/docs/hosting/deploying) your app
- Firebase Cloud Storage: store files, images, etc.
- Firebase Authentication

## This workshop will cover the following topics:

- [Firestore](#firestore)
  - [What are Databases?](#but-first-databases)
  - [Why Firestore?](#why-firestore)
  - [Firestore Data Model](#understanding-the-firestore-data-model)
  - Demo App
    - [Setup](#demo-app-setup-firebase)
    - [Creating Firebase Project with Firestore](#creating-a-firebase-project)
    - [Using Firestore in Web App](#using-the-database-in-the-app)
- [Cloud Storage](#cloud-storage)
  - [Buckets](#buckets)
  - [References](#references)
  - Demo App
    - [Add Cloud Storage to Firebase Project](#demo-app-integrating-cloud-storage)
    - Using Cloud Storage in Web App
- [Authentication](#authentication)
  - [Tokens](#tokens)
  - Security Rules
  - Demo App
    - Add Authentication
    - Work with Auth in Web App
    - Set up Security Rules
- [Firebase Hosting](#firebase-hosting)
  - Firebase CLI
  - Deploying
  - Demo App
    - Add Hosting
    - Deploy our Web App

## Getting Started

### You'll need:

- [Node](https://nodejs.org/) - we're using v14.0
- [Yarn 1.x](https://classic.yarnpkg.com/en/) - note we are not using Yarn 2.
- [Git](https://git-scm.com/downloads)
- Text editor of your choice, we're using [Visual Studio Code](https://code.visualstudio.com/)

### Setting up the Demo App: Clone our Repository

Open up your terminal application (Terminal on MacOS, Powershell on Windows) and execute the following commands in a directory of your choice. (Note: the "\$" character is not part of the command).

```
$ git clone https://github.com/rise-summer/firebase-workshop.git public-forum
$ cd public-forum/starter
$ yarn
$ yarn add firebase
$ yarn start
```

# Firestore

## But First, Databases!

Before we get into using Firestore, let's understand the service that it
provides us: a database!

At a very basic level, a database is simply a collection of organized data.
Databases are designed to store information that can be accessed or modified
later on. This ends up being very useful when building an app to implement
the idea of **"persistent storage."**

Having a database allows an application to store and update information that
can then be used at any time. In other words, a user can come back to the
application and expect all their changes to still be present, WOW!

## Why Firestore?

Firestore is a service developed by Firebase that allows you, as a developer,
to create a database that you can use in any application you want! If you're
familiar with other backend technologies like MySQL or PostgreSQL, you might
be thinking "Why should I use Firestore instead?"

The reason we are using Firestore is because of how easy it is to use and
integrate into your application. Usually, databases require a middleman
called a "server" which handles requests from an application to fetch the
specified data stored in the database.

![](images/client_server_communication.png)

Firestore **ELIMINATES the need for server development**, hence why we say that
using Firestore lets us go "Serverless." While in reality, there still is a
server involved, this server is no longer something that you, the developer,
needs to worry about creating or maintaining.

## Advantages of "Serverless" Development

Now with Firestore, we no longer need to set up endpoints of communication
between databases and applications ourselves. This means we can
**develop without limits!** :0

For example, say we wanted to add a feature to a music player application
that allows users to create groups of songs from a library (playlist management).

Without Firestore, we would first need to create a place in our database to
support the storage of playlists and their associated songs for each user.
Then after that we would also need to implement server-side logic to let our
application make requests to fetch the playlist data for a given user, to
modify the available playlists for a specfic user (creation and deletion),
and to change the songs inside of one of the user's playlists.

With Firestore, this entire process is made faster and easier with a few key
library functions made available to us in any application that has Firebase
set up.

## Understanding the Firestore Data Model

As opposed to many SQL databases you may be familiar with, Firestore is what's
known as a NoSQL, Document-Oriented Database.

This means that instead of using tables to store related data, Firestore uses
"collections" of "documents," each containing some labeled pieces of data.

Woah, colllections? Documents? What does any of that mean? Let's take a look and
see if we can understand the way Firestore organizes its data a little better.

## Collections

Collections are pretty simple to understand, they simply act as **containers that
consist of multiple documents**. We usually use a collection to denote some set of
related documents.

## Documents

Okay, so if a collection just holds documents then what the heck is a document?

Documents are referred to as the **unit of storage in Firestore**. What this means
is that all physical data (names, dates, objects, etc) in your Firestore database
will be located inside some document.

Every document in your database is identified by some unique name within its
collection. Each document stores a set of data in the form of **key-value pairs,**
which might look something like this:

![firebase-model](./images/firebase_model_example.png)

Each piece of data is labeled by a field name or **key**, and this key identifies
what the **value** it maps to represents.

These are the basic parts of any Firestore database, if you want to dive a little
deeper I encourage you to look at the Firestore
[data model documentation](https://firebase.google.com/docs/firestore/data-model).

# Demo App: Setup Firebase

## Creating a Firebase Project

To get start, login to [firebase](https://console.firebase.google.com/) and you should end up at a screen that looks like this:

![start-firebase](./images/start-firebase.png)

Go ahead and click the **Add Project** button, which should prompt you to enter the project's name. Feel free to use any name you want, I will use "firebase-demo" as shown below:

![create-project-1](./images/create-project-1.png)

After you hit continue, you'll be prompted to set up Google Analytics. This will require some additional setup, so I won't be enabling it. However, it is a pretty useful tool for measuring app usage and user engagement, if that's something you're interested in.

![create-project-2](./images/create-project-2.png)

## Adding an App to Your Project

Now you should see the project overview. Since we're using a web app, let's click the button to add a web app to the project.

![add-project](./images/add-project-1.png)

Choose a nickname for your app, then click **Register app**

![add-project](./images/add-project-2.png)

Next, we're going to need to add the firebase configuration to our app. This will enable the use of the Firebase Client SDK in your web app. Your screen should look something like the image below.

![add-project](./images/add-project-3.png)

Create a `lib` folder inside your `starter/src` folder, and create a `firebase.js` file
inside of it. Copy the code under the **Your web app's Firebase configuration**
and **Initialize Firebase** comments, and paste it into the `firebase.js` file.
Now modify the file to look like this (the config part should be from the code
you copied, not exactly the same as below!):

```js
import firebase from "firebase";

const config = {
	apiKey: "AIzaSyDTqvwKP-6BdnzC83vPkt8sQZfHBa8N-nQ",
	authDomain: "fir-workshop-9b1eb.firebaseapp.com",
	databaseURL: "https://fir-workshop-9b1eb.firebaseio.com",
	projectId: "fir-workshop-9b1eb",
	storageBucket: "fir-workshop-9b1eb.appspot.com",
	messagingSenderId: "1077599697140",
	appId: "1:1077599697140:web:49373871659609c24d46a1",
};

firebase.initializeApp(config);

export default firebase;
```

# Demo App: Integrating Firestore

On the left sidebar of the Firebase console, navigate to the **Database** tab. You should be directed to a screen that looks like this:

![start-firestore](./images/start-firestore.png)

Click **Create database**, you will then be primpted to set up security rules for Firestore. We are going to **start in test mode** (which I recommend when you are just starting development). Later on, we will go over what Security Rules are and how to set them up.

![add-firestore](./images/add-firestore-1.png)

For the Cloud Firestore location, I will be using us-central, which is a multi-region location covering the United States.

![add-firestore](./images/add-firestore-2.png)

## Firestore Databases

Now that we've set up our database, let's make some sample data for our app to use. First, go ahead and add a new collection by clicking **Start collection**

![start-collection](./images/start-collection-1.png)

I will be naming the collection "posts." This name will be used later in our code when we query the data in this collection.

![start-collection](./images/start-collection-2.png)

Now we can add our first document to the "posts" collection. I'm going to use an autogenerated ID. This document is going to contain all the information relevant to our posts: author, text, timestamp, profilePicURL, and an optional imageURL. Don't worry too much about these fields just yet, we will get into why they are needed as we go through the demo.

![start-collection](./images/start-collection-3.png)

## Using Firestore in the App

Now that we've finished setting up our Firestore database, we can start to integrate it into our app!

First, I am going to modify our `src/lib/firebase.js` file to create a reference to our database. I can do this by adding the following line: `export const db = firebase.firestore();`

Now navigate to the `App.js` file and add the following line to the top of the file:

```js
import { db } from "./lib/firebase";
```

This will give us access to the database reference we created earlier.

### Listen for Realtime Updates

First, we are going to set up a listener for the database. This will allow us to specify what actions to take whenever there are changes in the database.

Go ahead and copy and paste the following code into the `listenForPosts()` function.

```js
// Set up listener for changes to "posts" collection
const listenForPosts = () => {
	// query for the first 10 posts in order of timestamp
	const query = db.collection("posts").orderBy("timestamp", "desc").limit(10);

	// set up the callback to trigger on database changes
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
```

Woah. What exactly is going on here? The answer is: a lot, but we'll go through it step by step.

```js
const query = db.collection("posts").orderBy("timestamp", "desc").limit(10);
```

This line creates a database query for the first 10 posts in order from most recent to oldest.

```js
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
```

Let's go through the above code block chunk by chunk. The first line `query.onSnapshot((querySnapshot) => {}` sets up our event listener callback. We are basically saying to listen for any changes in the data that falls under our query.

The `querySnapshot.forEach((doc) => {})` block goes through every document in the relevant query. We process the data in each document to create a `newPost` which we then add to our list of posts.

The last line `setPostData([...postList])` is just to update our React state so that the processed data can now be reflected in our app.

### Adding to our Database

Now that our app will react to changes in the database, let's create some functionality to add new posts! Go ahead and replace the `updatePostCollection()` implementation with the following code:

```js
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
		})
		.catch((error) => {
			// Error while updating database
			console.error("Error adding new document : ", error);
		});
};
```

Let's break down the above code. First we get a reference to our collection of posts. Then we use the `.add()` method to create a new document with the specified fields. Don't worry about the `imageURL` field for now, we will get to that when we integrate Cloud Storage.

You should also be able to see that we call `updatePostCollection()` in the `submitPost()` function right below it. We will be using this function in the `CreatePost.jsx` component to submit the user input. The function looks like this:

```js
// send new post to the database
const submitPost = (post) => {
	if (post.text.length === 0) return;

	// update database with new post
	updatePostCollection(post);
};
```

### Deleting Data from the Database

Lastly, let's set up the functionality to allow us to delete posts from the database. Go ahead and navigate to the `src/Post.jsx` file. Once again add the `import {db} from './lib/firebase'` line at the top.

Next, replace the current `deletePost()` implementation with the following code:

```js
// delete post based on id
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
```

Now clicking on the trash can icon attached to each post will delete them from our database.

# Cloud Storage

In order to have your project support user generated content such as images, videos, audio files, etc, you must have users upload their files and then somehow your app has to serve them online. If you skipped this step, user files would only be visible on the user's local machine.

Note that "user generated content" is distinct from media that already lives online. Cloud storage is relevant specifically for making files that only exist on your user's device available online.

## Buckets

Cloud Storage stores all your files in Google Cloud Storage "buckets." Each of these buckets is structured like a hierarchical file system (not unlike the ones used on many desktop/laptop devices). This means that a bucket consists of folders, subfolders, and files

## References

Since Cloud Storage buckets are structured as file systems, the way we reference files is similar to how we use a filePath to reference files on our own devices.

These references are then used to maniplate the contents of our buckets. We will see this in more detail when we go through the demo.

# Demo App: Integrating Cloud Storage

## Add Cloud Storage to Your Firebase Project

Navigate to the **Storage** tab from your firebase console. Go ahead and click **Get Started** to set up Cloud Storage.

![start-storage](./images/start-cloud-storage.png)

We'll click through the next two steps, I will talk about the security rules soon.

![add-storage](./images/add-storage-1.png)
![add-storage](./images/add-storage-2.png)

Once you've finished setup, you should see a page that looks like this:

![add-folder](./images/add-folder-1.png)

We're gonna go ahead and click the add folder button to create a place to store the images associated with our posts.

![add-folder](./images/add-folder-2.png)

Once you've created the folder, your page should look like this:

![add-storage](./images/add-storage-3.png)

The highlighted url is the location of your storage bucket. You can cross-reference this with the `config` object we created in `src\lib\firebase.js`

### Previewing Security Rules

So hopefully you noticed that while setting up Cloud Storage, there was a small note about configuring your security rules. We will be getting into the details of security rules a bit later on, but for now go ahead and navigate to the **Rules** tab and modify the default rules as shown below:

![storage-rules](./images/storage-rules.png)

Once you've changed to rules to allow anyone to read and write files to cloud storage, go ahead and publish them.

## Using Cloud Storage in the App

Now that we've finished setting up Cloud Storage, we can start to integrate it into our app!

First, I am going to modify our `src/lib/firebase.js` file to give us access to the firebase storage object. I can do this by adding the following line: `export const storage = firebase.storage();`

Now navigate to the `App.js` file and add the following line to the top of the file:

```js
import { db, storage } from "./lib/firebase";
```

We will now replace the `updatePOstCollection()` function from earlier to look like the following code:

```js
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
```

Alright, wow, a lot of changes here. Our `updatePostCollection()` function is looking much more complicated. Let's break down what's going on here.

```js
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
```

The above portion of the code is still the same, so we know it serves to update the firestore database with a new document with all the relevant fields.

```js
const file = newPost.imageFile;
if (!file) return;
var filePath = "post-images/" + docRef.id + "/" + file.name;
```

This portion of the code creates a `filePath` for the image file if the user selected one to upload. This `filePath` uses the name of the folder we created earlier "post-images" and concatenates it with the document id and the name of the file. So the final filePath will look something like this `post-images/your-doc-id/your-file-name`.

```js
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
```

This portion of the code is where the bulk of the Cloud Storage work is happening. We use `storage.ref(filePath)` to create a **reference** to the specified `filePath` (which will exist in our bucket).

The `.put(file)` method is then used to upload the file to Cloud Storage. Once it has successfully uploaded, we get access to a `fileSnapshot` in our callback. We'll use this snapshot to get the url needed to download the uploaded file.

Basically, `fileSnapshot.ref.getDownloadURL()` gives us the online url we can use to access the file that was just uploaded to the Cloud. Once we have this url, we can finally update our document with the `imageURL`, which if you recall earlier had a placeholder `LOADING_IMAGE_URL`.

Note: the storageUri gives us the bucket `filePath` which we created earlier.

# Authentication

If you plan at all to have any sort of user specific functionality in your application, it is highly likely you will need some form of authentication. Authentication helps you figure out if the current user is actually who they say they are. Accordingly, we can then choose what information to give them access to, allowing us to protect private data or actions.

## How does Firebase Handle Authentication?

Firebase integrates with a lot of existing authentication systems (e.g. OAuth) to give you options on how to handle Authentication in your application. It is often the case that Firebase takes an OAuth token, indicating a user has passed the credentials check, and then processes it on their servers to give the client an appropriate response.

What does this mean for us though? Well, quite simply, we don't need to think too much about the systems in place to enable our Authentication. Firebase's servers will handle it for us. All we have to do is set up the credentials check and then we'll get a response with user information.

## Firebase Security Rules

To briefly go over Firebase Security Rules: security rules are a streamlined method to put checks and restrictions in place on your data. In a fairly intuitive way, they allow you to define under what conditions, users have access to reading and/or writing to your database and your cloud storage bucket.

An important object that you have access to when setting security rules is the `request.auth` object. This object contains information about the current signed in user when a request is made. We can use this in tandem with Firebase Authentication to help set checks on what actions users are attempting to perform.

# Demo App: Using Firebase Authentication

## Add Auth to Firebase Project

From your firebase console, navigate to the **Authentication** tab and click on **Sign-in method**.

![start-auth](./images/start-authentication.png)

We're gonna go ahead and use Google's sign in provider so click on Google and then **Enable** it.

## Integrate Auth into the App

There are actually two methods to integrate authentication to your applications with firebase. We will go over the more barebones approach, but I encourage you to look into [FirebaseUI](https://firebase.google.com/docs/auth/web/firebaseui) for your own projects as it is a very flexible and streamlined way to add authentication.

To get started, navigate to your `src/lib/firebase.js` file and add the following line to get a reference to the auth object:

```js
export const auth = firebase.auth();
```

## Managing Users

To effectively utilize the results of authentication, we will set up a way to keep track of the currently signed in user. Navigate to the `src/AuthProvider.jsx` file and add the following line to the top:

```js
import { auth } from "./lib/firebase";
```

Then, add the following code right under the TODO:

```js
// Track changes in AuthState
useEffect(() => {
	auth.onAuthStateChanged((user) => {
		if (user) {
			setCurrentUser(user);
		} else {
			setCurrentUser(null);
		}
	});
}, []);
```

This sets up an AuthState listener, which will react whenever there are changes to the authenticated user (i.e. sign in, sign out, etc). The code above will set our current user state if a user is signed in. Otherwise, it will reset to null.

## Setting up User Sign In/Sign Out

Our sign in/sign out button is located in our app's header. Go ahead and navigate to the `src/Header.jsx` file so we can set that up.

Replace the implementation of the `googleSignIn()` function with the following code:

```js
// Trigger on button click
const googleSignIn = () => {
	// sign out if signed in already
	if (signedIn()) {
		firebase
			.auth()
			.signOut()
			.then(() => {
				console.log("signed out");
			})
			.catch((error) => console.error(error));
	} else {
		// set up google sign in provider
		var provider = new firebase.auth.GoogleAuthProvider();

		// sign in with google
		firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				console.log(result.user);
			})
			.catch((error) => {
				console.error(error);
			});
	}
};
```

Breaking down the above code we have two cases to handle: when user is already signed in and when a user is not signed in yet.

If a user is already signed in we can use `firebase.auth().signOut()` to sign them out.

If a user is not signed in, we set up the google sign in with the following line:

```js
var provider = new firebase.auth.GoogleAuthProvider();
```

Then we can use `firebase.auth().signInWithPopup(provider)` to trigger Google's sign in system.

These changes are automatically reflected in our user state because of the `onAuthStateChanged` listener we set up earlier!

## Using User Data

Now that we've set up an auth state listener and provided a way to sign in/sign out, let's work with some of the user data we have access to.

Go ahead and navigate to the `src/CreatePost.jsx` file which handles to creation of new posts. We can now edit the `handleSubmit()` function so that it utilizes our user-specific data.

```js
const handleSubmit = () => {
	// reset form fields
	setPostSubmission(INITIAL_STATE);

	if (currentUser == null) {
		window.alert("You must be signed in to make a post!");
		return;
	}
	// submit form data to database
	submitPost({
		author: currentUser ? currentUser.displayName : "anonymous",
		profilePicURL: currentUser ? currentUser.photoURL : PLACEHOLDER_PROFILE_PIC,
		...postSubmission,
	});
};
```

Now, we should be able to sign in on our app, make a post, and have our user information be associated with that post.

# Hosting

Firebase also comes with built in hosting services. Once you are done with your application, you can easily and quickly deploy it online.

Navigate over to the **Hosting** tab in the firebase console.

![start-hosting](./images/start-hosting.png)

Follow the bellow instructions to add firebase cli and deploy your application!

We will use `yarn add firebase-tools` instead of what is shown below

![add-hosting](./images/add-hosting-1.png)

![add-hosting](./images/add-hosting-2.png)
![add-hosting](./images/add-hosting-3.png)
