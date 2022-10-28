import { ListItem } from '../components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function List({ data }) {
	const [searchQuery, setSearchQuery] = useState('');

	const clearInput = (e) => {
		e.preventDefault();
		setSearchQuery('');
	};

	return (
		<>
			{data.length > 0 ? (
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
						{data
							.filter((item) =>
								item.name.toLowerCase().includes(searchQuery.toLowerCase()),
							)
							.map((item) => {
								return <ListItem key={item.id} name={item.name} />;
							})}
					</ul>
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
