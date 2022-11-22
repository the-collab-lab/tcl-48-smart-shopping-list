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

	const sortedItems = comparePurchaseUrgency(data);

	return data.length > 0 ? (
		<div className="w-full min-h-[90vh] flex flex-col items-center border">
			<h2 className="text-5xl font-bold mb-3">YOUR INVENTORY</h2>
			<p className="mb-3">list token: "{listToken}"</p>
			<form className="filterForm mb-10">
				<label htmlFor="searchItems">
					<input
						type="text"
						id="searchItems"
						name="searchItems"
						value={searchQuery}
						placeholder="Search for an item"
						autoComplete="off"
						onChange={(e) => setSearchQuery(e.target.value)}
						className="border border-[#008882] rounded-lg py-1 px-2"
					/>
				</label>

				{searchQuery && (
					<button area-label="clear input" onClick={clearInput}>
						Clear
					</button>
				)}
			</form>
			<div className="w-full flex flex-col items-center justify-center">
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
		</div>
	) : (
		<div>
			{listToken ? (
				<>
					<p>
						A shopping list with token name: "{listToken}" has been created and
						is currently empty.
					</p>
					<Link style={{ color: '#008882' }} to="/add-item">
						Let's add your first item!
					</Link>{' '}
				</>
			) : (
				<>
					<p>Nothing to show!</p>
					<p>The shopping list has not been created or joined.</p>
					<p>
						Please visit{' '}
						<Link to="/" style={{ color: '#008882' }}>
							Home
						</Link>{' '}
						for options.
					</p>
				</>
			)}
		</div>
	);
}
