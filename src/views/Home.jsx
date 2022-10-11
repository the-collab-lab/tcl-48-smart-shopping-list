import './Home.css';

export function Home(handleClick) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>

			<button type="button" onClick={handleClick}>
				Create list
			</button>
		</div>
	);
}
