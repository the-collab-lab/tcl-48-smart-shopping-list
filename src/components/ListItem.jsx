import './ListItem.css';
import { useState } from 'react';

export function ListItem({ name, isChecked }) {
	const [isPurchased, setIsPurchased] = useState(isChecked);

	const handleCheckboxChange = (e) => {
		console.log(e.target.checked);
		setIsPurchased(e.target.checked);
	};

	return (
		<li className="ListItem">
			<div>
				<label htmlFor={name}>
					<input
						type="checkbox"
						id={name}
						name={name}
						value={name}
						onChange={handleCheckboxChange}
						defaultChecked={isChecked}
					></input>
				</label>
			</div>
			<div>{name}</div>
		</li>
	);
}
