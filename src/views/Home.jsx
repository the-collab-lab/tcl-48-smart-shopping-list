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
		<div className="Home flex flex-col items-center justify-center gap-5 w-full h-[90vh] text-center">
			<div>
				<img
					className="rounded-md block mb-5 max-w-full mx-auto"
					src="https://placeimg.com/480/420/tech/grayscale"
					alt="placeholder"
				/>
			</div>
			<div>
				<h1 className="text-4xl font-bold mb-5">
					Welcome to Smart Shopping List!
				</h1>
				<p className="mb-5">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
					similique assumenda laboriosam atque earum eius ipsa aliquid eum
					placeat autem eligendi pariatur
				</p>
			</div>
			<div className="flex items-center justify-center flex-col text-center w-full">
				<button
					className="bg-[#008882] rounded-lg py-1 px-2 mb-7 w-3/5 text-white font-bold"
					area-label="create list"
					type="button"
					onClick={handleClick}
				>
					create a list
				</button>
				<p className="mb-7">or enter a three word token</p>
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
							className="text-black p-2 rounded-lg mb-7 w-3/5 border border-[#008882]"
						/>
					</label>
					<button
						className="bg-[#008882] rounded-lg py-1 px-2 w-3/5 text-white font-bold"
						area-label="Join existing list"
						type="submit"
					>
						join a list
					</button>
					<p className="">{messageError}</p>
				</form>
			</div>
		</div>
	);
}
