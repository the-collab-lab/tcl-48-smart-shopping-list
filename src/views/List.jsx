import { ListItem } from '../components';
import { useState } from 'react';

export function List({ data, listToken }) {
	const [searchQuery, setSearchQuery] = useState('');

	const clearInput = (e) => {
		e.preventDefault();
		setSearchQuery('');
	};

	return (
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
						return (
							<ListItem
								key={item.id}
								listToken={listToken}
								itemId={item.id}
								name={item.name}
								isChecked={item.isChecked}
								dateLastPurchased={item.dateLastPurchased}
								totalPurchases={item.totalPurchases}
							/>
						);
					})}
			</ul>
		</>
	);
}
