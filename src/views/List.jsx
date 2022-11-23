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
		<div className="w-full min flex flex-col items-center mt-10">
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
						className="border border-[#008882] rounded-lg py-1 px-2 text-black"
					/>
				</label>

				{searchQuery && (
					<button
						className="bg-[#008882] rounded-lg py-1 px-2 mb-7 text-white font-medium ml-5"
						area-label="clear input"
						onClick={clearInput}
					>
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
				<div className="flex flex-col items-start justify-center mt-10">
					<p className="text-3xl mb-5">
						A shopping list with token name: "{listToken}" has been created and
						is currently empty.
					</p>
					<Link
						className="bg-[#008882] rounded-lg py-1 px-2 mb-7 text-white font-medium"
						to="/add-item"
					>
						Let's add your first item!
					</Link>{' '}
				</div>
			) : (
				<div className="flex flex-col items-start justify-center mt-10">
					<p className="mb-5">
						The shopping list has not been created or joined.
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
