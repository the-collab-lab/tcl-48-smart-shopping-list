import { useState, useEffect } from 'react';
import { addItem } from '../api/firebase';
import { Link, useNavigate } from 'react-router-dom';
export function AddItem({ listToken, data }) {
	const [formData, setFormData] = useState({
		itemName: '',
		daysUntilNextPurchase: 7,
	});

	const [message, setMessage] = useState('');
	const [duplicateError, setDuplicateError] = useState(false);
	const navigate = useNavigate();
	const { itemName, daysUntilNextPurchase } = formData;
	useEffect(() => {
		if (!listToken) {
			navigate('/');
			console.log('no token');
		}
	}, [listToken]);
	const isDuplicate = data.some(
		(item) =>
			item.name.toLowerCase().replace(/[^a-z0-9]/gi, '') ===
			itemName.toLowerCase().replace(/[^a-z0-9]/gi, ''),
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (itemName === ' ') {
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
								value={7 || daysUntilNextPurchase}
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
								value={14 || daysUntilNextPurchase}
								name="daysUntilNextPurchase"
								id="kind-of-soon"
								onChange={handleChange}
							/>
							<label htmlFor="kind-of-soon">Kind of soon</label>
						</div>
						<div>
							<input
								type="radio"
								value={30 || daysUntilNextPurchase}
								name="daysUntilNextPurchase"
								id="not-soon"
								onChange={handleChange}
							/>
							<label htmlFor="not-soon">Not soon</label>
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
