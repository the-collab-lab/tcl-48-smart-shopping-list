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
			setMessage(itemName + ' added to the list');
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
				</div>
				<input
					type="text"
					name="itemName"
					id="itemName"
					placeholder="item name"
					value={itemName}
					onChange={handleChange}
					required
				/>
				<div>
					<fieldset>
						<legend>How soon will you buy this again?</legend>
						<div>
							<input
								type="radio"
								value={7}
								name="daysUntilNextPurchase"
								id="soon"
								onChange={handleChange}
								defaultChecked
							/>
							<label htmlFor="soon">Soon</label>
						</div>
						<div>
							<input
								type="radio"
								value={14}
								name="daysUntilNextPurchase"
								id="kind-of-soon"
								onChange={handleChange}
							/>
							<label htmlFor="not-soon">Not soon</label>
						</div>
						<div>
							<input
								type="radio"
								value={30}
								name="daysUntilNextPurchase"
								id="not-soon"
								onChange={handleChange}
							/>
							<label htmlFor="kind-of-soon">Kind of soon</label>
						</div>
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
