import { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ControlPanel, TeeterTooter, WeightArea } from './components';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import {
	setClientSize,
	moveRight,
	moveLeft,
	moveDown,
	resetGame,
	runGame,
	addWeightRight,
} from './store/reducers/rootSlice';

const App = () => {
	const dispatch = useDispatch();
	const { clientWidth, clientHeight, isGameRunning, rightMomentum, isGameEnded } = useSelector(
		state => state.root,
		shallowEqual,
	);

	const [weights, setWeights] = useState([]);

	const shapes = ['triangle', 'circle', 'square'];

	useEffect(() => {
		const updateClientSize = () => {
			dispatch(
				setClientSize({
					clientWidth: window.innerWidth,
					clientHeight: window.innerHeight,
				}),
			);
		};

		const keyDownListener = event => {
			if (event.keyCode === 39) {
				dispatch(moveRight());
			} else if (event.keyCode === 37) {
				dispatch(moveLeft());
			}
		};

		updateClientSize();

		document.addEventListener('resize', updateClientSize);
		document.addEventListener('keydown', keyDownListener);

		const interval = setInterval(() => {
			dispatch(moveDown());
		}, 50);

		return () => {
			clearInterval(interval);
			document.removeEventListener('resize', updateClientSize);
			document.removeEventListener('keydown', keyDownListener);
		};
	}, []);

	useEffect(() => {
		if (!isGameRunning && clientHeight !== 0 && rightMomentum === 0) {
			reset();
		}
	}, [isGameRunning, clientWidth]);

	const reset = () => {
		dispatch(resetGame());
		setWeights([]);
		for (let i = 0; i < Math.floor(Math.random() * 5 + 1); i++) {
			const distance = Math.floor(Math.random() * 5);
			const rightWeight = {
				weight: Math.floor(Math.random() * 10 + 1),
				shape: shapes[Math.floor(Math.random() * 3)],
				isFixed: true,
				top: clientHeight - 258,
				left: clientWidth / 2 + 76 + 152 * distance,
				distance: distance + 1,
			};
			setWeights(prevState => [...prevState, rightWeight]);
			dispatch(addWeightRight(rightWeight));
		}
	};

	const addWeight = () => {
		setWeights(prevState => [
			...prevState,
			{
				weight: Math.floor(Math.random() * 10 + 1),
				shape: shapes[Math.floor(Math.random() * 3)],
			},
		]);
		dispatch(runGame());
	};

	return (
		<div className='app'>
			<TeeterTooter />
			<WeightArea weights={weights} />
			<ControlPanel resetGame={reset} addWeight={addWeight} />
			<Modal show={isGameEnded}>
				<Modal.Header closeButton>
					<Modal.Title>Game End</Modal.Title>
				</Modal.Header>
				<Modal.Body>Game ended. Reset game play again.</Modal.Body>
				<Modal.Footer>
					<Button variant='danger' onClick={reset}>
						Reset
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default App;
