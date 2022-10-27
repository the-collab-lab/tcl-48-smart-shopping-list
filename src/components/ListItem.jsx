import './ListItem.css';
import { useState, useEffect } from 'react';
import { updateItem } from '../api/firebase';

const milliSecondsInADay = 24 * 60 * 60 * 1000;
const currentTimeInMilliseconds = Date.now();

export function ListItem({ listToken, item }) {
	let { itemId, name, isChecked, dateLastPurchased, totalPurchases } = item;

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
			updateItem(listToken, itemId, items);
			setIsPurchased(false);
		}
	}, [listToken, timeElasped, itemId]);

	const handleCheckboxChange = () => {
		if (isPurchased) {
			const items = {
				isChecked: false,
			};

			updateItem(listToken, itemId, items);
			setIsPurchased(false);
		} else {
			const count = totalPurchases + 1;
			const items = {
				isChecked: true,
				dateLastPurchased: new Date(),
				totalPurchases: count,
			};

			updateItem(listToken, itemId, items);
			setIsPurchased(true);
		}
	};

	return (
		<li className="ListItem" key={itemId}>
			<label htmlFor={itemId}>
				<input
					type="checkbox"
					id={itemId}
					name={itemId}
					checked={isPurchased}
					onChange={handleCheckboxChange}
				/>
				{name}
			</label>
		</li>
	);
}
