import './ListItem.css';
import { useState, useEffect } from 'react';
import { updateItem } from '../api/firebase';
import { getFutureDate, getDaysBetweenDates } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

const milliSecondsInADay = 24 * 60 * 60 * 1000;
const currentTimeInMilliseconds = Date.now();

export function ListItem({ listToken, item, name }) {
	let {
		id,
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

	const timeElasped =
		currentTimeInMilliseconds - dateLastPurchasedInMilliseconds;

	useEffect(() => {
		if (timeElasped >= milliSecondsInADay) {
			const itemData = {
				isChecked: false,
			};
			updateItem(listToken, id, itemData);
			setIsPurchased(false);
		}
	}, [listToken, timeElasped, id]);

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

	let daysSinceLastPurchase;
	let previousEstimate;
	let previousPurchase;

	if (dateLastPurchased) {
		console.log('purchased itemDataLast ', name, dateLastPurchased);
		previousPurchase = dateLastPurchased.seconds;

		daysSinceLastPurchase = getDaysBetweenDates(previousPurchase, Date.now());
		//previousPurchase = dateLastPurchased
		//date = date.Now()

		previousEstimate = getDaysBetweenDates(previousPurchase, dateNextPurchased);
		//previousPurchase = dateLastPurchased
		//date = dateNextPurchased

		console.log('purchaseDate diff', daysSinceLastPurchase);
	} else {
		previousPurchase = dateCreated.seconds;
		console.log('created', name, dateCreated);

		daysSinceLastPurchase = getDaysBetweenDates(previousPurchase, Date.Now());

		previousEstimate = getDaysBetweenDates(previousPurchase, dateNextPurchased);
		console.log('createdDate', daysSinceLastPurchase);
	}
	const secondsToDays = Math.floor(daysSinceLastPurchase / (3600 * 24));

	let updatePreviousEstimate = calculateEstimate(
		previousEstimate,
		secondsToDays,
		totalPurchases,
	);

	// let smartPurchaseDate = getFutureDate(updatePreviousEstimate);

	useEffect(() => {
		const itemData = {
			dateNextPurchased: getFutureDate(updatePreviousEstimate),
		};
		updateItem(listToken, id, itemData);
	}, [listToken, id, dateNextPurchased]);

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
