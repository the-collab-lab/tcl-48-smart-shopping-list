import './Home.css';
import { useState } from 'react';
import { matchToken } from '../api/firebase';
import { useNavigate } from 'react-router-dom';
import welcomeImage from '../images/welcome-img.png';

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
		<div className="Home flex flex-col items-center gap-5 w-full text-center mt-10 px-[5vw]">
			<div>
				<img
					className="rounded-md block mb-5 max-w-full mx-auto"
					src={welcomeImage}
					alt="shopping cart with items and a person"
				/>
			</div>
			<div>
				<h1 className="text-4xl font-bold mb-5">
					Welcome to Smart Shopping List!
				</h1>

				<p className="mb-5">
					The app that learns how you shop. Smarter than your average shopping
					list.
				</p>
			</div>
			<div className="flex items-center justify-center flex-col text-center w-full">
				<button
					className="bg-[#008882] rounded-lg py-1 px-2 mb-7 w-full text-white font-medium"
					area-label="create list"
					type="button"
					onClick={handleClick}
				>
					create a list
				</button>
				<p className="mb-7">
					or enter a three word token to display an existing list
				</p>
				<form className="w-full" onSubmit={handleTokenSubmit}>
					<label htmlFor="token">
						<input
							type="text"
							id="token"
							name="token"
							placeholder="Three word token"
							value={jointListToken}
							onChange={handleJointListTokenChange}
							required
							aria-label="token"
							className="text-black p-2 rounded-lg mb-7 w-full border border-[#008882]"
						/>
					</label>
					<button
						className="bg-[#008882] rounded-lg py-1 px-2 w-full text-white font-medium"
						area-label="display existing list"
						type="submit"
					>
						display a list
					</button>
					<p className="">{messageError}</p>
				</form>
			</div>
		</div>
	);
}
