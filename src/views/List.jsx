import { ListItem } from '../components';

export function List({ data }) {
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{
					/**
					 * TODO: write some JavaScript that renders the `data` array
					 * using the `ListItem` component that's imported at the top
					 * of this file.
					 */
					data.map((item) => {
						return <ListItem key={item.id} name={item.name} />;
					})
				}
			</ul>
		</>
	);
}
