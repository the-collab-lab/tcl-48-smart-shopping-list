import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem({ listToken }) {
	const [formData, setFormData] = useState({
		itemName: '',
		daysUntilNextPurchase: 7,
	});

	const [message, setMessage] = useState('');

	const { itemName, daysUntilNextPurchase } = formData;

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addItem(listToken, { itemName, daysUntilNextPurchase });
			setFormData((prevState) => ({
				...prevState,
				itemName: '',
			}));
			setMessage('Item added');
		} catch (error) {
			console.log(error);
			setMessage('Item not added');
		}
	};

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="itemName">Item Name:</label>
					<input
						type="text"
						name="itemName"
						id="itemName"
						placeholder="item name"
						value={itemName}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<fieldset>
						<legend>How soon will you buy this again?</legend>
						<label htmlFor="soon">Soon</label>
						<input
							type="radio"
							value={7}
							name="daysUntilNextPurchase"
							id="soon"
							onChange={handleChange}
							defaultChecked
						/>
						<label htmlFor="kind-of-soon">Kind of soon</label>
						<input
							type="radio"
							value={14}
							name="daysUntilNextPurchase"
							id="kind-of-soon"
							onChange={handleChange}
						/>
						<label htmlFor="not-soon">Not soon</label>
						<input
							type="radio"
							value={30}
							name="daysUntilNextPurchase"
							id="not-soon"
							onChange={handleChange}
						/>
					</fieldset>
					<p>{message}</p>
				</div>
				<div>
					<button type="submit">Add Item</button>
				</div>
			</form>
		</div>
	);
}
