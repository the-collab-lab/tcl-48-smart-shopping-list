import './ListItem.css';
import { useState, useEffect } from 'react';
import { updateItem } from '../api/firebase';

import { getDaysBetweenDates } from '../utils';

const milliSecondsInADay = 24 * 60 * 60 * 1000;
const currentTimeInMilliseconds = Date.now();

export function ListItem({ listToken, item, name }) {
	let { id, isChecked, dateCreated, dateLastPurchased, totalPurchases } = item;

	const [isPurchased, setIsPurchased] = useState(isChecked);

	const dateLastPurchasedInMilliseconds = dateLastPurchased
		? dateLastPurchased.seconds * 1000
		: null;

	const timeElasped =
		currentTimeInMilliseconds - dateLastPurchasedInMilliseconds;

	let days;
	if (dateLastPurchased) {
		const itemLastPurchasedDate = dateLastPurchased.seconds;
		console.log('purchased itemDataLast ', name, itemLastPurchasedDate);
		days = getDaysBetweenDates(itemLastPurchasedDate);
		console.log('purchaseDate diff', days);
	} else {
		const itemCreationDate = dateCreated.seconds;
		console.log('created', name, itemCreationDate);
		days = getDaysBetweenDates(itemCreationDate);
		console.log('createdDate', days);
	}
	const secondsToDays = Math.floor(days / (3600 * 24));

	useEffect(() => {
		if (timeElasped >= milliSecondsInADay) {
			const itemData = {
				isChecked: false,
			};
			updateItem(listToken, id, itemData);
			setIsPurchased(false);
		}
	}, [listToken, timeElasped, id]);

	//const estimationTime = new calculateEstimate(previousEstimate, dateLastPurchased, totalPurchases){

	//};

	const handleCheckboxChange = (e) => {
		if (isPurchased) {
			const itemData = {
				name: name,
				id: id,
				isChecked: false,
				dateCreated: dateCreated,
				dateLastPurchased: dateLastPurchased,
				totalPurchases: totalPurchases,
			};
			setIsPurchased(false);
			updateItem(listToken, id, itemData);
		} else {
			const count = totalPurchases + 1;
			const itemData = {
				name: name,
				id: id,
				isChecked: true,
				dateCreated: dateCreated,
				dateLastPurchased: new Date(),
				totalPurchases: count,
			};

			updateItem(listToken, id, itemData);
			setIsPurchased(true);
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
