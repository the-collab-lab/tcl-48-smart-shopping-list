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
				console.log('item');
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
				<div className="flex flex-col items-center justify-center gap-10 w-full min mt-10 px-[5vw]">
					<div>
						<h2 className="font-bold text-5xl text-center">
							ADD AN ITEM TO YOUR INVENTORY
						</h2>
					</div>
					<form
						className="w-full flex flex-col items-center"
						onSubmit={handleSubmit}
					>
						<label
							htmlFor="itemName"
							className="w-full flex items-center justify-center my-5"
						>
							<input
								type="text"
								name="itemName"
								id="itemName"
								placeholder="Enter item name"
								value={itemName}
								onChange={handleChange}
								aria-label="item name"
								required
								className="w-full rounded-lg py-1 px-2 border border-[#008882] text-black"
							/>
						</label>
						<div className="w-full">
							<fieldset>
								<legend className="font-bold text-2xl mb-5">
									When will you buy this item again?
								</legend>
								<div className="mb-5">
									<input
										type="radio"
										value={7 || daysUntilNextPurchase}
										name="daysUntilNextPurchase"
										id="soon"
										onChange={handleChange}
										checked={7 === parseInt(daysUntilNextPurchase)}
										className="mr-3"
									/>
									<label htmlFor="soon">7 days</label>
								</div>
								<div className="mb-5">
									<input
										type="radio"
										value={14 || daysUntilNextPurchase}
										name="daysUntilNextPurchase"
										id="kind-of-soon"
										onChange={handleChange}
										checked={14 === parseInt(daysUntilNextPurchase)}
										className="mr-3"
									/>
									<label htmlFor="kind-of-soon">14 days</label>
								</div>
								<div className="mb-5">
									<input
										type="radio"
										value={30 || daysUntilNextPurchase}
										name="daysUntilNextPurchase"
										id="not-soon"
										onChange={handleChange}
										checked={30 === parseInt(daysUntilNextPurchase)}
										className="mr-3"
									/>
									<label htmlFor="not-soon">30 days</label>
								</div>
							</fieldset>
							<p>{message}</p>
						</div>
						<div className="w-full flex items-center justify-center">
							<button
								area-label="add item"
								type="submit"
								className="bg-[#008882] rounded-lg py-1 px-2 w-full mb-5 text-white font-bold"
							>
								Add Item
							</button>
						</div>
					</form>
				</div>
			) : (
				<div className="flex flex-col items-start mt-10">
					<p className="mb-5">
						{' '}
						Please create or join a list to start adding items.
					</p>
					<Link
						to="/"
						className="bg-[#008882] rounded-lg py-1 px-2 mb-7 text-white font-medium"
					>
						Create or join list
					</Link>
				</div>
			)}
		</div>
	);
}
