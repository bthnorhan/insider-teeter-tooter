import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Triangle } from '../../assets/svg/triangle.svg';
import { ReactComponent as Square } from '../../assets/svg/square.svg';
import { ReactComponent as Circle } from '../../assets/svg/circle.svg';

export const Shape = ({ size, shape }) => {
	if (shape === 'square') {
		return <Square fill='#2196f3' width={size} height={size} />;
	} else if (shape === 'triangle') {
		return <Triangle fill='#4caf50' width={size} height={size} />;
	} else {
		return <Circle fill='#f44336' width={size} height={size} />;
	}
};

Shape.propTypes = {
	size: PropTypes.number,
	shape: PropTypes.oneOf(['circle', 'triangle', 'square']),
};
