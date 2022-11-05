import {
	collection,
	onSnapshot,
	addDoc,
	query,
	getDocs,
	doc,
	updateDoc,
} from 'firebase/firestore';
import { db } from './config';
import { getFutureDate } from '../utils';
import { getDaysBetweenDates } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

/**
 * Subscribe to changes on a specific list in the Firestore database (listId), and run a callback (handleSuccess) every time a change happens.
 * @param {string} listId The user's list token
 * @param {Function} handleSuccess The callback function to call when we get a successful update from the database.
 * @returns {Function}
 *
 * @see: https://firebase.google.com/docs/firestore/query-data/listen
 */
export function streamListItems(listId, handleSuccess) {
	const listCollectionRef = collection(db, listId);
	return onSnapshot(listCollectionRef, handleSuccess);
}

/**
 * Read the information from the provided snapshot and return an array
 * that can be stored in our React state.
 * @param {Object} snapshot A special Firebase document with information about the current state of the database.
 * @returns {Object[]} An array of objects representing the user's list.
 */
export function getItemData(snapshot) {
	return snapshot.docs.map((docRef) => {
		/**
		 * We must call a special `.data()` method to get the data
		 * out of the referenced document
		 */
		const data = docRef.data();

		/**
		 * The document's ID is not part of the data, but it's very useful
		 * so we get it from the document reference.
		 */
		data.id = docRef.id;

		return data;
	});
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listId The id of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listId, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listId);
	// TODO: Replace this call to console.log with the appropriate
	// Firebase function, so this information is sent to your database!
	return await addDoc(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll put a Date here when the item is purchased!
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		// This property will be used when we build out more of our UI.
		isChecked: false,
		name: itemName,
		totalPurchases: 0,
	});
}

/**
 * updates the itemData
 * @param {string} listId The id of the list we're adding to.
 * @param {string} id The id of the list item
 * @param {Object} itemData fields in each document of the firebase collection
 */
export async function updateItem(listId, id, itemData) {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to update an existing item! You'll need to figure out what arguments
	 * this function must accept!
	 */
	// this variable gets the days since last transaction
	let {
		isChecked,
		name,
		dateLastPurchased,
		dateCreated,
		dateNextPurchased,
		totalPurchases,
	} = itemData;

	let daysSinceLastPurchase;
	let previousEstimate;

	console.log(itemData);
	// if(isChecked){

	if (dateLastPurchased) {
		console.log('dateNextPurchased1', dateNextPurchased.toMillis());
		console.log('dateLastPurchased1', dateLastPurchased.toMillis());
		console.log('dateCreated1', dateCreated);

		previousEstimate = getDaysBetweenDates(
			dateLastPurchased.toMillis(),
			dateNextPurchased.toMillis(),
		);

		daysSinceLastPurchase = getDaysBetweenDates(dateLastPurchased.toMillis());
	} else {
		daysSinceLastPurchase = getDaysBetweenDates(dateCreated.toMillis());
	}

	let updatePreviousEstimate = calculateEstimate(
		previousEstimate,
		daysSinceLastPurchase,
		totalPurchases,
	);
	console.log('dateNextPurchased2', dateNextPurchased);
	console.log('dateLastPurchased2', dateLastPurchased);
	console.log('dateCreated2', dateCreated);

	itemData = {
		id,
		name,
		isChecked,
		dateCreated,
		dateLastPurchased: new Date(),
		dateNextPurchased: getFutureDate(updatePreviousEstimate),
		totalPurchases,
	};
	// }
	const itemCollectionRef = doc(db, listId, id);
	return await updateDoc(itemCollectionRef, itemData);
}

export async function deleteItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to delete an existing item! You'll need to figure out what arguments
	 * this function must accept!
	 */
}

export async function matchToken(listId) {
	const jointListTokenQuery = query(collection(db, listId));
	const jointListTokenSnapshot = await getDocs(jointListTokenQuery);
	return jointListTokenSnapshot;
}
