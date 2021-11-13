import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import { shallowEqual, useSelector } from 'react-redux';

export const ControlPanel = ({ resetGame = () => {}, addWeight = () => {} }) => {
	const { leftTotalWeight, leftMomentum, rightTotalWeight, rightMomentum, isGameRunning } =
		useSelector(state => state.root, shallowEqual);

	return (
		<div className='d-flex flex-row m-2 p-2 rounded bg-white'>
			<div className='d-flex flex-column'>
				<span>Total Weight - {leftTotalWeight} kg</span>
				<span>Momentum - {leftMomentum} kg/m</span>
			</div>
			<div className='mx-auto'>
				<Button variant='success' disabled={isGameRunning} onClick={addWeight}>
					Add New Weight
				</Button>
				<Button className='ms-2' variant='danger' onClick={resetGame}>
					Reset
				</Button>
			</div>
			<div className='d-flex flex-column'>
				<span>Total Weight - {rightTotalWeight} kg</span>
				<span>Momentum - {rightMomentum} kg/m</span>
			</div>
		</div>
	);
};

ControlPanel.propTypes = {
	addWeight: PropTypes.func,
	resetGame: PropTypes.func,
};
