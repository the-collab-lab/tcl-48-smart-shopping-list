import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
import homeIcon from '../../src/images/Iconsax/Bold/Vector.png';
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
							<img src={homeIcon} />
						</NavLink>
						<NavLink to="/list" className="Nav-link">
							List
						</NavLink>
						<NavLink to="/add-item" className="Nav-link">
							Add Item
						</NavLink>
					</nav>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
			</div>
		</>
	);
}
