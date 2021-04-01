import React, { ReactNode } from 'react';
import clsx from 'clsx';

type VerticalEditDetailsProps = {
	className?: string;
	children: ReactNode;
};

function VerticalEditDetails({
	className,
	children,
}: VerticalEditDetailsProps) {
	const childCount = React.Children.count(children);
	const height = Math.max(childCount * 8 + 1, 20);

	const style = {
		height,
		top: -2,
		left: -2,
		width: 30,
		zIndex: -1,
		backgroundColor: 'rgba(255, 165, 0, 0.65)',
	};
	return (
		<div
			className={clsx(
				className,
				'absolute flex flex-col items-end justify-around pr-0.5'
			)}
			style={style}
		>
			{children}
		</div>
	);
}

export { VerticalEditDetails };
