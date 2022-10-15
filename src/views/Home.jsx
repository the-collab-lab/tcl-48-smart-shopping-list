import './Home.css';

export function Home(props) {
	return (
		<div className="Home">
			<button type="button" onClick={props.handleClick}>
				Create list
			</button>
			<p>- or -</p>
			<p>Join an existing shopping list by entering a three word token</p>
			<form>
				<label htmlFor="token">
					<input
						type="text"
						id="token"
						name="token"
						placeholder="Three word token"
					></input>
				</label>
				<button type="submit">Join an existing list</button>
			</form>
		</div>
	);
}
