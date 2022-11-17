import { ListItem } from '../components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { comparePurchaseUrgency } from '../api/firebase';

export function List({ data, listToken }) {
	const [searchQuery, setSearchQuery] = useState('');
	const navigate = useNavigate();

	const clearInput = (e) => {
		e.preventDefault();
		setSearchQuery('');
	};

	//data is getting passed through firebase.js function to add the .days and .isInactive fields to each item
	const sortedData = comparePurchaseUrgency(data);
	useEffect(() => {
		if (!listToken) {
			navigate('/');
			console.log('no token');
		}
	}, [listToken]);
	return (
		<>
			{sortedData.length > 0 ? (
				<>
					<form className="filterForm">
						<label htmlFor="searchItems">Filter Items</label>
						<input
							type="text"
							id="searchItems"
							name="searchItems"
							value={searchQuery}
							placeholder="Start typing here"
							autoComplete="off"
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						{searchQuery && <button onClick={clearInput}>Clear</button>}
					</form>
					<ul>
						{sortedData
							.filter((item) =>
								item.name.toLowerCase().includes(searchQuery.toLowerCase()),
							)
							.map((item) => {
								return (
									<ListItem
										key={item.id}
										name={item.name}
										listToken={listToken}
										urgency={item.urgency}
										item={item}
									/>
								);
							})}
					</ul>

					<div>
						{' '}
						<p>Soon</p>
						<ul>
							{sortedData
								.filter((item) => item.urgency === 'Soon')
								.map((item) => {
									return (
										<ListItem
											key={item.id}
											name={item.name}
											listToken={listToken}
											//urgency={item.urgency}
											item={item}
										/>
									);
								})}
						</ul>
					</div>
					<div>
						{' '}
						<p>Kind of Soon</p>
						<ul>
							{sortedData
								.filter((item) => item.urgency === 'Kind of soon')
								.map((item) => {
									return (
										<ListItem
											key={item.id}
											name={item.name}
											listToken={listToken}
											//urgency={item.urgency}
											item={item}
										/>
									);
								})}
						</ul>
					</div>
					<div>
						{' '}
						<p>Not Soon</p>
						<ul>
							{sortedData
								.filter((item) => item.urgency === 'Not soon')
								.map((item) => {
									return (
										<ListItem
											key={item.id}
											name={item.name}
											listToken={listToken}
											//urgency={item.urgency}
											item={item}
										/>
									);
								})}
						</ul>
					</div>
				</>
			) : (
				<div>
					<p>Your shopping list is currently empty.</p>
					<Link to="/add-item">Add your first item!</Link>
				</div>
			)}
		</>
	);
}
