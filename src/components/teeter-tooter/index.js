import React from 'react';

import './style.css';

import { ReactComponent as Triangle } from '../../assets/svg/triangle.svg';

export const TeeterTooter = () => {
	return (
		<div className='teeter-tooter-wrapper'>
			<div className='teeter-tooter-bar'></div>
			<div className='teeter-tooter-triangle'>
				<Triangle fill='#9e9e9e' width={96} height={96} />;
			</div>
		</div>
	);
};
