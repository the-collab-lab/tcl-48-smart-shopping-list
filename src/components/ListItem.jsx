import './ListItem.css';
import { useState, useEffect } from 'react';
import { updateItem, deleteItem } from '../api/firebase';

const milliSecondsInADay = 24 * 60 * 60 * 1000;
const currentTimeInMilliseconds = Date.now();

export function ListItem({ listToken, item, name }) {
	let { id, isChecked, dateLastPurchased, totalPurchases } = item;

	const [isPurchased, setIsPurchased] = useState(isChecked);

	const dateLastPurchasedInMilliseconds = dateLastPurchased
		? dateLastPurchased.seconds * 1000
		: null;

	const timeElasped =
		currentTimeInMilliseconds - dateLastPurchasedInMilliseconds;

	useEffect(() => {
		if (timeElasped >= milliSecondsInADay) {
			const items = {
				isChecked: false,
			};
			updateItem(listToken, id, items);
			setIsPurchased(false);
		}
	}, [listToken, timeElasped, id]);

	const handleCheckboxChange = (e) => {
		if (isPurchased) {
			const items = {
				isChecked: false,
			};
			setIsPurchased(false);
			updateItem(listToken, id, items);
		} else {
			const count = totalPurchases + 1;
			const items = {
				isChecked: true,
				dateLastPurchased: new Date(),
				totalPurchases: count,
			};

			updateItem(listToken, id, items);
			setIsPurchased(true);
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
