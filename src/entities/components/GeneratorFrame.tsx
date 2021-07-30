import React, { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import { GiFactory, GiStopSign } from 'react-icons/gi';

type GeneratorFrameProps = {
	className?: string;
	canceler?: boolean;
	style?: CSSProperties;
	size: number;
	children?: ReactNode;
};

function GeneratorFrame({
	className,
	canceler,
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

	const Icon = canceler ? GiStopSign : GiFactory;

	return (
		<div
			style={{ ...rootStyle, ...style }}
			className={clsx(className, 'relative bg-no-repeat', {
				'bg-green-600': !canceler,
				'bg-red-500': canceler,
			})}
		>
			{children}
			<Icon
				style={iconStyle}
				className="absolute bottom-0 right-0 text-white"
			/>
		</div>
	);
}

export { GeneratorFrame };
