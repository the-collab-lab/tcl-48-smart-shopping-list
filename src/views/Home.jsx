import './Home.css';

export function Home(props) {
	return (
		<div className="Home">
			<button type="button" onClick={props.handleClick}>
				Create list
			</button>
		</div>
	);
}
