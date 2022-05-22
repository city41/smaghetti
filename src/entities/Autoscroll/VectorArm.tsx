import React from 'react';
import { TILE_SIZE } from '../../tiles/constants';

type VectorArmProps = {
	to: Point;
	onChange: (newPoint: Point) => void;
};

function VectorArm({ to }: VectorArmProps) {
	const style = {
		left: to.x * TILE_SIZE,
		top: to.y * TILE_SIZE,
	};

	return (
		<div className="absolute" style={style}>
			X
		</div>
	);
}

export { VectorArm };
