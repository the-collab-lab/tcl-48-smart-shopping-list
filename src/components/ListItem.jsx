import './ListItem.css';
import { useState, useEffect } from 'react';
import { updateItem } from '../api/firebase';

export function ListItem({
	itemId,
	listToken,
	name,
	isChecked,
	dateLastPurchased,
	totalPurchases,
}) {
	const [isPurchased, setIsPurchased] = useState(isChecked);
	dateLastPurchased = new Date('2022-10-24T09:03:00');

	//  const seconds = Math.floor(Date.now() / 1000);
	// const purchasedTime= Math.floor(dateLastPurchased/ 1000);

	// const  isItemPurchasedDayBefore = (dateLastPurchased) => {
	// 	const millisecondsInADay = 24 * 60 * 60 * 1000;
	// 	return (Date.now() - dateLastPurchased) <= millisecondsInADay;
	// }

	useEffect(() => {
		const millisecondsInADay = 24 * 60 * 60 * 1000;
		const lastPurchaseTime = Date.now() - dateLastPurchased;
		if (lastPurchaseTime > millisecondsInADay) {
			setIsPurchased(false);
		} else {
			setIsPurchased(true);
		}
	}, []);

	useEffect(() => {
		if (isChecked !== isPurchased) {
			updateItem(listToken, {
				itemId: itemId,
				dateLastPurchased: dateLastPurchased,
				isChecked: isPurchased,
				totalPurchases: totalPurchases,
			});
		}

		console.log('isChecked', isChecked);
		console.log('isPurchased', isPurchased);
	}, [isPurchased, listToken, itemId]);

	const handleCheckboxChange = (e) => {
		setIsPurchased(e.target.checked);
	};

	return (
		<li className="ListItem" key={itemId}>
			<div>
				<label htmlFor={name}>
					<input
						type="checkbox"
						id={name}
						name={name}
						value={name}
						//onchange update the firestore database

						// checked={dateLastPurchased===null?false:isItemPurchasedDayBefore (dateLastPurchased)}
						onChange={handleCheckboxChange}
						defaultChecked={isChecked}
					></input>
				</label>
			</div>
			<div>{name}</div>
		</li>
	);
}
