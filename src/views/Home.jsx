import './Home.css';

export function Home(props) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>

			<button type="button" onClick={props.handleClick}>
				Create list
			</button>
		</div>
	);
}
