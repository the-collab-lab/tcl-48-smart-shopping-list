import { ListItem } from '../components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { comparePurchaseUrgency } from '../api/firebase';
import SubList from '../components/SubList';

export function List({ data, listToken }) {
	const [searchQuery, setSearchQuery] = useState('');

	const clearInput = (e) => {
		e.preventDefault();
		setSearchQuery('');
	};

	// const overdueList = [];
	// const soonList = [];
	// const kindOfSoonList = [];
	// const notSoonList = [];
	// const purchasedList = [];
	// const inactiveList = [];
	// data.forEach((item) => {
	// 	if (item.urgency === 'Overdue') {
	// 		overdueList.push(item);
	// 	} else if (item.urgency === 'Soon') {
	// 		soonList.push(item);
	// 	} else if (item.urgency === 'Kind of soon') {
	// 		kindOfSoonList.push(item);
	// 	} else if (item.urgency === 'Not soon') {
	// 		notSoonList.push(item);
	// 	} else if (item.urgency === 'Purchased') {
	// 		purchasedList.push(item);
	// 	} else {
	// 		inactiveList.push(item);
	// 	}
	// });

	// const sortedItems = [
	// 	{ Overdue: overdueList },
	// 	{ Soon: soonList },
	// 	{ 'Kind of soon': kindOfSoonList },
	// 	{ 'Not soon': notSoonList },
	// 	{ Purchased: purchasedList },
	// 	{ Inactive: inactiveList },
	// ];

	const sortedItems = comparePurchaseUrgency(data);
	return (
		<div>
			<h2>YOUR INVENTORY</h2>
			<p>Token name for current list is "{listToken}"</p>
			<form className="filterForm">
				<label htmlFor="searchItems">
					<input
						type="text"
						id="searchItems"
						name="searchItems"
						value={searchQuery}
						placeholder="Search for an item"
						autoComplete="off"
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</label>

				{searchQuery && (
					<button area-label="clear input" onClick={clearInput}>
						Clear
					</button>
				)}
			</form>
			{sortedItems
				.filter((object) => Object.values(object)[0].length !== 0)
				.map((item, i) => {
					return (
						<SubList
							key={i}
							category={item}
							listToken={listToken}
							searchQuery={searchQuery}
						/>
					);
				})}
		</div>
	);
	// <>

	// 	{sortedData.length > 0 ? (
	// 		<>
	// 			<h2>YOUR INVENTORY</h2>
	// 			<p>Token name for current list is "{listToken}"</p>
	// 			<form className="filterForm">
	// 				<label htmlFor="searchItems">
	// 					<input
	// 						type="text"
	// 						id="searchItems"
	// 						name="searchItems"
	// 						value={searchQuery}
	// 						placeholder="Search for an item"
	// 						autoComplete="off"
	// 						onChange={(e) => setSearchQuery(e.target.value)}
	// 					/>
	// 				</label>

	// 				{searchQuery && (
	// 					<button area-label="clear input" onClick={clearInput}>
	// 						Clear
	// 					</button>
	// 				)}
	// 			</form>

	// 			<ul>
	// 				{sortedData
	// 					.filter((item) =>
	// 						item.name.toLowerCase().includes(searchQuery.toLowerCase()),
	// 					)
	// 					.map((item) => {
	// 						return (
	// 							<ListItem
	// 								key={item.id}
	// 								name={item.name}
	// 								listToken={listToken}
	// 								urgency={item.urgency}
	// 								item={item}
	// 							/>
	// 						);
	// 					})}
	// 			</ul>
	//
	// 		</>
	// 	) : (
	// 		<div>
	// 			{listToken ? (
	// 				<>
	// 					<p>
	// 						A shopping list with token name: "{listToken}" has been created
	// 						and is currently empty.
	// 					</p>
	// 					<Link to="/add-item">Let's add your first item!</Link>{' '}
	// 				</>
	// 			) : (
	// 				<>
	// 					<p>
	// 						Nothing to show!
	// 						<br />
	// 						The shopping list has not been created or joined. Please visit{' '}
	// 						<Link to="/" style={{ color: 'white' }}>
	// 							Home
	// 						</Link>{' '}
	// 						for options.
	// 					</p>
	// 				</>
	// 			)}
	// 		</div>
	// 	)}
	// </>
}
