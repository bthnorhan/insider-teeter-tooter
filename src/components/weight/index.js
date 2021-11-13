/* eslint-disable no-unused-vars */
import './style.css';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Shape } from '..';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addWeightLeft } from '../../store/reducers/rootSlice';

export const Weight = ({
	shape = 'circle',
	weight = 1,
	isFixed = false,
	top: fixedTop = 0,
	left: fixedLeft = 0,
	distance: fixedDistance = 0,
}) => {
	const clampedWeight = weight < 1 ? 1 : weight > 10 ? 10 : weight;
	const size = (clampedWeight - 1) * 8 + 80;

	const dispatch = useDispatch();
	const { currentWeightLeft, currentWeightTop, clientHeight, clientWidth } = useSelector(
		state => state.root,
		shallowEqual,
	);
	const [fixed, setFixed] = useState(isFixed);
	const [distance, setDistance] = useState(fixedDistance);
	const [left, setLeft] = useState(fixed ? fixedLeft : currentWeightLeft);
	const [top, setTop] = useState(fixed ? fixedTop : currentWeightTop);

	useEffect(() => {
		if (!fixed) {
			setLeft(currentWeightLeft);
			setDistance((clientWidth / 2 - 76 - currentWeightLeft) / 152);
			setTop(currentWeightTop);
			if (top >= clientHeight - 258 && clientHeight !== 0) {
				setFixed(true);
				dispatch(
					addWeightLeft({
						weight: clampedWeight,
						distance,
					}),
				);
			}
		}
	}, [
		currentWeightLeft,
		currentWeightTop,
		fixed,
		top,
		setFixed,
		setLeft,
		setTop,
		clientHeight,
		clientWidth,
		setDistance,
	]);

	return (
		<div
			className='weight-wrapper'
			style={{
				position: 'absolute',
				left: left,
				top: top,
			}}
		>
			<Shape shape={shape} size={size} />
			<div
				className='weight-span-wrapper'
				style={{
					width: size,
					height: size,
				}}
			>
				<span className='weight-span'>{clampedWeight} kg</span>
				<span className='weight-span'>{distance} m</span>
			</div>
		</div>
	);
};

Weight.propTypes = {
	shape: PropTypes.oneOf(['circle', 'triangle', 'square']),
	weight: PropTypes.number,
	isFixed: PropTypes.bool,
	top: PropTypes.number,
	left: PropTypes.number,
	distance: PropTypes.number,
};
