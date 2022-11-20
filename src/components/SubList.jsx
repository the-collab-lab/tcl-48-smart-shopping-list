import { ListItem } from './ListItem';

function SubList({ category, listToken, urgency, searchQuery }) {
	const urgencyTitle = Object.keys(category)[0];
	const urgencyArray = Object.values(category)[0].filter((item) =>
		item.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<>
			<h2>{urgencyArray.length !== 0 && urgencyTitle}</h2>
			<ul>
				{urgencyArray.map((item) => {
					return (
						<ListItem
							key={item.id}
							name={item.name}
							listToken={listToken}
							item={item}
							urgency={item.urgency}
						/>
					);
				})}
			</ul>
		</>
	);
}
export default SubList;
