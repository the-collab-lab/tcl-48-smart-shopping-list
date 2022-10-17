import './Home.css';
import { useState } from 'react';
import { matchToken } from '../api/firebase';
import { onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export function Home(props, { setListToken }) {
	const [jointListToken, setJointListToken] = useState('');
	const [messageError, setMessageError] = useState('');
	const navigate = useNavigate();

	const handleTokenSubmit = async (e) => {
		e.preventDefault();
		console.log('handle tokens submit');
		const tokenQuery = await matchToken(jointListToken);
		if (!tokenQuery.empty) {
			setListToken(jointListToken);
			navigate('/list');
		} else {
			setMessageError('Invalid token - no existing list');
		}
	};
	const handleJointListTokenChange = (e) => {
		setJointListToken(e.target.value);
	};
	return (
		<div className="Home">
			<button type="button" onClick={props.handleClick}>
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
					></input>
				</label>
				<p>{messageError}</p>
				<button type="submit">Join an existing list</button>
			</form>
		</div>
	);
}
