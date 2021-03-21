import React, { ReactNode } from 'react';
import clsx from 'clsx';

type VerticalEditDetailsProps = {
	className?: string;
	children: ReactNode;
};

// const spawn = keyframes`
//   0% {
//     transform: scale(0);
//   }
//   75% {
//     transform: scale(1);
//   }
//   90% {
//     transform: scale(1.15);
//   }
// `;
//
// const Root = styled.div`
// 	position: absolute;
// 	top: -1px;
// 	left: -1px;
// 	z-index: -1;
//
// 	width: 15px;
// 	padding: 1px;
//
// 	display: flex;
// 	flex-direction: column;
// 	align-items: flex-end;
//
// 	background-color: rgba(255, 165, 0, 0.65);
// 	animation: ${spawn} 0.1s ease-in;
// `;

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
