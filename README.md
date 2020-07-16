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
    - [Setup](#demonstration-integrating-firestore-with-a-react-app)
    - [Creating Firebase Project with Firestore](#creating-a-firebase-project)
    - [Using Firestore in Web App](#using-the-database-in-the-app)
- Cloud Storage
  - Buckets
  - References
  - Manipulating Contents of Buckets
  - Demo App
    - Add Cloud Storage to Firebase Project
    - Using Cloud Storage in Web App
- Authentication
  - Tokens
  - Security Rules
  - Demo App
    - Add Authentication
    - Work with Auth in Web App
    - Set up Security Rules
- Firebase Hosting
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

Lastly, let's set up the functionality to allow us to delete posts from the database. Go ahead and navigate to the `src/Post.jsx` file. Replace the current `deletePost()` implementation with the following code:

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
