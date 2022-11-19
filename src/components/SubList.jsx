import { ListItem } from './ListItem';

function SubList({ category, listToken, urgency, searchQuery }) {
	const urgencyTitle = Object.keys(category)[0];
	const urgencyArray = Object.values(category);

	return (
		<>
			<h2>{urgencyArray[0].length === 0 ? null : urgencyTitle}</h2>
			<ul>
				{urgencyArray[0].length === 0
					? null
					: urgencyArray[0]
							.filter((item) =>
								item.name.toLowerCase().includes(searchQuery.toLowerCase()),
							)
							.map((item) => {
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
