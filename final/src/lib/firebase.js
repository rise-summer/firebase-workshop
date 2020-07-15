import firebase from "firebase";

var firebaseConfig = {
	apiKey: "AIzaSyDTqvwKP-6BdnzC83vPkt8sQZfHBa8N-nQ",
	authDomain: "fir-workshop-9b1eb.firebaseapp.com",
	databaseURL: "https://fir-workshop-9b1eb.firebaseio.com",
	projectId: "fir-workshop-9b1eb",
	storageBucket: "fir-workshop-9b1eb.appspot.com",
	messagingSenderId: "1077599697140",
	appId: "1:1077599697140:web:49373871659609c24d46a1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default firebase;
