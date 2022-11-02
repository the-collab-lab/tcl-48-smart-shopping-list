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

	const timeElapsed =
		currentTimeInMilliseconds - dateLastPurchasedInMilliseconds;

	useEffect(() => {
		if (timeElapsed >= milliSecondsInADay) {
			const itemData = {
				isChecked: false,
			};
			updateItem(listToken, id, itemData);
			setIsPurchased(false);
		}
	}, [listToken, timeElapsed, id]);

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
		previousPurchase = dateLastPurchased.seconds * 1000;

		daysSinceLastPurchase = getDaysBetweenDates(previousPurchase, Date.now());
		console.log(
			'name=',
			name,
			'daysSinceLastPurchased',
			Math.floor(daysSinceLastPurchase),
		);

		previousEstimate = getDaysBetweenDates(
			previousPurchase,
			dateNextPurchased.seconds * 1000,
		);

		console.log(
			'name=',
			name,
			'purchaseDate diff',
			Math.floor(previousEstimate),
		);
	} else {
		previousPurchase = dateCreated.seconds * 1000;
		// console.log('created', name, dateCreated);

		daysSinceLastPurchase = getDaysBetweenDates(previousPurchase, Date.Now());

		previousEstimate = getDaysBetweenDates(
			previousPurchase,
			dateNextPurchased.seconds * 1000,
		);
		// console.log('createdDate', daysSinceLastPurchase);
	}
	const secondsToDays = Math.floor(daysSinceLastPurchase / (3600 * 24));

	let updatePreviousEstimate = calculateEstimate(
		previousEstimate,
		secondsToDays,
		totalPurchases,
	);

	useEffect(() => {
		const itemData = {
			dateNextPurchased: getFutureDate(updatePreviousEstimate),
		};
		updateItem(listToken, id, itemData);
	}, []);
	// }, [listToken, id, dateNextPurchased]);

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
