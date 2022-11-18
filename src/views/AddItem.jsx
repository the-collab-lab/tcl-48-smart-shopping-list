import { useState } from 'react';
import { addItem } from '../api/firebase';
import { Link } from 'react-router-dom';

export function AddItem({ listToken, data }) {
	const [formData, setFormData] = useState({
		itemName: '',
		daysUntilNextPurchase: 7,
	});

	const [message, setMessage] = useState('');
	const [duplicateError, setDuplicateError] = useState(false);

	const { itemName, daysUntilNextPurchase } = formData;

	const isDuplicate = data.some(
		(item) =>
			item.name.toLowerCase().replace(/[^a-z0-9]/gi, '') ===
			itemName.toLowerCase().replace(/[^a-z0-9]/gi, ''),
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (itemName.trim().length === 0) {
				setMessage('Cannot add empty item');
			} else if (!isDuplicate) {
				await addItem(listToken, { itemName, daysUntilNextPurchase });
				setMessage(`${itemName} added to the list`);
			} else {
				setMessage('Item is already in the list');
				setDuplicateError(true);
			}
		} catch (error) {
			console.log(error);
			setMessage('Item not added');
		} finally {
			setFormData((prevState) => ({
				...prevState,
				itemName: '',
				daysUntilNextPurchase: 7,
			}));
			setTimeout(() => {
				setMessage('');
				setDuplicateError(false);
			}, 2000);
		}
	};

	const handleChange = (e) => {
		if (message) setMessage('');
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div>
			{listToken ? (
				<div>
					<h2>ADD AN ITEM TO YOUR INVENTORY</h2>
					<form onSubmit={handleSubmit}>
						<label htmlFor="itemName">
							<input
								type="text"
								name="itemName"
								id="itemName"
								placeholder="Enter item name"
								value={itemName}
								onChange={handleChange}
								required
							/>
						</label>
						<div>
							<fieldset>
								<legend>When will you buy this item again?</legend>
								<div>
									<input
										type="radio"
										value={7 || daysUntilNextPurchase}
										name="daysUntilNextPurchase"
										id="soon"
										onChange={handleChange}
										checked={7 === parseInt(daysUntilNextPurchase)}
										//defaultChecked
									/>
									<label htmlFor="soon">
										Soon{' '}
										<span style={{ fontSize: '1rem' }}>
											{' '}
											in the next 7 days
										</span>
									</label>
								</div>
								<div>
									<input
										type="radio"
										value={14 || daysUntilNextPurchase}
										name="daysUntilNextPurchase"
										id="kind-of-soon"
										onChange={handleChange}
										checked={14 === parseInt(daysUntilNextPurchase)}
									/>
									<label htmlFor="kind-of-soon">
										Kind of soon{' '}
										<span style={{ fontSize: '1rem' }}>
											{' '}
											in the next 14 days
										</span>
									</label>
								</div>
								<div>
									<input
										type="radio"
										value={30 || daysUntilNextPurchase}
										name="daysUntilNextPurchase"
										id="not-soon"
										onChange={handleChange}
										checked={30 === parseInt(daysUntilNextPurchase)}
									/>
									<label htmlFor="not-soon">
										Not soon{' '}
										<span style={{ fontSize: '1rem' }}>
											{' '}
											in the next 30 days
										</span>
									</label>
								</div>
							</fieldset>
							<p>{message}</p>
						</div>
						<div>
							<button area-label="add item" type="submit">
								Add Item
							</button>
						</div>
					</form>
				</div>
			) : (
				<p>
					{' '}
					Please create or join a list to start adding items. Please visit{' '}
					<Link to="/" style={{ color: 'white' }}>
						Home
					</Link>{' '}
					for options.
				</p>
			)}
		</div>
	);
}
