import React from 'react';
import PropTypes from 'prop-types';

import { Weight } from '..';

import './style.css';

export const WeightArea = ({ weights = [] }) => {
	return (
		<div className='weight-area-wrapper'>
			{weights.map((weight, index) => (
				<Weight key={`${weight.shape}-${weight.weight}-${index}`} {...weight} />
			))}
		</div>
	);
};

WeightArea.propTypes = {
	weights: PropTypes.array,
};
