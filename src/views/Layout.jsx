import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
import homeIcon from '../../src/images/HomeIcon.png';
import listIcon from '../../src/images/ListIcon.png';
import addItemIcon from '../../src/images/AddItemIcon.png';
/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout() {
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					{/* <h1>Smart shopping list</h1> */}
					<nav className="Nav">
						<NavLink to="/" className="Nav-link">
							<img alt="home navigation icon" src={homeIcon} />
						</NavLink>
						<NavLink to="/list" className="Nav-link">
							<img alt="list navigation icon" src={listIcon} />
						</NavLink>
						<NavLink to="/add-item" className="Nav-link">
							<img alt="add item navigation icon" src={addItemIcon} />
						</NavLink>
					</nav>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<footer>
					<p>
						© {new Date().getFullYear()} Developed by the Collab Lab TCL-48 Team
					</p>
				</footer>
			</div>
		</>
	);
}
