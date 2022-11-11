import './ListItem.css';
import { useState, useEffect } from 'react';
import { updateItem, deleteItem } from '../api/firebase';

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

			updateItem(listToken, id, newItemData);
			setIsPurchased(false);
		}
	}, [listToken, timeElapsed, id]);

	const handleCheckboxChange = () => {
		let itemData = item;
		if (isPurchased) {
			itemData.isChecked = false;

			setIsPurchased(false);
			updateItem(listToken, id, itemData);
		} else {
			itemData.isChecked = true;

			setIsPurchased(true);
			updateItem(listToken, id, itemData);
		}
	};
	const handleDeleteItem = (e) => {
		if (window.confirm(`Are you sure you want to delete ${item.name}`)) {
			deleteItem(listToken, item);
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
			<button type="button" onClick={handleDeleteItem}>
				Delete
			</button>
		</li>
	);
}
