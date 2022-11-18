import './Home.css';
import { useState } from 'react';
import { matchToken } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

export function Home({ handleClick, setListToken }) {
	const [jointListToken, setJointListToken] = useState('');
	const [messageError, setMessageError] = useState('');
	const navigate = useNavigate();

	const handleTokenSubmit = async (e) => {
		e.preventDefault();

		const tokenQuery = await matchToken(jointListToken);
		if (!tokenQuery.empty) {
			setListToken(jointListToken);
			navigate('/list');
		} else {
			setMessageError('Invalid token - no existing list');
			setListToken(null);
			setJointListToken('');
			setTimeout(() => {
				setMessageError('');
			}, 3000);
		}
	};
	const handleJointListTokenChange = (e) => {
		setJointListToken(e.target.value);
	};
	return (
		<div className="Home">
			<h1>Welcome!</h1>
			<p>Smart Shopping List</p>
			<button area-label="create list" type="button" onClick={handleClick}>
				Create list
			</button>
			<p>- or -</p>
			<p>Join an existing shopping list by entering a three word token</p>
			<form onSubmit={handleTokenSubmit}>
				<label htmlFor="token">
					<input
						type="text"
						id="token"
						name="token"
						placeholder="Three word token"
						value={jointListToken}
						onChange={handleJointListTokenChange}
						required
					/>
				</label>
				<p>{messageError}</p>
				<button area-label="Join existing list" type="submit">
					Join an existing list
				</button>
			</form>
		</div>
	);
}
