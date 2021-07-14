import React, { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import { GiFactory } from 'react-icons/gi';

type GeneratorFrameProps = {
	className?: string;
	style?: CSSProperties;
	size: number;
	children?: ReactNode;
};

function GeneratorFrame({
	className,
	style,
	size,
	children,
}: GeneratorFrameProps) {
	const rootStyle = {
		width: size,
		height: size,
		borderRadius: '10%',
	};

	const iconStyle = {
		width: size / 2,
		height: size / 2,
		padding: '4%',
	};

	return (
		<div
			style={{ ...rootStyle, ...style }}
			className={clsx(className, 'relative bg-no-repeat bg-green-600')}
		>
			{children}
			<GiFactory
				style={iconStyle}
				className="absolute bottom-0 right-0 text-white"
				title="generator"
			/>
		</div>
	);
}

export { GeneratorFrame };
