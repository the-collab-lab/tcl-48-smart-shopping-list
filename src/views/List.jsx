import { ListItem } from '../components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { comparePurchaseUrgency } from '../api/firebase';
import { Sublist } from '../components/SubList';
export function List({ data, listToken }) {
	const [searchQuery, setSearchQuery] = useState('');

	const clearInput = (e) => {
		e.preventDefault();
		setSearchQuery('');
	};

	//data is getting passed through firebase.js function to add the .days and .isInactive fields to each item
	const sortedData = comparePurchaseUrgency(data);

	return (
		<>
			<Sublist subList={listToken} subItems={sortedData}></Sublist>
			{sortedData.length > 0 ? (
				<>
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
					{listToken ? (
						<>
							<p>
								A shopping list with token name: "{listToken}" has been created
								and is currently empty.
							</p>
							<Link to="/add-item">Let's add your first item!</Link>{' '}
						</>
					) : (
						<>
							<p>
								Nothing to show!
								<br />
								The shopping list has not been created or joined. Please visit{' '}
								<Link to="/" style={{ color: 'white' }}>
									Home
								</Link>{' '}
								for options.
							</p>
						</>
					)}
				</div>
			)}
		</>
	);
}
