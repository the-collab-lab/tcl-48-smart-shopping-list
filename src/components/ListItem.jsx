import './ListItem.css';
import { useState, useEffect } from 'react';
import { updateItem } from '../api/firebase';
// import { getFutureDate, getDaysBetweenDates } from '../utils';
// import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

const milliSecondsInADay = 24 * 60 * 60 * 1000;
const currentTimeInMilliseconds = Date.now();

export function ListItem({ listToken, item }) {
	let {
		id,
		name,
		isChecked,
		dateCreated,
		dateLastPurchased,
		dateNextPurchased,
		totalPurchases,
	} = item;

	const [isPurchased, setIsPurchased] = useState(isChecked);

	const dateLastPurchasedInMilliseconds = dateLastPurchased
		? dateLastPurchased.seconds * 1000
		: null;

	const timeElapsed =
		currentTimeInMilliseconds - dateLastPurchasedInMilliseconds;

	useEffect(() => {
		if (isChecked && timeElapsed >= milliSecondsInADay) {
			let newItemData = item;
			newItemData.isChecked = false;
			//const newItemData = {
			//	id,
			//	isChecked: false,
			//	dateCreated: dateCreated,s
			//	dateLastPurchased: dateLastPurchased,
			//	dateNextPurchased: dateNextPurchased,
			//	totalPurchases: totalPurchases,
			//};
			updateItem(listToken, id, newItemData);
			setIsPurchased(false);
		}
	}, [listToken, timeElapsed, id]);

	const handleCheckboxChange = () => {
		let itemData = item;
		if (isPurchased) {
			itemData.isChecked = false;
			//const itemData = {
			//	isChecked: false,
			//	dateCreated: dateCreated,
			//	dateLastPurchased: dateLastPurchased,
			//	dateNextPurchased: dateNextPurchased,
			//	totalPurchases: totalPurchases,
			//};
			setIsPurchased(false);
			updateItem(listToken, id, itemData);
		} else {
			itemData.isChecked = true;
			//const itemData = {
			//	isChecked: true,
			//	dateCreated: dateCreated,
			//	dateLastPurchased: dateLastPurchased,
			//	dateNextPurchased: dateNextPurchased,
			//	totalPurchases: totalPurchases,
			//};
			console.log('total purchases inside handlebox change:', totalPurchases);
			setIsPurchased(true);
			updateItem(listToken, id, itemData);
		}
	};

	return (
		<li className="ListItem" key={id}>
			<label>
				<input
					type="checkbox"
					id="id"
					name="id"
					checked={isPurchased}
					onChange={handleCheckboxChange}
				/>
				{name}
			</label>
		</li>
	);
}
